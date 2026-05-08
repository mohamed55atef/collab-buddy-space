            // دمج جميع البيانات
            allExercises = [
                ...chestExercises.exercises,
                ...backExercises.exercises,
                ...shouldersExercises.exercises,
                ...bicepsExercises.exercises,
                ...triceps1Exercises.exercises,
                ...triceps2Exercises.exercises,
                ...legsExercises.exercises,
                ...absExercises.exercises,
                ...cardioExercises.exercises
            ];
            
            // تصفية وعرض التمارين
            filterAndDisplayExercises();
            
            // التحقق من وجود معلمة عضلة في عنوان URL
            const urlParams = new URLSearchParams(window.location.search);
            const muscleParam = urlParams.get('muscle');
            
            if (muscleParam) {
                muscleFilter.value = muscleParam;
                filterAndDisplayExercises();
            }
        } catch (error) {
            console.error('Error loading exercise data:', error);
            exerciseItemsGrid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>حدث خطأ أثناء تحميل البيانات</h3>
                    <p>يرجى تحديث الصفحة والمحاولة مرة أخرى.</p>
                </div>
            `;
        }
    }
    
    // تصفية وعرض التمارين
    function filterAndDisplayExercises() {
        // الحصول على قيم التصفية
        const searchTerm = searchInput.value.trim().toLowerCase();
        const muscle = muscleFilter.value;
        const equipment = equipmentFilter.value;
        
        // تصفية التمارين
        filteredExercises = allExercises.filter(exercise => {
            // تصفية حسب البحث
            const matchesSearch = exercise.name.toLowerCase().includes(searchTerm) || 
                                 (exercise.description && exercise.description.toLowerCase().includes(searchTerm));
            
            // تصفية حسب العضلة
            const matchesMuscle = muscle === 'all' || exercise.muscle === muscle;
            
            // تصفية حسب المعدات
            const matchesEquipment = equipment === 'all' || exercise.equipment === equipment;
            
            return matchesSearch && matchesMuscle && matchesEquipment;
        });
        
        // تحديث عدد العناصر
        itemsCount.textContent = filteredExercises.length;
        
        // عرض رسالة عدم وجود نتائج إذا لم يتم العثور على تمارين
        if (filteredExercises.length === 0) {
            exerciseItemsGrid.innerHTML = '';
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
            
            // عرض الصفحة الأولى
            currentPage = 1;
            displayExercisesPage(currentPage);
            
            // إنشاء أزرار الصفحات
            createPagination();
        }
    }

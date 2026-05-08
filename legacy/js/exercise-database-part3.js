    // عرض صفحة من التمارين
    function displayExercisesPage(page) {
        // حساب التمارين التي سيتم عرضها في الصفحة الحالية
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const exercisesToDisplay = filteredExercises.slice(startIndex, endIndex);
        
        // إنشاء HTML لعناصر التمارين
        let exerciseItemsHTML = '';
        
        exercisesToDisplay.forEach(exercise => {
            // تحديد أيقونة العضلة
            let muscleIcon = 'dumbbell';
            switch (exercise.muscle) {
                case 'chest':
                    muscleIcon = 'child';
                    break;
                case 'back':
                    muscleIcon = 'child fa-flip-horizontal';
                    break;
                case 'shoulders':
                    muscleIcon = 'dumbbell';
                    break;
                case 'biceps':
                    muscleIcon = 'user';
                    break;
                case 'triceps':
                    muscleIcon = 'user-ninja';
                    break;
                case 'legs':
                    muscleIcon = 'walking';
                    break;
                case 'abs':
                    muscleIcon = 'bacon';
                    break;
                case 'cardio':
                    muscleIcon = 'heartbeat';
                    break;
            }
            
            // تحديد اسم العضلة بالعربية
            let muscleName = '';
            switch (exercise.muscle) {
                case 'chest':
                    muscleName = 'الصدر';
                    break;
                case 'back':
                    muscleName = 'الظهر';
                    break;
                case 'shoulders':
                    muscleName = 'الأكتاف';
                    break;
                case 'biceps':
                    muscleName = 'البايسبس';
                    break;
                case 'triceps':
                    muscleName = 'الترايسبس';
                    break;
                case 'legs':
                    muscleName = 'الأرجل';
                    break;
                case 'abs':
                    muscleName = 'البطن';
                    break;
                case 'cardio':
                    muscleName = 'القلب';
                    break;
            }
            
            // تحديد اسم المعدات بالعربية
            let equipmentName = '';
            switch (exercise.equipment) {
                case 'barbell':
                    equipmentName = 'بار حديد';
                    break;
                case 'dumbbell':
                    equipmentName = 'دمبل';
                    break;
                case 'machine':
                    equipmentName = 'ماكينة';
                    break;
                case 'cable':
                    equipmentName = 'كيبل';
                    break;
                case 'bodyweight':
                    equipmentName = 'وزن الجسم';
                    break;
                case 'kettlebell':
                    equipmentName = 'كيتل بل';
                    break;
                case 'resistance-band':
                    equipmentName = 'مطاط مقاومة';
                    break;
            }
            
            // إنشاء HTML لعنصر التمرين
            exerciseItemsHTML += `
                <div class="exercise-item" data-id="${exercise.id}">
                    <div class="exercise-icon">
                        <i class="fas fa-${muscleIcon}"></i>
                    </div>
                    <h3 class="exercise-name">${exercise.name}</h3>
                    <div class="exercise-muscle">${muscleName}</div>
                    <div class="exercise-equipment">${equipmentName}</div>
                    <button class="btn btn-primary view-exercise-details" data-id="${exercise.id}">
                        <i class="fas fa-info-circle"></i> التفاصيل
                    </button>
                </div>
            `;
        });
        
        // عرض عناصر التمارين
        exerciseItemsGrid.innerHTML = exerciseItemsHTML;
        
        // إضافة مستمعي الأحداث لأزرار التفاصيل
        const viewDetailsButtons = document.querySelectorAll('.view-exercise-details');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const exerciseId = this.getAttribute('data-id');
                showExerciseDetails(exerciseId);
            });
        });
    }

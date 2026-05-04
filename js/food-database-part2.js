            // إضافة الأطعمة من فئات الطعام
            foodCategories.categories.forEach(category => {
                allFoods = [
                    ...allFoods,
                    ...category.foods.map(food => ({ ...food, category: category.id }))
                ];
            });
            
            // تصفية وعرض الأطعمة
            filterAndDisplayFoods();
            
            // التحقق من وجود معلمة فئة في عنوان URL
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get('category');
            
            if (categoryParam) {
                categoryFilter.value = categoryParam;
                filterAndDisplayFoods();
            }
        } catch (error) {
            console.error('Error loading food data:', error);
            foodItemsGrid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>حدث خطأ أثناء تحميل البيانات</h3>
                    <p>يرجى تحديث الصفحة والمحاولة مرة أخرى.</p>
                </div>
            `;
        }
    }
    
    // تصفية وعرض الأطعمة
    function filterAndDisplayFoods() {
        // الحصول على قيم التصفية
        const searchTerm = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        const sort = sortBy.value;
        
        // تصفية الأطعمة
        filteredFoods = allFoods.filter(food => {
            // تصفية حسب البحث
            const matchesSearch = food.name.toLowerCase().includes(searchTerm) || 
                                 (food.description && food.description.toLowerCase().includes(searchTerm));
            
            // تصفية حسب الفئة
            const matchesCategory = category === 'all' || food.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        // ترتيب الأطعمة
        sortFoods(sort);
        
        // تحديث عدد العناصر
        itemsCount.textContent = filteredFoods.length;
        
        // عرض رسالة عدم وجود نتائج إذا لم يتم العثور على أطعمة
        if (filteredFoods.length === 0) {
            foodItemsGrid.innerHTML = '';
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
            
            // عرض الصفحة الأولى
            currentPage = 1;
            displayFoodsPage(currentPage);
            
            // إنشاء أزرار الصفحات
            createPagination();
        }
    }

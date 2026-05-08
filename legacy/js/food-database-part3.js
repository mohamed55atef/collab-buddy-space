    // ترتيب الأطعمة
    function sortFoods(sortOption) {
        switch (sortOption) {
            case 'name':
                filteredFoods.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'calories-asc':
                filteredFoods.sort((a, b) => a.calories - b.calories);
                break;
            case 'calories-desc':
                filteredFoods.sort((a, b) => b.calories - a.calories);
                break;
            case 'protein-desc':
                filteredFoods.sort((a, b) => b.protein - a.protein);
                break;
            case 'carbs-desc':
                filteredFoods.sort((a, b) => b.carbs - a.carbs);
                break;
            case 'fat-desc':
                filteredFoods.sort((a, b) => b.fat - a.fat);
                break;
            default:
                filteredFoods.sort((a, b) => a.name.localeCompare(b.name));
        }
    }
    
    // عرض صفحة من الأطعمة
    function displayFoodsPage(page) {
        // حساب الأطعمة التي سيتم عرضها في الصفحة الحالية
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const foodsToDisplay = filteredFoods.slice(startIndex, endIndex);
        
        // إنشاء HTML لعناصر الطعام
        let foodItemsHTML = '';
        
        foodsToDisplay.forEach(food => {
            // تحديد أيقونة الفئة
            let categoryIcon = 'utensils';
            switch (food.category) {
                case 'carbs':
                    categoryIcon = 'bread-slice';
                    break;
                case 'proteins':
                    categoryIcon = 'drumstick-bite';
                    break;
                case 'vegetables':
                    categoryIcon = 'carrot';
                    break;
                case 'fruits':
                    categoryIcon = 'apple-alt';
                    break;
                case 'fast-food':
                    categoryIcon = 'hamburger';
                    break;
                case 'desserts':
                    categoryIcon = 'cookie';
                    break;
                case 'drinks':
                    categoryIcon = 'glass-whiskey';
                    break;
            }
            
            // إنشاء HTML لعنصر الطعام
            foodItemsHTML += `
                <div class="food-item" data-id="${food.id}">
                    <div class="food-icon">
                        <i class="fas fa-${categoryIcon}"></i>
                    </div>
                    <h3 class="food-name">${food.name}</h3>
                    <div class="food-calories">${food.calories} سعرة حرارية</div>
                    <div class="food-macros">
                        <span class="macro"><i class="fas fa-drumstick-bite"></i> ${food.protein}جم</span>
                        <span class="macro"><i class="fas fa-bread-slice"></i> ${food.carbs}جم</span>
                        <span class="macro"><i class="fas fa-oil-can"></i> ${food.fat}جم</span>
                    </div>
                    <button class="btn btn-primary view-food-details" data-id="${food.id}">
                        <i class="fas fa-info-circle"></i> التفاصيل
                    </button>
                </div>
            `;
        });
        
        // عرض عناصر الطعام
        foodItemsGrid.innerHTML = foodItemsHTML;
        
        // إضافة مستمعي الأحداث لأزرار التفاصيل
        const viewDetailsButtons = document.querySelectorAll('.view-food-details');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const foodId = this.getAttribute('data-id');
                showFoodDetails(foodId);
            });
        });
    }

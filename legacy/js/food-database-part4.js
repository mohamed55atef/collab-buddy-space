    // إنشاء أزرار الصفحات
    function createPagination() {
        const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
        
        // إنشاء HTML لأزرار الصفحات
        let paginationHTML = '';
        
        // زر الصفحة السابقة
        paginationHTML += `
            <button class="pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        // أزرار الصفحات
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="pagination-btn page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }
        
        // زر الصفحة التالية
        paginationHTML += `
            <button class="pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // عرض أزرار الصفحات
        pagination.innerHTML = paginationHTML;
        
        // إضافة مستمعي الأحداث لأزرار الصفحات
        const pageButtons = document.querySelectorAll('.page-btn');
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                displayFoodsPage(currentPage);
                updatePaginationActive();
            });
        });
        
        // إضافة مستمعي الأحداث لزر الصفحة السابقة
        const prevButton = document.querySelector('.prev-btn');
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayFoodsPage(currentPage);
                updatePaginationActive();
            }
        });
        
        // إضافة مستمعي الأحداث لزر الصفحة التالية
        const nextButton = document.querySelector('.next-btn');
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                displayFoodsPage(currentPage);
                updatePaginationActive();
            }
        });
    }
    
    // تحديث حالة أزرار الصفحات
    function updatePaginationActive() {
        const pageButtons = document.querySelectorAll('.page-btn');
        pageButtons.forEach(button => {
            const page = parseInt(button.getAttribute('data-page'));
            if (page === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        const prevButton = document.querySelector('.prev-btn');
        const nextButton = document.querySelector('.next-btn');
        const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
        
        prevButton.disabled = currentPage === 1;
        prevButton.classList.toggle('disabled', currentPage === 1);
        
        nextButton.disabled = currentPage === totalPages;
        nextButton.classList.toggle('disabled', currentPage === totalPages);
    }
    
    // عرض تفاصيل الطعام
    function showFoodDetails(foodId) {
        // البحث عن الطعام بواسطة المعرف
        const food = allFoods.find(food => food.id === foodId);
        
        if (food) {
            // تحديث عناصر النافذة المنبثقة
            document.getElementById('modal-food-name').textContent = food.name;
            document.getElementById('modal-calories').textContent = food.calories;
            document.getElementById('modal-protein').textContent = food.protein;
            document.getElementById('modal-carbs').textContent = food.carbs;
            document.getElementById('modal-fat').textContent = food.fat;
            
            // تحديد اسم الفئة
            let categoryName = '';
            switch (food.category) {
                case 'carbs':
                    categoryName = 'النشويات';
                    break;
                case 'proteins':
                    categoryName = 'البروتينات';
                    break;
                case 'vegetables':
                    categoryName = 'الخضروات';
                    break;
                case 'fruits':
                    categoryName = 'الفواكه';
                    break;
                case 'egyptian':
                    categoryName = 'الأكلات المصرية';
                    break;
                case 'fast-food':
                    categoryName = 'الوجبات السريعة';
                    break;
                case 'desserts':
                    categoryName = 'الحلويات';
                    break;
                case 'drinks':
                    categoryName = 'المشروبات';
                    break;
                default:
                    categoryName = 'أخرى';
            }
            
            document.getElementById('modal-category').textContent = categoryName;
            document.getElementById('modal-serving').textContent = food.serving || '100 جرام';
            
            // تحديث وصف الطعام
            const descriptionElement = document.getElementById('modal-description');
            if (food.description) {
                descriptionElement.innerHTML = `<p>${food.description}</p>`;
                descriptionElement.style.display = 'block';
            } else {
                descriptionElement.style.display = 'none';
            }
            
            // تحديث صورة الطعام
            const imageElement = document.getElementById('modal-food-image');
            if (food.image) {
                imageElement.innerHTML = `<img src="${food.image}" alt="${food.name}">`;
                imageElement.style.display = 'block';
            } else {
                // استخدام أيقونة بدلاً من الصورة
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
                
                imageElement.innerHTML = `<i class="fas fa-${categoryIcon}"></i>`;
                imageElement.style.display = 'flex';
            }
            
            // إضافة معرف الطعام إلى زر الإضافة إلى الوجبة
            modalAddToMeal.setAttribute('data-id', foodId);
            
            // عرض النافذة المنبثقة
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // إضافة مستمعي الأحداث
    
    // البحث
    searchBtn.addEventListener('click', function() {
        filterAndDisplayFoods();
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterAndDisplayFoods();
        }
    });
    
    // تصفية حسب الفئة
    categoryFilter.addEventListener('change', function() {
        filterAndDisplayFoods();
    });
    
    // ترتيب
    sortBy.addEventListener('change', function() {
        filterAndDisplayFoods();
    });
    
    // بطاقات الفئات
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            categoryFilter.value = category;
            filterAndDisplayFoods();
        });
    });
    
    // إغلاق النافذة المنبثقة
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    modalCloseBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // إضافة إلى الوجبة
    modalAddToMeal.addEventListener('click', function() {
        const foodId = this.getAttribute('data-id');
        const food = allFoods.find(food => food.id === foodId);
        
        if (food) {
            // هنا يمكن إضافة الطعام إلى الوجبة
            // في هذا المثال، سنعرض رسالة تأكيد فقط
            alert(`تمت إضافة ${food.name} إلى الوجبة`);
            
            // إغلاق النافذة المنبثقة
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // تحميل بيانات الأطعمة عند تحميل الصفحة
    loadFoodData();
});

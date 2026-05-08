/**
 * ملف JavaScript لصفحة قاعدة بيانات الأكلات
 * يحتوي على وظائف تحميل وعرض وتصفية وبحث الأطعمة
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    let allFoods = []; // جميع الأطعمة
    let filteredFoods = []; // الأطعمة المصفاة
    let currentPage = 1; // الصفحة الحالية
    const itemsPerPage = 12; // عدد العناصر في الصفحة الواحدة

    // عناصر DOM
    const foodItemsGrid = document.getElementById('food-items-grid');
    const noResults = document.getElementById('no-results');
    const pagination = document.getElementById('pagination');
    const itemsCount = document.getElementById('items-count');
    const searchInput = document.getElementById('food-search');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const categoryCards = document.querySelectorAll('.category-card');
    const modal = document.getElementById('food-details-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalAddToMeal = document.getElementById('modal-add-to-meal');

    // تحميل بيانات الأطعمة
    function loadFoodData() {
        try {
            // دمج جميع البيانات
            allFoods = [
                ...window.egyptianFood1.map(food => ({ ...food, category: 'egyptian' })),
                ...window.egyptianFood2.map(food => ({ ...food, category: 'egyptian' })),
                ...window.egyptianFood3.map(food => ({ ...food, category: 'egyptian' })),
                ...window.fastFood1.map(food => ({ ...food, category: 'fast-food' })),
                ...window.fastFood2.map(food => ({ ...food, category: 'fast-food' })),
                ...window.desserts1.map(food => ({ ...food, category: 'desserts' })),
                ...window.drinks1.map(food => ({ ...food, category: 'drinks' })),
                ...window.carbs1.map(food => ({ ...food, category: 'carbs' })),
                ...window.proteins1.map(food => ({ ...food, category: 'proteins' })),
                ...window.vegetables1.map(food => ({ ...food, category: 'vegetables' })),
                ...window.fruits1.map(food => ({ ...food, category: 'fruits' }))
            ];

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

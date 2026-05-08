/**
 * ملف JavaScript لصفحة النصائح
 * يحتوي على وظائف عرض وتصفية النصائح
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    let filteredTips = []; // النصائح المصفاة
    let currentCategory = 'all'; // الفئة الحالية
    let currentPage = 1; // الصفحة الحالية
    const tipsPerPage = 9; // عدد النصائح في كل صفحة

    // عناصر DOM
    const tipsContainer = document.getElementById('tips-container');
    const pagination = document.getElementById('pagination');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('tips-search');
    const searchBtn = document.getElementById('search-btn');
    const tipModal = document.getElementById('tip-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalTags = document.getElementById('modal-tags');
    const modalCategory = document.getElementById('modal-category');
    const modalDate = document.getElementById('modal-date');
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // تحميل بيانات النصائح
    function loadTipsData() {
        try {
            // التحقق من وجود معلمة الفئة في URL
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get('category');

            if (categoryParam && ['nutrition', 'training', 'lifestyle'].includes(categoryParam)) {
                currentCategory = categoryParam;
                // تحديث زر التصفية النشط
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-category') === categoryParam) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }

            // تصفية وعرض النصائح
            filterTips();

        } catch (error) {
            console.error('Error loading tips data:', error);
            tipsContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>حدث خطأ أثناء تحميل النصائح. يرجى تحديث الصفحة والمحاولة مرة أخرى.</p>
                </div>
            `;
        }
    }

    // تصفية النصائح
    function filterTips() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // تصفية النصائح حسب الفئة والبحث
        filteredTips = window.allTips.filter(tip => {
            const matchesCategory = currentCategory === 'all' || tip.category === currentCategory;
            const matchesSearch = tip.title.toLowerCase().includes(searchTerm) ||
                                 tip.content.toLowerCase().includes(searchTerm) ||
                                 tip.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            return matchesCategory && matchesSearch;
        });

        // ترتيب النصائح حسب التاريخ (الأحدث أولاً)
        filteredTips.sort((a, b) => new Date(b.date) - new Date(a.date));

        // عرض النصائح
        displayTips();
    }

    // عرض النصائح
    function displayTips() {
        // حساب عدد الصفحات
        const totalPages = Math.ceil(filteredTips.length / tipsPerPage);

        // التأكد من أن الصفحة الحالية ضمن النطاق
        if (currentPage > totalPages) {
            currentPage = totalPages > 0 ? totalPages : 1;
        }

        // حساب النصائح التي سيتم عرضها في الصفحة الحالية
        const startIndex = (currentPage - 1) * tipsPerPage;
        const endIndex = Math.min(startIndex + tipsPerPage, filteredTips.length);
        const tipsToDisplay = filteredTips.slice(startIndex, endIndex);

        // إذا لم يتم العثور على نصائح
        if (filteredTips.length === 0) {
            tipsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>لم يتم العثور على نصائح مطابقة للبحث.</p>
                </div>
            `;
            pagination.innerHTML = '';
            return;
        }

        // إنشاء HTML لبطاقات النصائح
        let tipsHTML = '';

        tipsToDisplay.forEach(tip => {
            // تحديد أيقونة الفئة
            let categoryIcon = '';
            let categoryName = '';

            switch (tip.category) {
                case 'nutrition':
                    categoryIcon = 'apple-alt';
                    categoryName = 'التغذية';
                    break;
                case 'training':
                    categoryIcon = 'dumbbell';
                    categoryName = 'التدريب';
                    break;
                case 'lifestyle':
                    categoryIcon = 'heart';
                    categoryName = 'نمط الحياة';
                    break;
            }

            // تنسيق التاريخ
            const tipDate = new Date(tip.date);
            const formattedDate = `${tipDate.getFullYear()}-${String(tipDate.getMonth() + 1).padStart(2, '0')}-${String(tipDate.getDate()).padStart(2, '0')}`;

            // إنشاء HTML لبطاقة النصيحة
            tipsHTML += `
                <div class="tip-card" data-id="${tip.id}">
                    <div class="tip-category">
                        <i class="fas fa-${categoryIcon}"></i>
                        <span>${categoryName}</span>
                    </div>
                    <h3 class="tip-title">${tip.title}</h3>
                    <p class="tip-excerpt">${tip.content.substring(0, 150)}${tip.content.length > 150 ? '...' : ''}</p>
                    <div class="tip-meta">
                        <div class="tip-date">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                    <button class="btn btn-primary view-tip-btn" data-id="${tip.id}">
                        <i class="fas fa-eye"></i>
                        عرض المزيد
                    </button>
                </div>
            `;
        });

        // عرض بطاقات النصائح
        tipsContainer.innerHTML = tipsHTML;

        // إضافة مستمعي الأحداث لأزرار عرض النصائح
        const viewTipButtons = document.querySelectorAll('.view-tip-btn');
        viewTipButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tipId = this.getAttribute('data-id');
                showTipDetails(tipId);
            });
        });

        // إنشاء أزرار الصفحات
        createPagination(totalPages);
    }

    // إنشاء أزرار الصفحات
    function createPagination(totalPages) {
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

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
                displayTips();
            });
        });

        // إضافة مستمعي الأحداث لزر الصفحة السابقة
        const prevButton = document.querySelector('.prev-btn');
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayTips();
            }
        });

        // إضافة مستمعي الأحداث لزر الصفحة التالية
        const nextButton = document.querySelector('.next-btn');
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                displayTips();
            }
        });
    }

    // عرض تفاصيل النصيحة
    function showTipDetails(tipId) {
        // البحث عن النصيحة بواسطة المعرف
        const tip = window.allTips.find(tip => tip.id === tipId);

        if (tip) {
            // تحديد اسم الفئة
            let categoryName = '';
            switch (tip.category) {
                case 'nutrition':
                    categoryName = 'التغذية';
                    break;
                case 'training':
                    categoryName = 'التدريب';
                    break;
                case 'lifestyle':
                    categoryName = 'نمط الحياة';
                    break;
            }

            // تنسيق التاريخ
            const tipDate = new Date(tip.date);
            const formattedDate = `${tipDate.getFullYear()}-${String(tipDate.getMonth() + 1).padStart(2, '0')}-${String(tipDate.getDate()).padStart(2, '0')}`;

            // تحديث عناصر النافذة المنبثقة
            modalTitle.textContent = tip.title;
            modalCategory.textContent = categoryName;
            modalDate.textContent = formattedDate;

            // إنشاء محتوى النصيحة
            const modalContent = document.createElement('p');
            modalContent.textContent = tip.content;

            // مسح المحتوى السابق (الفقرة) وإضافة الجديد
            const existingContent = modalBody.querySelector('p');
            if (existingContent) {
                modalBody.removeChild(existingContent);
            }
            // Add the meta div to the modal body before appending the content
            modalBody.innerHTML = `
                <div class="modal-meta">
                    <div class="tip-category">
                        <i class="fas fa-tag"></i>
                        <span id="modal-category">${categoryName}</span>
                    </div>
                    <div class="tip-date">
                        <i class="fas fa-calendar-alt"></i>
                        <span id="modal-date">${formattedDate}</span>
                    </div>
                </div>
            `;
            modalBody.appendChild(modalContent);

            // إنشاء HTML للوسوم
            let tagsHTML = '';
            tip.tags.forEach(tag => {
                tagsHTML += `<span class="tag">${tag}</span>`;
            });
            modalTags.innerHTML = tagsHTML;

            // عرض النافذة المنبثقة
            tipModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // إضافة مستمعي الأحداث

    // أزرار التصفية
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // إضافة الفئة النشطة للزر المضغوط
            this.classList.add('active');

            // تحديث الفئة الحالية
            currentCategory = this.getAttribute('data-category');

            // إعادة تعيين الصفحة الحالية
            currentPage = 1;

            // تصفية وعرض النصائح
            filterTips();
        });
    });

    // البحث
    searchBtn.addEventListener('click', function() {
        currentPage = 1;
        filterTips();
    });

    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            currentPage = 1;
            filterTips();
        }
    });

    // إغلاق النافذة المنبثقة
    modalClose.addEventListener('click', function() {
        tipModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modalCloseBtn.addEventListener('click', function() {
        tipModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // إغلاق النافذة المنبثقة عند النقر خارجها
    tipModal.addEventListener('click', function(event) {
        if (event.target === tipModal) {
            tipModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // تحميل بيانات النصائح عند تحميل الصفحة
    loadTipsData();
});
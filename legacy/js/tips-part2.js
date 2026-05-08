    // تصفية النصائح حسب الفئة والبحث
    function filterTips() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (currentCategory === 'all') {
            filteredTips = allTips;
        } else {
            filteredTips = allTips.filter(tip => tip.category === currentCategory);
        }
        
        // تصفية حسب البحث إذا كان هناك نص بحث
        if (searchTerm) {
            filteredTips = filteredTips.filter(tip => 
                tip.title.toLowerCase().includes(searchTerm) || 
                tip.content.toLowerCase().includes(searchTerm) ||
                tip.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        // إعادة تعيين الصفحة الحالية إلى 1 عند تغيير التصفية
        currentPage = 1;
        
        // عرض النصائح وتحديث الترقيم
        displayTips();
        updatePagination();
    }
    
    // عرض النصائح في الصفحة الحالية
    function displayTips() {
        // حساب النصائح التي سيتم عرضها في الصفحة الحالية
        const startIndex = (currentPage - 1) * tipsPerPage;
        const endIndex = startIndex + tipsPerPage;
        const currentTips = filteredTips.slice(startIndex, endIndex);
        
        // إذا لم تكن هناك نصائح للعرض
        if (filteredTips.length === 0) {
            tipsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>لا توجد نصائح مطابقة لبحثك. جرب كلمات مختلفة أو تصفية أخرى.</p>
                </div>
            `;
            pagination.innerHTML = '';
            return;
        }
        
        // إنشاء HTML للنصائح
        let tipsHTML = '';
        
        currentTips.forEach(tip => {
            // تحديد أيقونة الفئة
            let categoryIcon;
            switch (tip.category) {
                case 'nutrition':
                    categoryIcon = 'fa-apple-alt';
                    break;
                case 'training':
                    categoryIcon = 'fa-dumbbell';
                    break;
                case 'lifestyle':
                    categoryIcon = 'fa-heart';
                    break;
                default:
                    categoryIcon = 'fa-lightbulb';
            }
            
            // تحديد اسم الفئة بالعربية
            let categoryName;
            switch (tip.category) {
                case 'nutrition':
                    categoryName = 'تغذية';
                    break;
                case 'training':
                    categoryName = 'تدريب';
                    break;
                case 'lifestyle':
                    categoryName = 'نمط حياة';
                    break;
                default:
                    categoryName = 'عام';
            }
            
            // إنشاء HTML للنصيحة
            tipsHTML += `
                <div class="tip-card" data-id="${tip.id}" data-category="${tip.category}">
                    <div class="tip-image">
                        <img src="${tip.image}" alt="${tip.title}">
                        <div class="tip-category">
                            <i class="fas ${categoryIcon}"></i>
                            <span>${categoryName}</span>
                        </div>
                    </div>
                    <div class="tip-content">
                        <h3 class="tip-title">${tip.title}</h3>
                        <p class="tip-excerpt">${truncateText(tip.content, 120)}</p>
                        <button class="btn btn-primary read-more-btn" data-id="${tip.id}">
                            قراءة المزيد <i class="fas fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        // عرض النصائح
        tipsContainer.innerHTML = tipsHTML;
        
        // إضافة مستمعي الأحداث لأزرار "قراءة المزيد"
        const readMoreBtns = document.querySelectorAll('.read-more-btn');
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tipId = this.getAttribute('data-id');
                openTipModal(tipId);
            });
        });
    }
    
    // تحديث ترقيم الصفحات
    function updatePagination() {
        const totalPages = Math.ceil(filteredTips.length / tipsPerPage);
        
        // إذا كانت هناك صفحة واحدة فقط، لا داعي لعرض الترقيم
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
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // ضبط startPage إذا كان endPage في الحد الأقصى
        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // إضافة زر الصفحة الأولى إذا لم تكن مرئية
        if (startPage > 1) {
            paginationHTML += `
                <button class="pagination-btn page-btn" data-page="1">1</button>
            `;
            
            // إضافة نقاط إذا كانت هناك صفحات غير مرئية
            if (startPage > 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }
        
        // إضافة أزرار الصفحات المرئية
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
            `;
        }
        
        // إضافة زر الصفحة الأخيرة إذا لم تكن مرئية
        if (endPage < totalPages) {
            // إضافة نقاط إذا كانت هناك صفحات غير مرئية
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
            
            paginationHTML += `
                <button class="pagination-btn page-btn" data-page="${totalPages}">${totalPages}</button>
            `;
        }
        
        // زر الصفحة التالية
        paginationHTML += `
            <button class="pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // عرض الترقيم
        pagination.innerHTML = paginationHTML;
        
        // إضافة مستمعي الأحداث لأزرار الترقيم
        const pageBtns = document.querySelectorAll('.page-btn');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                displayTips();
                updatePagination();
                // التمرير إلى أعلى القسم
                tipsContainer.scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // إضافة مستمعي الأحداث لزر الصفحة السابقة
        const prevBtn = document.querySelector('.prev-btn');
        if (prevBtn && !prevBtn.disabled) {
            prevBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    displayTips();
                    updatePagination();
                    // التمرير إلى أعلى القسم
                    tipsContainer.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // إضافة مستمعي الأحداث لزر الصفحة التالية
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn && !nextBtn.disabled) {
            nextBtn.addEventListener('click', function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayTips();
                    updatePagination();
                    // التمرير إلى أعلى القسم
                    tipsContainer.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // فتح النافذة المنبثقة للنصيحة
    function openTipModal(tipId) {
        // البحث عن النصيحة بالمعرف
        const tip = allTips.find(t => t.id === tipId);
        
        if (!tip) {
            console.error('Tip not found:', tipId);
            return;
        }
        
        // تعيين عنوان النصيحة
        modalTitle.textContent = tip.title;
        
        // إنشاء محتوى النصيحة
        let contentHTML = `
            <div class="modal-image">
                <img src="${tip.image}" alt="${tip.title}">
            </div>
            <div class="modal-text">
                <p>${tip.content}</p>
            </div>
        `;
        
        // تعيين محتوى النصيحة
        modalBody.innerHTML = contentHTML;
        
        // إنشاء وسوم النصيحة
        let tagsHTML = '';
        tip.tags.forEach(tag => {
            tagsHTML += `<span class="tip-tag">${tag}</span>`;
        });
        
        // تعيين وسوم النصيحة
        modalTags.innerHTML = tagsHTML;
        
        // عرض النافذة المنبثقة
        tipModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // إغلاق النافذة المنبثقة للنصيحة
    function closeTipModal() {
        tipModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // اقتطاع النص إلى طول محدد
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        
        return text.substring(0, maxLength) + '...';
    }
    
    // إضافة مستمعي الأحداث
    
    // تصفية النصائح حسب الفئة
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر المختار
            this.classList.add('active');
            
            // تحديث الفئة الحالية
            currentCategory = this.getAttribute('data-category');
            
            // تصفية وعرض النصائح
            filterTips();
        });
    });
    
    // البحث عن النصائح
    searchBtn.addEventListener('click', function() {
        filterTips();
    });
    
    // البحث عند الضغط على Enter
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterTips();
        }
    });
    
    // إغلاق النافذة المنبثقة
    modalClose.addEventListener('click', closeTipModal);
    modalCloseBtn.addEventListener('click', closeTipModal);
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    tipModal.addEventListener('click', function(event) {
        if (event.target === tipModal) {
            closeTipModal();
        }
    });
    
    // تحميل بيانات النصائح عند تحميل الصفحة
    loadTipsData();
});

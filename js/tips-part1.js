/**
 * ملف JavaScript لصفحة النصائح
 * يحتوي على وظائف عرض وتصفية النصائح
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    let allTips = []; // جميع النصائح
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
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // تحميل بيانات النصائح
    function loadTipsData() {
        try {
            // دمج جميع النصائح
            const nutritionTips = window.nutritionTips1;
            const trainingTips = window.trainingTips1;

            allTips = [...nutritionTips, ...trainingTips];

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

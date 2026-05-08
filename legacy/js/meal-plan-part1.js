/**
 * ملف JavaScript لصفحة خطة الوجبات
 * يحتوي على وظائف إنشاء وعرض وتحميل خطط الوجبات
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التبديل بين علامات التبويب
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر المضغوط
            button.classList.add('active');
            
            // إخفاء جميع محتويات التبويب
            tabContents.forEach(content => content.classList.remove('active'));
            
            // إظهار محتوى التبويب المطلوب
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // نموذج إنشاء خطة الوجبات
    const mealPlanForm = document.getElementById('meal-plan-form');
    
    if (mealPlanForm) {
        mealPlanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createMealPlan();
        });
    }

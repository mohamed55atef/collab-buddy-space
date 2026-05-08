/**
 * ملف JavaScript لصفحة حساب السعرات الحرارية
 * يحتوي على وظائف حساب السعرات الحرارية ومؤشر كتلة الجسم وتوزيع العناصر الغذائية
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
    
    // نموذج حساب السعرات الحرارية
    const caloriesForm = document.getElementById('calories-form');
    const caloriesResults = document.getElementById('calories-results');
    
    if (caloriesForm) {
        caloriesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCalories();
        });
    }

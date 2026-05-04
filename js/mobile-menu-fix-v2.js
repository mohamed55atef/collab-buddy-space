/**
 * ملف إصلاح قائمة الهاتف المحمول (الإصدار الثاني)
 * يحتوي على وظائف إضافية لتحسين تفاعل القائمة على الهاتف المحمول
 */

// التأكد من تنفيذ الكود بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تهيئة إصلاح قائمة الهاتف المحمول (الإصدار الثاني)');
    
    // الحصول على عناصر القائمة
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // التحقق من وجود عناصر القائمة
    if (!menuToggle || !mainNav) {
        console.error('لم يتم العثور على عناصر القائمة');
        return;
    }
    
    // إنشاء الطبقة المتراكبة إذا لم تكن موجودة
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
        console.log('تم إنشاء الطبقة المتراكبة');
    }
    
    // إزالة مستمعي الأحداث الحالية
    const cloneMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(cloneMenuToggle, menuToggle);
    
    const cloneOverlay = overlay.cloneNode(true);
    overlay.parentNode.replaceChild(cloneOverlay, overlay);
    
    // تحديث المراجع
    overlay = cloneOverlay;
    
    // إضافة مستمع حدث للنقر على زر القائمة
    cloneMenuToggle.addEventListener('click', function(e) {
        console.log('تم النقر على زر القائمة');
        e.preventDefault();
        e.stopPropagation();
        
        // تبديل حالة القائمة
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // منع التمرير عندما تكون القائمة مفتوحة
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // إضافة مستمع حدث للنقر على الطبقة المتراكبة
    overlay.addEventListener('click', function(e) {
        console.log('تم النقر على الطبقة المتراكبة');
        e.preventDefault();
        e.stopPropagation();
        
        // إغلاق القائمة
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // الحصول على روابط القائمة
    const navLinks = document.querySelectorAll('.nav-link');
    
    // إضافة مستمع حدث لكل رابط في القائمة
    navLinks.forEach(function(link) {
        // إزالة مستمعي الأحداث الحالية
        const cloneLink = link.cloneNode(true);
        link.parentNode.replaceChild(cloneLink, link);
        
        // إضافة مستمع حدث جديد
        cloneLink.addEventListener('click', function() {
            console.log('تم النقر على رابط في القائمة:', this.href);
            
            // إغلاق القائمة
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // إضافة مستمعي أحداث اللمس
    if ('ontouchstart' in window) {
        console.log('تم اكتشاف جهاز يعمل باللمس');
        
        // إضافة مستمع حدث للمس على زر القائمة
        cloneMenuToggle.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
        
        // إضافة مستمع حدث للمس على الطبقة المتراكبة
        overlay.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            
            // إغلاق القائمة
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, { passive: true });
        
        // إضافة مستمع حدث للمس على روابط القائمة
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            }, { passive: true });
        });
    }
    
    console.log('تم تهيئة إصلاح قائمة الهاتف المحمول (الإصدار الثاني) بنجاح');
});

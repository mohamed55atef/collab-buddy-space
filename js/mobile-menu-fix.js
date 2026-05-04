/**
 * ملف إصلاح قائمة الهاتف المحمول
 * يحتوي على وظائف إضافية لتحسين تفاعل القائمة على الهاتف المحمول
 */

// التأكد من تنفيذ الكود بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تهيئة إصلاح قائمة الهاتف المحمول');

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

    // إضافة مستمع حدث للنقر على زر القائمة (للأجهزة التي تعمل باللمس)
    menuToggle.addEventListener('touchstart', handleMenuToggle, { passive: false });

    // إضافة مستمع حدث للنقر على زر القائمة (للأجهزة التي تعمل بالماوس)
    menuToggle.addEventListener('click', handleMenuToggle);

    // وظيفة التعامل مع النقر على زر القائمة
    function handleMenuToggle(e) {
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
    }

    // إضافة مستمع حدث للنقر على الطبقة المتراكبة (للأجهزة التي تعمل باللمس)
    overlay.addEventListener('touchstart', handleOverlayClick, { passive: false });

    // إضافة مستمع حدث للنقر على الطبقة المتراكبة (للأجهزة التي تعمل بالماوس)
    overlay.addEventListener('click', handleOverlayClick);

    // وظيفة التعامل مع النقر على الطبقة المتراكبة
    function handleOverlayClick(e) {
        console.log('تم النقر على الطبقة المتراكبة');
        e.preventDefault();
        e.stopPropagation();

        // إغلاق القائمة
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // الحصول على روابط القائمة
    const navLinks = document.querySelectorAll('.nav-link');

    // إضافة مستمع حدث لكل رابط في القائمة
    navLinks.forEach(function(link) {
        // إضافة مستمع حدث للنقر على الرابط (للأجهزة التي تعمل باللمس)
        link.addEventListener('touchstart', handleNavLinkClick, { passive: true });

        // إضافة مستمع حدث للنقر على الرابط (للأجهزة التي تعمل بالماوس)
        link.addEventListener('click', handleNavLinkClick);
    });

    // وظيفة التعامل مع النقر على رابط في القائمة
    function handleNavLinkClick(e) {
        console.log('تم النقر على رابط في القائمة:', e.target.href);

        // إغلاق القائمة
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        // تأخير الانتقال قليلاً لإتاحة الوقت لإغلاق القائمة
        if (e.type === 'touchstart') {
            e.preventDefault();
            setTimeout(function() {
                window.location.href = e.target.href;
            }, 100);
        }
    }

    console.log('تم تهيئة إصلاح قائمة الهاتف المحمول بنجاح');
});

/**
 * ملف JavaScript الرئيسي - الجزء الأول
 * يحتوي على وظائف عامة للموقع
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const yearElement = document.getElementById('year');
    
    // تحديث السنة في التذييل
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // إضافة مستمع الحدث لزر القائمة
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // تغيير أيقونة القائمة
            if (menuToggle.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // إضافة مستمع الحدث للتمرير
    window.addEventListener('scroll', function() {
        // إضافة فئة للرأس عند التمرير
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // إظهار زر التمرير لأعلى عند التمرير
        toggleScrollTopButton();
    });
    
    // إنشاء زر التمرير لأعلى
    createScrollTopButton();
    
    // إضافة مستمع الحدث للنقر خارج القائمة
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active') && !mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // إضافة مستمع الحدث لتغيير حجم النافذة
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // إنشاء زر التمرير لأعلى
    function createScrollTopButton() {
        // التحقق من وجود الزر
        if (document.querySelector('.scroll-top')) {
            return;
        }
        
        // إنشاء الزر
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.setAttribute('aria-label', 'التمرير لأعلى');
        
        // إضافة مستمع الحدث للنقر
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // إضافة الزر إلى الصفحة
        document.body.appendChild(scrollTopBtn);
        
        // إظهار/إخفاء الزر عند التمرير
        toggleScrollTopButton();
    }
    
    // إظهار/إخفاء زر التمرير لأعلى
    function toggleScrollTopButton() {
        const scrollTopBtn = document.querySelector('.scroll-top');
        
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    }
    
    // إنشاء مؤشر التحميل
    function createLoader() {
        // التحقق من وجود المؤشر
        if (document.querySelector('.loader')) {
            return;
        }
        
        // إنشاء المؤشر
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        
        // إضافة المؤشر إلى الصفحة
        document.body.appendChild(loader);
        
        // إخفاء المؤشر بعد اكتمال تحميل الصفحة
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hide');
                
                // إزالة المؤشر من DOM بعد انتهاء الرسوم المتحركة
                setTimeout(function() {
                    loader.remove();
                }, 500);
            }, 500);
        });
    }
    
    // إنشاء مؤشر التحميل
    createLoader();

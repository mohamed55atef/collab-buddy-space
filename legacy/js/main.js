// تحديث السنة في حقوق النشر
document.getElementById('year').textContent = new Date().getFullYear();

// قائمة التنقل للأجهزة المحمولة
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    // إنشاء عنصر الطبقة المتراكبة إذا لم يكن موجوداً
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        body.appendChild(overlay);
    }

    // تبديل حالة القائمة
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');

            // منع التمرير عندما تكون القائمة مفتوحة
            if (mainNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }

    // إغلاق القائمة عند النقر على الطبقة المتراكبة
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = 'auto';
        });
    }

    // إغلاق القائمة عند النقر على الروابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // لا نمنع السلوك الافتراضي هنا لأننا نريد أن يتم الانتقال إلى الصفحة

            // إغلاق القائمة
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });
});

// تأثيرات التمرير
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('fade-in');
        }
    });
});

// إضافة فئة للتأثيرات
document.addEventListener('DOMContentLoaded', () => {
    // إضافة فئة للأقسام للتأثيرات
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // إضافة فئة لبطاقات الميزات للتأثيرات
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, 100 * index);
    });
});

// إضافة فئات CSS للتأثيرات
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.5s ease-in;
    }

    .slide-in {
        animation: slideIn 0.5s ease-in;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideIn {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

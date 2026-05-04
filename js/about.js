/**
 * ملف JavaScript لصفحة من نحن
 * يحتوي على وظائف عرض الشهادات وإرسال نموذج الاتصال
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.slider-dot');
    
    // عناصر DOM
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const contactForm = document.getElementById('contact-form');
    
    // إضافة مستمعي الأحداث
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', showPreviousTestimonial);
        nextBtn.addEventListener('click', showNextTestimonial);
    }
    
    // إضافة مستمعي الأحداث لنقاط التحكم
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // إضافة مستمع الحدث لنموذج الاتصال
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // عرض الشهادة السابقة
    function showPreviousTestimonial() {
        showTestimonial(currentTestimonial - 1);
    }
    
    // عرض الشهادة التالية
    function showNextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }
    
    // عرض شهادة محددة
    function showTestimonial(index) {
        // التحقق من صحة الفهرس
        if (index < 0) {
            index = testimonials.length - 1;
        } else if (index >= testimonials.length) {
            index = 0;
        }
        
        // إخفاء جميع الشهادات
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // إزالة الفئة النشطة من جميع النقاط
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // عرض الشهادة الحالية
        testimonials[index].classList.add('active');
        
        // تحديث النقطة النشطة
        dots[index].classList.add('active');
        
        // تحديث الفهرس الحالي
        currentTestimonial = index;
    }
    
    // معالجة إرسال نموذج الاتصال
    function handleContactFormSubmit(event) {
        event.preventDefault();
        
        // الحصول على قيم النموذج
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        
        // التحقق من صحة البيانات
        if (!name || !email || !subject || !message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // محاكاة إرسال النموذج
        // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم
        setTimeout(() => {
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // إظهار إشعار نجاح
            showNotification('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.', 'success');
        }, 1000);
    }
    
    // إظهار إشعار
    function showNotification(message, type) {
        // التحقق من وجود عنصر الإشعارات
        let notifications = document.querySelector('.notifications');
        
        // إنشاء عنصر الإشعارات إذا لم يكن موجوداً
        if (!notifications) {
            notifications = document.createElement('div');
            notifications.className = 'notifications';
            document.body.appendChild(notifications);
        }
        
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // إنشاء محتوى الإشعار
        const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <p>${message}</p>
        `;
        
        // إضافة الإشعار إلى حاوية الإشعارات
        notifications.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // إخفاء الإشعار بعد 5 ثوانٍ
        setTimeout(() => {
            notification.classList.remove('show');
            
            // إزالة الإشعار من DOM بعد انتهاء الرسوم المتحركة
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // تشغيل عرض الشرائح التلقائي
    function startAutoSlide() {
        setInterval(() => {
            showNextTestimonial();
        }, 5000);
    }
    
    // بدء عرض الشرائح التلقائي
    if (testimonials.length > 0) {
        startAutoSlide();
    }
    
    // عرض الشهادة الأولى
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
    
    // إضافة تأثيرات التمرير
    function addScrollEffects() {
        const elements = document.querySelectorAll('.about-image, .about-text, .vision-card, .mission-card, .team-member, .contact-info, .contact-form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // إضافة تأثيرات التمرير إذا كان المتصفح يدعم IntersectionObserver
    if ('IntersectionObserver' in window) {
        addScrollEffects();
    }
});

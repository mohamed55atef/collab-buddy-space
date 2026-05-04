/**
 * ملف إدارة الرسوم المتحركة لصفحة جدول التمارين
 * يحتوي على وظائف إضافة وإدارة الرسوم المتحركة
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن إدارة الرسوم المتحركة
window.workoutScheduleApp.animationManager = {
    // تطبيق رسم متحرك على عنصر
    animateElement: function(element, animationName, duration = 500, callback) {
        // التحقق من وجود العنصر
        if (!element) {
            console.error('لم يتم تحديد عنصر للرسم المتحرك');
            return;
        }
        
        // إضافة فئة الرسم المتحرك
        element.style.animation = `${animationName} ${duration}ms`;
        
        // تنفيذ الدالة بعد انتهاء الرسم المتحرك
        element.addEventListener('animationend', function() {
            if (typeof callback === 'function') {
                callback();
            }
        }, { once: true });
    },
    
    // تطبيق رسم متحرك للظهور
    fadeIn: function(element, duration = 500, callback) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms`;
            element.style.opacity = '1';
            
            setTimeout(() => {
                if (typeof callback === 'function') {
                    callback();
                }
            }, duration);
        }, 10);
    },
    
    // تطبيق رسم متحرك للاختفاء
    fadeOut: function(element, duration = 500, callback) {
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
            
            if (typeof callback === 'function') {
                callback();
            }
        }, duration);
    },
    
    // تطبيق رسم متحرك للانزلاق للأسفل
    slideDown: function(element, duration = 500, callback) {
        // حفظ الارتفاع الأصلي
        const height = element.scrollHeight;
        
        // تهيئة العنصر
        element.style.overflow = 'hidden';
        element.style.height = '0';
        element.style.display = 'block';
        element.style.transition = `height ${duration}ms`;
        
        setTimeout(() => {
            element.style.height = `${height}px`;
            
            setTimeout(() => {
                element.style.height = 'auto';
                
                if (typeof callback === 'function') {
                    callback();
                }
            }, duration);
        }, 10);
    },
    
    // تطبيق رسم متحرك للانزلاق للأعلى
    slideUp: function(element, duration = 500, callback) {
        // حفظ الارتفاع الأصلي
        const height = element.scrollHeight;
        
        // تهيئة العنصر
        element.style.overflow = 'hidden';
        element.style.height = `${height}px`;
        element.style.transition = `height ${duration}ms`;
        
        setTimeout(() => {
            element.style.height = '0';
            
            setTimeout(() => {
                element.style.display = 'none';
                
                if (typeof callback === 'function') {
                    callback();
                }
            }, duration);
        }, 10);
    },
    
    // تطبيق رسم متحرك للنبض
    pulse: function(element, duration = 500, callback) {
        element.style.animation = `pulse ${duration}ms`;
        
        element.addEventListener('animationend', function() {
            if (typeof callback === 'function') {
                callback();
            }
        }, { once: true });
    },
    
    // تطبيق رسم متحرك للاهتزاز
    shake: function(element, duration = 500, callback) {
        element.style.animation = `shake ${duration}ms`;
        
        element.addEventListener('animationend', function() {
            if (typeof callback === 'function') {
                callback();
            }
        }, { once: true });
    },
    
    // تطبيق رسم متحرك للتلاشي والظهور
    fadeInOut: function(element, duration = 3000, callback) {
        element.style.animation = `fadeInOut ${duration}ms`;
        
        element.addEventListener('animationend', function() {
            if (typeof callback === 'function') {
                callback();
            }
        }, { once: true });
    }
};

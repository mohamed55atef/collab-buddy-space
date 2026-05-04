/**
 * ملف إدارة الإشعارات لصفحة جدول التمارين
 * يحتوي على وظائف عرض وإخفاء الإشعارات
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن إدارة الإشعارات
window.workoutScheduleApp.notificationManager = {
    // عرض إشعار
    showNotification: function(message, type = 'success') {
        // إنشاء عنصر الإشعار
        const notificationDiv = document.createElement('div');
        notificationDiv.className = type === 'success' ? 'confirm-message' : 'error-message';
        notificationDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        
        // إضافة الإشعار إلى الصفحة
        document.body.appendChild(notificationDiv);
        
        // تطبيق الرسوم المتحركة
        window.workoutScheduleApp.animationManager.animateElement(notificationDiv, 'fadeInOut');
        
        // إزالة الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            this.removeNotification(notificationDiv);
        }, 3000);
        
        return notificationDiv;
    },
    
    // إزالة إشعار
    removeNotification: function(notificationElement) {
        // إزالة الإشعار من الصفحة
        if (notificationElement && notificationElement.parentNode) {
            notificationElement.parentNode.removeChild(notificationElement);
        }
    },
    
    // عرض إشعار نجاح
    showSuccess: function(message) {
        return this.showNotification(message, 'success');
    },
    
    // عرض إشعار خطأ
    showError: function(message) {
        return this.showNotification(message, 'error');
    },
    
    // عرض إشعار تحذير
    showWarning: function(message) {
        // إنشاء عنصر الإشعار
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'warning-message';
        notificationDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        // إضافة الإشعار إلى الصفحة
        document.body.appendChild(notificationDiv);
        
        // تطبيق الرسوم المتحركة
        window.workoutScheduleApp.animationManager.animateElement(notificationDiv, 'fadeInOut');
        
        // إزالة الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            this.removeNotification(notificationDiv);
        }, 3000);
        
        return notificationDiv;
    },
    
    // عرض إشعار معلومات
    showInfo: function(message) {
        // إنشاء عنصر الإشعار
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'info-message';
        notificationDiv.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
        
        // إضافة الإشعار إلى الصفحة
        document.body.appendChild(notificationDiv);
        
        // تطبيق الرسوم المتحركة
        window.workoutScheduleApp.animationManager.animateElement(notificationDiv, 'fadeInOut');
        
        // إزالة الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            this.removeNotification(notificationDiv);
        }, 3000);
        
        return notificationDiv;
    },
    
    // عرض إشعار تأكيد
    showConfirmation: function(message, confirmCallback, cancelCallback) {
        // إنشاء عنصر الإشعار
        const confirmationDiv = document.createElement('div');
        confirmationDiv.className = 'confirmation-message';
        confirmationDiv.innerHTML = `
            <div class="confirmation-content">
                <i class="fas fa-question-circle"></i>
                <p>${message}</p>
                <div class="confirmation-actions">
                    <button class="btn btn-primary confirm-btn">تأكيد</button>
                    <button class="btn btn-secondary cancel-btn">إلغاء</button>
                </div>
            </div>
        `;
        
        // إضافة الإشعار إلى الصفحة
        document.body.appendChild(confirmationDiv);
        
        // تطبيق الرسوم المتحركة
        window.workoutScheduleApp.animationManager.animateElement(confirmationDiv, 'fadeIn');
        
        // إضافة مستمعي الأحداث للأزرار
        const confirmBtn = confirmationDiv.querySelector('.confirm-btn');
        const cancelBtn = confirmationDiv.querySelector('.cancel-btn');
        
        confirmBtn.addEventListener('click', () => {
            this.removeNotification(confirmationDiv);
            if (typeof confirmCallback === 'function') {
                confirmCallback();
            }
        });
        
        cancelBtn.addEventListener('click', () => {
            this.removeNotification(confirmationDiv);
            if (typeof cancelCallback === 'function') {
                cancelCallback();
            }
        });
        
        return confirmationDiv;
    }
};

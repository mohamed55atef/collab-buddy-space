/**
 * ملف إدارة التخزين لصفحة جدول التمارين
 * يحتوي على وظائف حفظ واسترجاع البيانات من التخزين المحلي
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن إدارة التخزين
window.workoutScheduleApp.storageManager = {
    // اسم مفتاح التخزين المحلي
    STORAGE_KEY: 'workoutSchedule',
    
    // حفظ جدول التمارين في التخزين المحلي
    saveSchedule: function(schedule) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(schedule));
            console.log('تم حفظ جدول التمارين في التخزين المحلي');
            return true;
        } catch (error) {
            console.error('حدث خطأ أثناء حفظ جدول التمارين:', error);
            return false;
        }
    },
    
    // تحميل جدول التمارين من التخزين المحلي
    loadSchedule: function() {
        try {
            const savedSchedule = localStorage.getItem(this.STORAGE_KEY);
            if (!savedSchedule) {
                console.log('لا يوجد جدول تمارين محفوظ');
                return null;
            }
            
            const schedule = JSON.parse(savedSchedule);
            console.log('تم تحميل جدول التمارين من التخزين المحلي');
            return schedule;
        } catch (error) {
            console.error('حدث خطأ أثناء تحميل جدول التمارين:', error);
            return null;
        }
    },
    
    // حذف جدول التمارين من التخزين المحلي
    clearSchedule: function() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            console.log('تم حذف جدول التمارين من التخزين المحلي');
            return true;
        } catch (error) {
            console.error('حدث خطأ أثناء حذف جدول التمارين:', error);
            return false;
        }
    },
    
    // حفظ إعدادات المستخدم في التخزين المحلي
    saveUserSettings: function(settings) {
        try {
            localStorage.setItem('workoutUserSettings', JSON.stringify(settings));
            console.log('تم حفظ إعدادات المستخدم في التخزين المحلي');
            return true;
        } catch (error) {
            console.error('حدث خطأ أثناء حفظ إعدادات المستخدم:', error);
            return false;
        }
    },
    
    // تحميل إعدادات المستخدم من التخزين المحلي
    loadUserSettings: function() {
        try {
            const savedSettings = localStorage.getItem('workoutUserSettings');
            if (!savedSettings) {
                console.log('لا توجد إعدادات مستخدم محفوظة');
                return null;
            }
            
            const settings = JSON.parse(savedSettings);
            console.log('تم تحميل إعدادات المستخدم من التخزين المحلي');
            return settings;
        } catch (error) {
            console.error('حدث خطأ أثناء تحميل إعدادات المستخدم:', error);
            return null;
        }
    }
};

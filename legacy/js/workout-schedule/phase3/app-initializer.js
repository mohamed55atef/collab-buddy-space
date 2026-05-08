/**
 * ملف تهيئة التطبيق لصفحة جدول التمارين
 * يحتوي على وظائف تهيئة التطبيق وبدء تشغيله
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن تهيئة التطبيق
window.workoutScheduleApp.appInitializer = {
    // تهيئة التطبيق
    init: function() {
        console.log('بدء تهيئة تطبيق جدول التمارين');
        
        // تهيئة واجهة المستخدم
        this.initUI();
        
        // تحميل بيانات التمارين
        this.loadExerciseData();
        
        // تهيئة مستمعي الأحداث
        this.initEventListeners();
        
        // تحميل إعدادات المستخدم
        this.loadUserSettings();
        
        console.log('تم تهيئة تطبيق جدول التمارين بنجاح');
    },
    
    // تهيئة واجهة المستخدم
    initUI: function() {
        console.log('تهيئة واجهة المستخدم');
        
        // تحديث السنة في تذييل الصفحة
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // تحديد الهدف الافتراضي
        const goalCards = window.workoutScheduleApp.ui.elements.goalCards;
        if (goalCards && goalCards.length > 0) {
            goalCards[0].classList.add('active');
        }
    },
    
    // تحميل بيانات التمارين
    loadExerciseData: function() {
        console.log('بدء تحميل بيانات التمارين');
        
        // إظهار شاشة التحميل
        window.workoutScheduleApp.ui.showLoading();
        
        // تحميل بيانات التمارين
        window.workoutScheduleApp.dataLoader.loadExerciseData().then(success => {
            if (success) {
                console.log('تم تحميل بيانات التمارين بنجاح');
            } else {
                console.error('فشل في تحميل بيانات التمارين');
                window.workoutScheduleApp.ui.showMessage('فشل في تحميل بيانات التمارين. يرجى تحديث الصفحة والمحاولة مرة أخرى.', 'error');
            }
            
            // إخفاء شاشة التحميل
            window.workoutScheduleApp.ui.hideLoading();
        });
    },
    
    // تهيئة مستمعي الأحداث
    initEventListeners: function() {
        console.log('تهيئة مستمعي الأحداث');
        
        // تهيئة مستمعي الأحداث
        window.workoutScheduleApp.eventListeners.init();
    },
    
    // تحميل إعدادات المستخدم
    loadUserSettings: function() {
        console.log('تحميل إعدادات المستخدم');
        
        // تحميل إعدادات النموذج
        window.workoutScheduleApp.formHandler.loadFormSettings();
        
        // تحميل جدول التمارين المحفوظ
        const savedSchedule = window.workoutScheduleApp.storageManager.loadSchedule();
        if (savedSchedule) {
            console.log('تم العثور على جدول تمارين محفوظ');
            
            // تحديث الجدول الحالي
            window.workoutScheduleApp.scheduleCreator.currentSchedule = savedSchedule;
            
            // عرض جدول التمارين
            window.workoutScheduleApp.ui.displayWorkoutSchedule();
            window.workoutScheduleApp.ui.showScheduleSection();
        }
    }
};

// تنفيذ التهيئة عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة التطبيق
    window.workoutScheduleApp.appInitializer.init();
});

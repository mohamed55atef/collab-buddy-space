/**
 * ملف مستمعي الأحداث لصفحة جدول التمارين
 * يحتوي على وظائف إضافة مستمعي الأحداث للعناصر
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن مستمعي الأحداث
window.workoutScheduleApp.eventListeners = {
    // تهيئة مستمعي الأحداث
    init: function() {
        // إضافة مستمعي الأحداث لأهداف التمرين
        this.setupGoalCardListeners();
        
        // إضافة مستمعي الأحداث لزر إنشاء جدول التمارين
        this.setupGenerateScheduleButtonListener();
        
        // إضافة مستمعي الأحداث لأزرار جدول التمارين
        this.setupScheduleButtonsListeners();
        
        // إضافة مستمعي الأحداث للنافذة المنبثقة
        this.setupModalListeners();
    },
    
    // إضافة مستمعي الأحداث لأهداف التمرين
    setupGoalCardListeners: function() {
        const goalCards = window.workoutScheduleApp.ui.elements.goalCards;
        
        goalCards.forEach(card => {
            card.addEventListener('click', () => {
                // إزالة الفئة النشطة من جميع البطاقات
                goalCards.forEach(c => c.classList.remove('active'));
                
                // إضافة الفئة النشطة للبطاقة المختارة
                card.classList.add('active');
                
                // تطبيق رسم متحرك للنبض
                window.workoutScheduleApp.animationManager.pulse(card);
            });
        });
    },
    
    // إضافة مستمعي الأحداث لزر إنشاء جدول التمارين
    setupGenerateScheduleButtonListener: function() {
        const generateScheduleBtn = window.workoutScheduleApp.ui.elements.generateScheduleBtn;
        
        generateScheduleBtn.addEventListener('click', () => {
            // التحقق من صحة النموذج
            if (!window.workoutScheduleApp.formHandler.validateScheduleForm()) {
                return;
            }
            
            // الحصول على قيم النموذج
            const formValues = window.workoutScheduleApp.formHandler.getScheduleFormValues();
            
            // حفظ إعدادات النموذج
            window.workoutScheduleApp.formHandler.saveFormSettings();
            
            // إظهار شاشة التحميل
            window.workoutScheduleApp.ui.showLoading();
            
            // إنشاء جدول التمارين بعد تأخير قصير لإظهار شاشة التحميل
            setTimeout(() => {
                try {
                    // التحقق من تحميل بيانات التمارين
                    if (!window.workoutScheduleApp.dataLoader.isLoaded) {
                        window.workoutScheduleApp.dataLoader.loadExerciseData().then(success => {
                            if (success) {
                                this.createWorkoutSchedule(formValues);
                            } else {
                                window.workoutScheduleApp.ui.hideLoading();
                                window.workoutScheduleApp.ui.showMessage('فشل في تحميل بيانات التمارين. يرجى تحديث الصفحة والمحاولة مرة أخرى.', 'error');
                            }
                        });
                    } else {
                        this.createWorkoutSchedule(formValues);
                    }
                } catch (error) {
                    console.error('حدث خطأ أثناء إنشاء جدول التمارين:', error);
                    window.workoutScheduleApp.ui.hideLoading();
                    window.workoutScheduleApp.ui.showMessage('حدث خطأ أثناء إنشاء جدول التمارين', 'error');
                }
            }, 500);
        });
    },
    
    // إنشاء جدول التمارين
    createWorkoutSchedule: function(formValues) {
        try {
            // إنشاء جدول التمارين
            window.workoutScheduleApp.scheduleCreator.createWorkoutSchedule(
                formValues.goal,
                formValues.level,
                formValues.days,
                formValues.duration,
                formValues.equipment
            );
            
            // عرض جدول التمارين
            window.workoutScheduleApp.ui.displayWorkoutSchedule();
            window.workoutScheduleApp.ui.showScheduleSection();
            
            // إخفاء شاشة التحميل
            window.workoutScheduleApp.ui.hideLoading();
            
            // التمرير إلى قسم جدول التمارين
            window.workoutScheduleApp.ui.elements.workoutScheduleSection.scrollIntoView({ behavior: 'smooth' });
            
            // عرض رسالة نجاح
            window.workoutScheduleApp.ui.showMessage('تم إنشاء جدول التمارين بنجاح', 'success');
        } catch (error) {
            console.error('حدث خطأ أثناء إنشاء جدول التمارين:', error);
            window.workoutScheduleApp.ui.hideLoading();
            window.workoutScheduleApp.ui.showMessage('حدث خطأ أثناء إنشاء جدول التمارين', 'error');
        }
    },
    
    // إضافة مستمعي الأحداث لأزرار جدول التمارين
    setupScheduleButtonsListeners: function() {
        // زر تعديل الجدول
        const editScheduleBtn = window.workoutScheduleApp.ui.elements.editScheduleBtn;
        editScheduleBtn.addEventListener('click', () => {
            window.workoutScheduleApp.scheduleEditor.editSchedule();
        });
        
        // زر حفظ الجدول
        const saveScheduleBtn = window.workoutScheduleApp.ui.elements.saveScheduleBtn;
        saveScheduleBtn.addEventListener('click', () => {
            window.workoutScheduleApp.scheduleEditor.saveSchedule();
        });
        
        // زر طباعة الجدول
        const printScheduleBtn = window.workoutScheduleApp.ui.elements.printScheduleBtn;
        printScheduleBtn.addEventListener('click', () => {
            window.workoutScheduleApp.printManager.printSchedule();
        });
    },
    
    // إضافة مستمعي الأحداث للنافذة المنبثقة
    setupModalListeners: function() {
        // زر إغلاق النافذة
        const modalClose = window.workoutScheduleApp.ui.elements.modalClose;
        modalClose.addEventListener('click', () => {
            window.workoutScheduleApp.modalManager.closeExerciseModal();
        });
        
        // زر إغلاق النافذة في الأسفل
        const modalCloseBtn = window.workoutScheduleApp.ui.elements.modalCloseBtn;
        modalCloseBtn.addEventListener('click', () => {
            window.workoutScheduleApp.modalManager.closeExerciseModal();
        });
        
        // إغلاق النافذة عند النقر خارجها
        const exerciseModal = window.workoutScheduleApp.ui.elements.exerciseModal;
        exerciseModal.addEventListener('click', (event) => {
            if (event.target === exerciseModal) {
                window.workoutScheduleApp.modalManager.closeExerciseModal();
            }
        });
        
        // زر البحث
        const searchBtn = window.workoutScheduleApp.ui.elements.searchBtn;
        searchBtn.addEventListener('click', () => {
            window.workoutScheduleApp.modalManager.searchExercises();
        });
        
        // البحث عند الضغط على Enter
        const exerciseSearch = window.workoutScheduleApp.ui.elements.exerciseSearch;
        exerciseSearch.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                window.workoutScheduleApp.modalManager.searchExercises();
            }
        });
        
        // تغيير تصفية العضلات
        const muscleFilter = window.workoutScheduleApp.ui.elements.muscleFilter;
        muscleFilter.addEventListener('change', () => {
            window.workoutScheduleApp.modalManager.searchExercises();
        });
    }
};

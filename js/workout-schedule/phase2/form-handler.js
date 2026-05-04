/**
 * ملف معالجة النماذج لصفحة جدول التمارين
 * يحتوي على وظائف معالجة النماذج والتحقق من صحة البيانات
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن معالجة النماذج
window.workoutScheduleApp.formHandler = {
    // الحصول على قيم نموذج إنشاء جدول التمارين
    getScheduleFormValues: function() {
        // الحصول على الهدف المختار
        const goalCards = window.workoutScheduleApp.ui.elements.goalCards;
        let selectedGoal = 'strength'; // القيمة الافتراضية
        
        goalCards.forEach(card => {
            if (card.classList.contains('active')) {
                selectedGoal = card.getAttribute('data-goal');
            }
        });
        
        // الحصول على المستوى
        const level = window.workoutScheduleApp.ui.elements.experienceLevel.value;
        
        // الحصول على عدد الأيام
        const days = parseInt(window.workoutScheduleApp.ui.elements.daysPerWeek.value);
        
        // الحصول على المدة
        const duration = parseInt(window.workoutScheduleApp.ui.elements.workoutDuration.value);
        
        // الحصول على المعدات المختارة
        const equipmentCheckboxes = window.workoutScheduleApp.ui.elements.equipmentCheckboxes;
        const equipment = Array.from(equipmentCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        return {
            goal: selectedGoal,
            level: level,
            days: days,
            duration: duration,
            equipment: equipment
        };
    },
    
    // التحقق من صحة بيانات النموذج
    validateScheduleForm: function() {
        const formValues = this.getScheduleFormValues();
        
        // التحقق من اختيار هدف
        if (!formValues.goal) {
            window.workoutScheduleApp.ui.showMessage('يرجى اختيار هدف للتمرين', 'error');
            return false;
        }
        
        // التحقق من اختيار معدات واحدة على الأقل
        if (formValues.equipment.length === 0) {
            window.workoutScheduleApp.ui.showMessage('يرجى اختيار نوع واحد على الأقل من المعدات المتاحة', 'error');
            return false;
        }
        
        return true;
    },
    
    // حفظ إعدادات النموذج
    saveFormSettings: function() {
        const formValues = this.getScheduleFormValues();
        
        // حفظ الإعدادات في التخزين المحلي
        window.workoutScheduleApp.storageManager.saveUserSettings(formValues);
    },
    
    // استرجاع إعدادات النموذج
    loadFormSettings: function() {
        const settings = window.workoutScheduleApp.storageManager.loadUserSettings();
        
        if (!settings) {
            return;
        }
        
        // تحديث الهدف المختار
        const goalCards = window.workoutScheduleApp.ui.elements.goalCards;
        goalCards.forEach(card => {
            if (card.getAttribute('data-goal') === settings.goal) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // تحديث المستوى
        if (settings.level) {
            window.workoutScheduleApp.ui.elements.experienceLevel.value = settings.level;
        }
        
        // تحديث عدد الأيام
        if (settings.days) {
            window.workoutScheduleApp.ui.elements.daysPerWeek.value = settings.days;
        }
        
        // تحديث المدة
        if (settings.duration) {
            window.workoutScheduleApp.ui.elements.workoutDuration.value = settings.duration;
        }
        
        // تحديث المعدات المختارة
        const equipmentCheckboxes = window.workoutScheduleApp.ui.elements.equipmentCheckboxes;
        equipmentCheckboxes.forEach(checkbox => {
            checkbox.checked = settings.equipment.includes(checkbox.value);
        });
    },
    
    // إعادة تعيين النموذج
    resetForm: function() {
        // إعادة تعيين الهدف المختار
        const goalCards = window.workoutScheduleApp.ui.elements.goalCards;
        goalCards.forEach(card => {
            if (card.getAttribute('data-goal') === 'strength') {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // إعادة تعيين المستوى
        window.workoutScheduleApp.ui.elements.experienceLevel.value = 'beginner';
        
        // إعادة تعيين عدد الأيام
        window.workoutScheduleApp.ui.elements.daysPerWeek.value = '3';
        
        // إعادة تعيين المدة
        window.workoutScheduleApp.ui.elements.workoutDuration.value = '60';
        
        // إعادة تعيين المعدات المختارة
        const equipmentCheckboxes = window.workoutScheduleApp.ui.elements.equipmentCheckboxes;
        equipmentCheckboxes.forEach(checkbox => {
            checkbox.checked = checkbox.value === 'bodyweight' || checkbox.value === 'dumbbell';
        });
    }
};

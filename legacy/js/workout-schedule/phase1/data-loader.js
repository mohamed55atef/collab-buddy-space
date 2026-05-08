/**
 * ملف تحميل البيانات لصفحة جدول التمارين
 * يحتوي على وظائف تحميل بيانات التمارين من ملفات JSON
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن تحميل البيانات
window.workoutScheduleApp.dataLoader = {
    // متغيرات عامة
    allExercises: [], // جميع التمارين
    isLoading: false, // حالة التحميل
    isLoaded: false, // حالة اكتمال التحميل

    // تحميل بيانات التمارين
    loadExerciseData: async function() {
        // التحقق من حالة التحميل
        if (this.isLoading) {
            console.log('جاري تحميل البيانات بالفعل...');
            return false;
        }

        // التحقق من اكتمال التحميل
        if (this.isLoaded && this.allExercises.length > 0) {
            console.log('تم تحميل البيانات بالفعل');
            return true;
        }

        try {
            // تحديث حالة التحميل
            this.isLoading = true;

            // إظهار شاشة التحميل
            window.workoutScheduleApp.ui.showLoading();

            // استخدام البيانات المضمنة مباشرة
            try {
                console.log('جاري تحميل بيانات التمارين المضمنة...');

                // تهيئة بيانات التمارين من خلال كائن exerciseDataLoader
                const success = window.workoutScheduleApp.exerciseDataLoader.init();

                if (!success) {
                    throw new Error('فشل في تهيئة بيانات التمارين');
                }

                // الحصول على التمارين من كائن exerciseDataLoader
                this.allExercises = window.workoutScheduleApp.dataLoader.allExercises;

                console.log(`تم تحميل ${this.allExercises.length} تمرين بنجاح`);
            } catch (error) {
                console.error('خطأ في تحميل بيانات التمارين:', error);
                throw error;
            }

            // التحقق من وجود تمارين
            if (this.allExercises.length === 0) {
                throw new Error('لم يتم تحميل أي تمارين');
            }

            console.log(`تم تحميل إجمالي ${this.allExercises.length} تمرين`);

            // طباعة بعض التمارين للتحقق
            console.log('عينة من التمارين المحملة:', this.allExercises.slice(0, 3));

            // تحديث حالة التحميل
            this.isLoaded = true;
            this.isLoading = false;

            // إخفاء شاشة التحميل
            window.workoutScheduleApp.ui.hideLoading();

            // تحقق من وجود خطة تمرين محفوظة
            const savedSchedule = window.workoutScheduleApp.storageManager.loadSchedule();
            if (savedSchedule) {
                window.workoutScheduleApp.scheduleCreator.currentSchedule = savedSchedule;
                window.workoutScheduleApp.ui.displayWorkoutSchedule();
                window.workoutScheduleApp.ui.showScheduleSection();
            }

            return true;
        } catch (error) {
            console.error('حدث خطأ أثناء تحميل بيانات التمارين:', error);
            window.workoutScheduleApp.ui.showMessage('حدث خطأ أثناء تحميل بيانات التمارين. يرجى تحديث الصفحة والمحاولة مرة أخرى.', 'error');

            // تحديث حالة التحميل
            this.isLoading = false;

            // إخفاء شاشة التحميل
            window.workoutScheduleApp.ui.hideLoading();

            return false;
        }
    },

    // الحصول على تمرين بواسطة المعرف
    getExerciseById: function(exerciseId) {
        return this.allExercises.find(exercise => exercise.id === exerciseId);
    },

    // الحصول على تمارين حسب العضلة
    getExercisesByMuscle: function(muscle) {
        return this.allExercises.filter(exercise => exercise.muscle === muscle);
    },

    // الحصول على تمارين حسب المعدات
    getExercisesByEquipment: function(equipment) {
        return this.allExercises.filter(exercise => equipment.includes(exercise.equipment));
    },

    // البحث عن تمارين
    searchExercises: function(searchTerm, muscle = 'all', equipment = []) {
        return this.allExercises.filter(exercise => {
            const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 (exercise.description && exercise.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesMuscle = muscle === 'all' || exercise.muscle === muscle;
            const matchesEquipment = equipment.length === 0 || equipment.includes(exercise.equipment);

            return matchesSearch && matchesMuscle && matchesEquipment;
        });
    }
};

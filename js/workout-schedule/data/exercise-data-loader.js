/**
 * ملف تجميع بيانات التمارين
 * يقوم بتجميع جميع بيانات التمارين من الملفات المختلفة
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};
window.workoutScheduleApp.exerciseData = window.workoutScheduleApp.exerciseData || {};

// كائن تحميل بيانات التمارين
window.workoutScheduleApp.exerciseDataLoader = {
    // تهيئة البيانات
    init: function() {
        console.log('تهيئة بيانات التمارين...');
        
        // تجميع جميع التمارين في مصفوفة واحدة
        this.allExercises = [
            ...(window.workoutScheduleApp.exerciseData.chestExercises || []),
            ...(window.workoutScheduleApp.exerciseData.backExercises || []),
            ...(window.workoutScheduleApp.exerciseData.shouldersExercises || []),
            ...(window.workoutScheduleApp.exerciseData.bicepsExercises || []),
            ...(window.workoutScheduleApp.exerciseData.tricepsExercises || []),
            ...(window.workoutScheduleApp.exerciseData.legsExercises || []),
            ...(window.workoutScheduleApp.exerciseData.absExercises || []),
            ...(window.workoutScheduleApp.exerciseData.cardioExercises || [])
        ];
        
        console.log(`تم تحميل ${this.allExercises.length} تمرين بنجاح`);
        
        // تحديث كائن dataLoader في التطبيق
        window.workoutScheduleApp.dataLoader = window.workoutScheduleApp.dataLoader || {};
        window.workoutScheduleApp.dataLoader.allExercises = this.allExercises;
        window.workoutScheduleApp.dataLoader.isLoaded = true;
        window.workoutScheduleApp.dataLoader.isLoading = false;
        
        // تعريف وظائف البحث والتصفية
        window.workoutScheduleApp.dataLoader.getExerciseById = this.getExerciseById;
        window.workoutScheduleApp.dataLoader.getExercisesByMuscle = this.getExercisesByMuscle;
        window.workoutScheduleApp.dataLoader.getExercisesByEquipment = this.getExercisesByEquipment;
        window.workoutScheduleApp.dataLoader.searchExercises = this.searchExercises;
        
        return true;
    },
    
    // الحصول على تمرين بواسطة المعرف
    getExerciseById: function(exerciseId) {
        return window.workoutScheduleApp.dataLoader.allExercises.find(exercise => exercise.id === exerciseId);
    },
    
    // الحصول على تمارين حسب العضلة
    getExercisesByMuscle: function(muscle) {
        return window.workoutScheduleApp.dataLoader.allExercises.filter(exercise => exercise.muscle === muscle);
    },
    
    // الحصول على تمارين حسب المعدات
    getExercisesByEquipment: function(equipment) {
        return window.workoutScheduleApp.dataLoader.allExercises.filter(exercise => equipment.includes(exercise.equipment));
    },
    
    // البحث عن تمارين
    searchExercises: function(searchTerm, muscle = 'all', equipment = []) {
        return window.workoutScheduleApp.dataLoader.allExercises.filter(exercise => {
            const matchesSearch = searchTerm === '' || 
                                 exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 (exercise.description && exercise.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesMuscle = muscle === 'all' || exercise.muscle === muscle;
            const matchesEquipment = equipment.length === 0 || equipment.includes(exercise.equipment);
            
            return matchesSearch && matchesMuscle && matchesEquipment;
        });
    }
};

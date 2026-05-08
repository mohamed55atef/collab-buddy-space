/**
 * ملف تصفية التمارين لصفحة جدول التمارين
 * يحتوي على وظائف تصفية وفرز التمارين
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن تصفية التمارين
window.workoutScheduleApp.exerciseFilter = {
    // الحصول على تمارين لمجموعة عضلية معينة
    getExercisesForMuscles: function(muscles, count, equipment, level) {
        console.log('البحث عن تمارين للعضلات:', muscles);
        console.log('عدد التمارين المطلوب:', count);
        console.log('المعدات المتاحة:', equipment);
        console.log('المستوى:', level);
        
        const allExercises = window.workoutScheduleApp.dataLoader.allExercises;
        console.log('إجمالي التمارين المتاحة:', allExercises.length);
        
        // التحقق من وجود تمارين
        if (!allExercises || allExercises.length === 0) {
            console.error('لا توجد تمارين متاحة');
            return [];
        }
        
        // تصفية التمارين حسب العضلة والمعدات والمستوى
        const filteredExercises = allExercises.filter(exercise => {
            const matchesMuscle = muscles.includes(exercise.muscle);
            const matchesEquipment = equipment.includes(exercise.equipment);
            const matchesLevel = (level === 'advanced' || exercise.difficulty !== 'advanced') &&
                                (level !== 'beginner' || exercise.difficulty !== 'advanced');
            
            return matchesMuscle && matchesEquipment && matchesLevel;
        });
        
        console.log(`تم العثور على ${filteredExercises.length} تمرين مطابق للمعايير`);
        
        // إذا لم يتم العثور على تمارين مطابقة، حاول البحث عن تمارين بمعايير أقل تقييداً
        if (filteredExercises.length === 0) {
            console.log('لم يتم العثور على تمارين مطابقة، جاري البحث بمعايير أقل تقييداً');
            
            // البحث عن تمارين بالعضلة فقط
            const muscleOnlyExercises = allExercises.filter(exercise => 
                muscles.includes(exercise.muscle)
            );
            
            if (muscleOnlyExercises.length > 0) {
                console.log(`تم العثور على ${muscleOnlyExercises.length} تمرين للعضلات المطلوبة فقط`);
                
                // خلط التمارين بشكل عشوائي
                const shuffledExercises = this.shuffleArray([...muscleOnlyExercises]);
                
                return shuffledExercises.slice(0, Math.min(count, shuffledExercises.length));
            }
            
            // إذا لم يتم العثور على تمارين للعضلة، استخدم أي تمارين متاحة
            console.log('لم يتم العثور على تمارين للعضلات المطلوبة، استخدام أي تمارين متاحة');
            const anyExercises = this.shuffleArray([...allExercises]);
            return anyExercises.slice(0, Math.min(count, anyExercises.length));
        }
        
        // خلط التمارين بشكل عشوائي
        const shuffledExercises = this.shuffleArray([...filteredExercises]);
        
        // إذا لم يكن هناك ما يكفي من التمارين، استخدم ما هو متاح
        const selectedExercises = shuffledExercises.slice(0, Math.min(count, shuffledExercises.length));
        console.log('التمارين المختارة:', selectedExercises);
        
        return selectedExercises;
    },
    
    // خلط مصفوفة بشكل عشوائي
    shuffleArray: function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    
    // تصفية التمارين حسب معايير البحث
    filterExercises: function(searchTerm, muscle, equipment) {
        const allExercises = window.workoutScheduleApp.dataLoader.allExercises;
        
        // تصفية التمارين
        return allExercises.filter(exercise => {
            const matchesSearch = searchTerm === '' || 
                                 exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 (exercise.description && exercise.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesMuscle = muscle === 'all' || exercise.muscle === muscle;
            const matchesEquipment = equipment.length === 0 || equipment.includes(exercise.equipment);
            
            return matchesSearch && matchesMuscle && matchesEquipment;
        });
    }
};

/**
 * ملف إنشاء جدول التمارين لصفحة جدول التمارين
 * يحتوي على وظائف إنشاء وتخصيص جدول التمارين
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن إنشاء جدول التمارين
window.workoutScheduleApp.scheduleCreator = {
    // متغيرات عامة
    currentSchedule: {}, // جدول التمارين الحالي
    
    // إنشاء جدول تمارين جديد
    createWorkoutSchedule: function(goal, level, days, duration, equipment) {
        console.log('بدء إنشاء جدول التمارين:');
        console.log('الهدف:', goal);
        console.log('المستوى:', level);
        console.log('عدد الأيام:', days);
        console.log('المدة:', duration);
        console.log('المعدات:', equipment);
        
        // إنشاء جدول التمارين
        this.currentSchedule = {
            goal: goal,
            level: level,
            days: days,
            duration: duration,
            equipment: equipment,
            schedule: {}
        };
        
        // تحديد أيام التمرين حسب الهدف
        switch (goal) {
            case 'strength':
                this.createStrengthSchedule(days, level, equipment);
                break;
            case 'weight-loss':
                this.createWeightLossSchedule(days, level, equipment);
                break;
            case 'endurance':
                this.createEnduranceSchedule(days, level, equipment);
                break;
            case 'flexibility':
                this.createFlexibilitySchedule(days, level, equipment);
                break;
        }
        
        // حفظ جدول التمارين في التخزين المحلي
        window.workoutScheduleApp.storageManager.saveSchedule(this.currentSchedule);
        
        return this.currentSchedule;
    },
    
    // إنشاء جدول تمرين لهدف بناء العضلات
    createStrengthSchedule: function(days, level, equipment) {
        // تحديد عدد التمارين لكل يوم حسب المستوى
        let exercisesPerDay;
        switch (level) {
            case 'beginner':
                exercisesPerDay = 4;
                break;
            case 'intermediate':
                exercisesPerDay = 5;
                break;
            case 'advanced':
                exercisesPerDay = 6;
                break;
        }
        
        // تحديد تقسيم الأيام حسب عدد أيام التمرين
        let split;
        switch (days) {
            case 3:
                split = ['الصدر والكتف', 'الظهر والذراعين', 'الأرجل والبطن'];
                break;
            case 4:
                split = ['الصدر', 'الظهر', 'الأكتاف والذراعين', 'الأرجل والبطن'];
                break;
            case 5:
                split = ['الصدر', 'الظهر', 'الأكتاف', 'الذراعين', 'الأرجل والبطن'];
                break;
            case 6:
                split = ['الصدر', 'الظهر', 'الأكتاف', 'الذراعين', 'الأرجل', 'البطن'];
                break;
            default:
                split = ['الصدر', 'الظهر', 'الأكتاف', 'الذراعين', 'الأرجل', 'البطن'];
        }
        
        // إنشاء جدول التمارين لكل يوم
        for (let i = 0; i < days; i++) {
            const dayName = `اليوم ${i + 1}`;
            const focusArea = split[i];
            let exercises = [];
            
            // اختيار التمارين حسب منطقة التركيز
            if (focusArea === 'الصدر والكتف') {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['chest'], Math.ceil(exercisesPerDay * 0.6), equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['shoulders'], Math.floor(exercisesPerDay * 0.4), equipment, level)
                ];
            } else if (focusArea === 'الظهر والذراعين') {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['back'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['biceps', 'triceps'], Math.floor(exercisesPerDay * 0.5), equipment, level)
                ];
            } else if (focusArea === 'الأرجل والبطن') {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['legs'], Math.ceil(exercisesPerDay * 0.7), equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['abs'], Math.floor(exercisesPerDay * 0.3), equipment, level)
                ];
            } else if (focusArea === 'الأكتاف والذراعين') {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['shoulders'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['biceps', 'triceps'], Math.floor(exercisesPerDay * 0.5), equipment, level)
                ];
            } else {
                // تحديد العضلات المستهدفة
                let muscleGroups = [];
                
                if (focusArea === 'الصدر') {
                    muscleGroups.push('chest');
                } else if (focusArea === 'الظهر') {
                    muscleGroups.push('back');
                } else if (focusArea === 'الأكتاف') {
                    muscleGroups.push('shoulders');
                } else if (focusArea === 'الذراعين') {
                    muscleGroups.push('biceps', 'triceps');
                } else if (focusArea === 'الأرجل') {
                    muscleGroups.push('legs');
                } else if (focusArea === 'البطن') {
                    muscleGroups.push('abs');
                }
                
                exercises = window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(muscleGroups, exercisesPerDay, equipment, level);
            }
            
            // إضافة اليوم إلى الجدول
            this.currentSchedule.schedule[dayName] = {
                focusArea: focusArea,
                exercises: exercises.map(exercise => ({
                    id: exercise.id,
                    name: exercise.name,
                    muscle: exercise.muscle,
                    equipment: exercise.equipment,
                    sets: this.getSetsForLevel(level),
                    reps: this.getRepsForGoalAndMuscle('strength', exercise.muscle)
                }))
            };
        }
    },
    
    // إنشاء جدول تمرين لهدف فقدان الوزن
    createWeightLossSchedule: function(days, level, equipment) {
        // تحديد عدد التمارين لكل يوم حسب المستوى
        let exercisesPerDay;
        switch (level) {
            case 'beginner':
                exercisesPerDay = 5;
                break;
            case 'intermediate':
                exercisesPerDay = 6;
                break;
            case 'advanced':
                exercisesPerDay = 7;
                break;
        }
        
        // تحديد تقسيم الأيام حسب عدد أيام التمرين
        let split;
        switch (days) {
            case 3:
                split = ['الجزء العلوي + قلب', 'الجزء السفلي + قلب', 'الجسم كامل + قلب'];
                break;
            case 4:
                split = ['الصدر والكتف + قلب', 'الظهر والذراعين + قلب', 'الأرجل + قلب', 'البطن + قلب'];
                break;
            case 5:
                split = ['الصدر + قلب', 'الظهر + قلب', 'الأكتاف والذراعين + قلب', 'الأرجل + قلب', 'البطن + قلب'];
                break;
            case 6:
                split = ['الصدر + قلب', 'الظهر + قلب', 'الأكتاف + قلب', 'الذراعين + قلب', 'الأرجل + قلب', 'البطن + قلب'];
                break;
        }
        
        // إنشاء جدول التمارين لكل يوم
        for (let i = 0; i < days; i++) {
            const dayName = `اليوم ${i + 1}`;
            const focusArea = split[i];
            let exercises = [];
            
            // اختيار التمارين حسب منطقة التركيز
            if (focusArea.includes('الجزء العلوي')) {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['cardio'], 2, equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], exercisesPerDay - 2, equipment, level)
                ];
            } else if (focusArea.includes('الجزء السفلي')) {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['cardio'], 2, equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['legs', 'abs'], exercisesPerDay - 2, equipment, level)
                ];
            } else if (focusArea.includes('الجسم كامل')) {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['cardio'], 2, equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], exercisesPerDay - 2, equipment, level)
                ];
            } else {
                // استخراج اسم العضلة من النص
                const musclePartMatch = focusArea.match(/^(.+) \+ قلب$/);
                const musclePart = musclePartMatch ? musclePartMatch[1] : '';
                let muscleGroups = [];
                
                if (musclePart.includes('الصدر')) {
                    muscleGroups.push('chest');
                }
                if (musclePart.includes('الظهر')) {
                    muscleGroups.push('back');
                }
                if (musclePart.includes('الأكتاف')) {
                    muscleGroups.push('shoulders');
                }
                if (musclePart.includes('الذراعين')) {
                    muscleGroups.push('biceps', 'triceps');
                }
                if (musclePart.includes('الأرجل')) {
                    muscleGroups.push('legs');
                }
                if (musclePart.includes('البطن')) {
                    muscleGroups.push('abs');
                }
                
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['cardio'], 2, equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(muscleGroups, exercisesPerDay - 2, equipment, level)
                ];
            }
            
            // إضافة اليوم إلى الجدول
            this.currentSchedule.schedule[dayName] = {
                focusArea: focusArea,
                exercises: exercises.map(exercise => ({
                    id: exercise.id,
                    name: exercise.name,
                    muscle: exercise.muscle,
                    equipment: exercise.equipment,
                    sets: this.getSetsForLevel(level),
                    reps: this.getRepsForGoalAndMuscle('weight-loss', exercise.muscle)
                }))
            };
        }
    },
    
    // إنشاء جدول تمرين لهدف تحسين اللياقة
    createEnduranceSchedule: function(days, level, equipment) {
        // تحديد عدد التمارين لكل يوم حسب المستوى
        let exercisesPerDay;
        switch (level) {
            case 'beginner':
                exercisesPerDay = 5;
                break;
            case 'intermediate':
                exercisesPerDay = 6;
                break;
            case 'advanced':
                exercisesPerDay = 7;
                break;
        }
        
        // تحديد تقسيم الأيام حسب عدد أيام التمرين
        let split;
        switch (days) {
            case 3:
                split = ['الجزء العلوي + قلب', 'الجزء السفلي + قلب', 'الجسم كامل + قلب'];
                break;
            case 4:
                split = ['الصدر والكتف + قلب', 'الظهر والذراعين + قلب', 'الأرجل + قلب', 'البطن + قلب'];
                break;
            case 5:
                split = ['الصدر + قلب', 'الظهر + قلب', 'الأكتاف والذراعين + قلب', 'الأرجل + قلب', 'البطن + قلب'];
                break;
            case 6:
                split = ['الصدر + قلب', 'الظهر + قلب', 'الأكتاف + قلب', 'الذراعين + قلب', 'الأرجل + قلب', 'البطن + قلب'];
                break;
        }
        
        // إنشاء جدول التمارين لكل يوم
        for (let i = 0; i < days; i++) {
            const dayName = `اليوم ${i + 1}`;
            const focusArea = split[i];
            let exercises = [];
            
            // اختيار التمارين حسب منطقة التركيز
            if (focusArea.includes('الجزء العلوي')) {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['cardio'], 3, equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], exercisesPerDay - 3, equipment, level)
                ];
            } else if (focusArea.includes('الجزء السفلي')) {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['cardio'], 3, equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['legs', 'abs'], exercisesPerDay - 3, equipment, level)
                ];
            } else if (focusArea.includes('الجسم كامل')) {
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['cardio'], 3, equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], exercisesPerDay - 3, equipment, level)
                ];
            } else {
                // استخراج اسم العضلة من النص
                const musclePartMatch = focusArea.match(/^(.+) \+ قلب$/);
                const musclePart = musclePartMatch ? musclePartMatch[1] : '';
                let muscleGroups = [];
                
                if (musclePart.includes('الصدر')) {
                    muscleGroups.push('chest');
                }
                if (musclePart.includes('الظهر')) {
                    muscleGroups.push('back');
                }
                if (musclePart.includes('الأكتاف')) {
                    muscleGroups.push('shoulders');
                }
                if (musclePart.includes('الذراعين')) {
                    muscleGroups.push('biceps', 'triceps');
                }
                if (musclePart.includes('الأرجل')) {
                    muscleGroups.push('legs');
                }
                if (musclePart.includes('البطن')) {
                    muscleGroups.push('abs');
                }
                
                exercises = [
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['cardio'], 3, equipment, level),
                    ...window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(muscleGroups, exercisesPerDay - 3, equipment, level)
                ];
            }
            
            // إضافة اليوم إلى الجدول
            this.currentSchedule.schedule[dayName] = {
                focusArea: focusArea,
                exercises: exercises.map(exercise => ({
                    id: exercise.id,
                    name: exercise.name,
                    muscle: exercise.muscle,
                    equipment: exercise.equipment,
                    sets: this.getSetsForLevel(level),
                    reps: this.getRepsForGoalAndMuscle('endurance', exercise.muscle)
                }))
            };
        }
    },
    
    // إنشاء جدول تمرين لهدف زيادة المرونة
    createFlexibilitySchedule: function(days, level, equipment) {
        // تحديد عدد التمارين لكل يوم حسب المستوى
        let exercisesPerDay;
        switch (level) {
            case 'beginner':
                exercisesPerDay = 5;
                break;
            case 'intermediate':
                exercisesPerDay = 6;
                break;
            case 'advanced':
                exercisesPerDay = 7;
                break;
        }
        
        // تحديد تقسيم الأيام حسب عدد أيام التمرين
        let split;
        switch (days) {
            case 3:
                split = ['الجزء العلوي', 'الجزء السفلي', 'الجسم كامل'];
                break;
            case 4:
                split = ['الصدر والكتف', 'الظهر والذراعين', 'الأرجل', 'البطن'];
                break;
            case 5:
                split = ['الصدر', 'الظهر', 'الأكتاف والذراعين', 'الأرجل', 'البطن'];
                break;
            case 6:
                split = ['الصدر', 'الظهر', 'الأكتاف', 'الذراعين', 'الأرجل', 'البطن'];
                break;
        }
        
        // إنشاء جدول التمارين لكل يوم
        for (let i = 0; i < days; i++) {
            const dayName = `اليوم ${i + 1}`;
            const focusArea = split[i];
            let exercises = [];
            
            // اختيار التمارين حسب منطقة التركيز
            if (focusArea === 'الجزء العلوي') {
                exercises = window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], exercisesPerDay, equipment, level);
            } else if (focusArea === 'الجزء السفلي') {
                exercises = window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['legs', 'abs'], exercisesPerDay, equipment, level);
            } else if (focusArea === 'الجسم كامل') {
                exercises = window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], exercisesPerDay, equipment, level);
            } else {
                // تحديد العضلات المستهدفة
                let muscleGroups = [];
                
                if (focusArea.includes('الصدر')) {
                    muscleGroups.push('chest');
                }
                if (focusArea.includes('الظهر')) {
                    muscleGroups.push('back');
                }
                if (focusArea.includes('الأكتاف')) {
                    muscleGroups.push('shoulders');
                }
                if (focusArea.includes('الذراعين')) {
                    muscleGroups.push('biceps', 'triceps');
                }
                if (focusArea.includes('الأرجل')) {
                    muscleGroups.push('legs');
                }
                if (focusArea.includes('البطن')) {
                    muscleGroups.push('abs');
                }
                
                exercises = window.workoutScheduleApp.exerciseFilter.getExercisesForMuscles(muscleGroups, exercisesPerDay, equipment, level);
            }
            
            // إضافة اليوم إلى الجدول
            this.currentSchedule.schedule[dayName] = {
                focusArea: focusArea,
                exercises: exercises.map(exercise => ({
                    id: exercise.id,
                    name: exercise.name,
                    muscle: exercise.muscle,
                    equipment: exercise.equipment,
                    sets: this.getSetsForLevel(level),
                    reps: this.getRepsForGoalAndMuscle('flexibility', exercise.muscle)
                }))
            };
        }
    },
    
    // الحصول على عدد المجموعات حسب المستوى
    getSetsForLevel: function(level) {
        switch (level) {
            case 'beginner':
                return 3;
            case 'intermediate':
                return 4;
            case 'advanced':
                return 5;
            default:
                return 3;
        }
    },
    
    // الحصول على عدد التكرارات حسب الهدف ونوع العضلة
    getRepsForGoalAndMuscle: function(goal, muscle) {
        if (muscle === 'cardio') {
            return '20-30 دقيقة';
        }
        
        switch (goal) {
            case 'strength':
                return '8-12';
            case 'weight-loss':
                return '12-15';
            case 'endurance':
                return '15-20';
            case 'flexibility':
                return '12-15';
            default:
                return '10-12';
        }
    },
    
    // إضافة تمرين إلى الجدول
    addExerciseToSchedule: function(exerciseId, dayName) {
        // البحث عن التمرين
        const exercise = window.workoutScheduleApp.dataLoader.getExerciseById(exerciseId);
        
        if (!exercise) {
            console.error('لم يتم العثور على التمرين:', exerciseId);
            return false;
        }
        
        // التحقق من وجود اليوم في الجدول
        if (!this.currentSchedule.schedule || !this.currentSchedule.schedule[dayName]) {
            console.error('لم يتم العثور على اليوم في جدول التمارين:', dayName);
            return false;
        }
        
        // إضافة التمرين إلى اليوم
        const newExercise = {
            id: exercise.id,
            name: exercise.name,
            muscle: exercise.muscle,
            equipment: exercise.equipment,
            sets: this.getSetsForLevel(this.currentSchedule.level),
            reps: this.getRepsForGoalAndMuscle(this.currentSchedule.goal, exercise.muscle)
        };
        
        this.currentSchedule.schedule[dayName].exercises.push(newExercise);
        
        // حفظ التغييرات في التخزين المحلي
        window.workoutScheduleApp.storageManager.saveSchedule(this.currentSchedule);
        
        return true;
    },
    
    // حذف تمرين من الجدول
    removeExerciseFromSchedule: function(exerciseId, dayName) {
        // التحقق من وجود اليوم في الجدول
        if (!this.currentSchedule.schedule || !this.currentSchedule.schedule[dayName]) {
            console.error('لم يتم العثور على اليوم في جدول التمارين:', dayName);
            return false;
        }
        
        // التحقق من وجود التمارين في اليوم
        if (!this.currentSchedule.schedule[dayName].exercises || !Array.isArray(this.currentSchedule.schedule[dayName].exercises)) {
            console.error('لم يتم العثور على تمارين في اليوم:', dayName);
            return false;
        }
        
        // البحث عن التمرين في قائمة التمارين
        const exerciseIndex = this.currentSchedule.schedule[dayName].exercises.findIndex(ex => ex.id === exerciseId);
        if (exerciseIndex === -1) {
            console.error('لم يتم العثور على التمرين في اليوم:', dayName);
            return false;
        }
        
        // حذف التمرين من القائمة
        this.currentSchedule.schedule[dayName].exercises.splice(exerciseIndex, 1);
        
        // حفظ التغييرات في التخزين المحلي
        window.workoutScheduleApp.storageManager.saveSchedule(this.currentSchedule);
        
        return true;
    }
};

/**
 * ملف الأدوات المساعدة لصفحة جدول التمارين
 * يحتوي على وظائف مساعدة مثل الترجمة والتحويل
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة للأدوات المساعدة
    window.workoutApp = window.workoutApp || {};
    window.workoutApp.utils = {
        // الحصول على اسم الهدف بالعربية
        getGoalName: function(goal) {
            switch (goal) {
                case 'strength':
                    return 'بناء العضلات';
                case 'weight-loss':
                    return 'فقدان الوزن';
                case 'endurance':
                    return 'تحسين اللياقة';
                case 'flexibility':
                    return 'زيادة المرونة';
                default:
                    return goal;
            }
        },
        
        // الحصول على اسم المستوى بالعربية
        getLevelName: function(level) {
            switch (level) {
                case 'beginner':
                    return 'مبتدئ';
                case 'intermediate':
                    return 'متوسط';
                case 'advanced':
                    return 'متقدم';
                default:
                    return level;
            }
        },
        
        // الحصول على اسم العضلة بالعربية
        getMuscleNameArabic: function(muscle) {
            switch (muscle) {
                case 'chest':
                    return 'الصدر';
                case 'back':
                    return 'الظهر';
                case 'shoulders':
                    return 'الأكتاف';
                case 'biceps':
                    return 'البايسبس';
                case 'triceps':
                    return 'الترايسبس';
                case 'legs':
                    return 'الأرجل';
                case 'abs':
                    return 'البطن';
                case 'cardio':
                    return 'القلب';
                default:
                    return muscle;
            }
        },
        
        // الحصول على اسم المعدات بالعربية
        getEquipmentNameArabic: function(equipment) {
            switch (equipment) {
                case 'barbell':
                    return 'بار حديد';
                case 'dumbbell':
                    return 'دمبل';
                case 'machine':
                    return 'ماكينة';
                case 'cable':
                    return 'كيبل';
                case 'bodyweight':
                    return 'وزن الجسم';
                case 'kettlebell':
                    return 'كيتل بل';
                case 'resistance-band':
                    return 'مطاط مقاومة';
                default:
                    return equipment;
            }
        },
        
        // الحصول على اسم مستوى الصعوبة بالعربية
        getDifficultyNameArabic: function(difficulty) {
            switch (difficulty) {
                case 'beginner':
                    return 'مبتدئ';
                case 'intermediate':
                    return 'متوسط';
                case 'advanced':
                    return 'متقدم';
                default:
                    return difficulty;
            }
        },
        
        // إنشاء خطة تمرين لهدف تحسين اللياقة
        createEndurancePlan: function(days, level, equipment) {
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
                        ...window.workoutApp.data.getExercisesForMuscles(['cardio'], 3, equipment, level),
                        ...window.workoutApp.data.getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], exercisesPerDay - 3, equipment, level)
                    ];
                } else if (focusArea.includes('الجزء السفلي')) {
                    exercises = [
                        ...window.workoutApp.data.getExercisesForMuscles(['cardio'], 3, equipment, level),
                        ...window.workoutApp.data.getExercisesForMuscles(['legs', 'abs'], exercisesPerDay - 3, equipment, level)
                    ];
                } else if (focusArea.includes('الجسم كامل')) {
                    exercises = [
                        ...window.workoutApp.data.getExercisesForMuscles(['cardio'], 3, equipment, level),
                        ...window.workoutApp.data.getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], exercisesPerDay - 3, equipment, level)
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
                        ...window.workoutApp.data.getExercisesForMuscles(['cardio'], 3, equipment, level),
                        ...window.workoutApp.data.getExercisesForMuscles(muscleGroups, exercisesPerDay - 3, equipment, level)
                    ];
                }
                
                // إضافة اليوم إلى الجدول
                window.workoutApp.data.workoutPlan.schedule[dayName] = {
                    focusArea: focusArea,
                    exercises: exercises.map(exercise => ({
                        id: exercise.id,
                        name: exercise.name,
                        muscle: exercise.muscle,
                        equipment: exercise.equipment,
                        sets: window.workoutApp.data.getSetsForLevel(level),
                        reps: window.workoutApp.data.getRepsForGoalAndMuscle('endurance', exercise.muscle)
                    }))
                };
            }
        },
        
        // إنشاء خطة تمرين لهدف زيادة المرونة
        createFlexibilityPlan: function(days, level, equipment) {
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
                    exercises = window.workoutApp.data.getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], exercisesPerDay, equipment, level);
                } else if (focusArea === 'الجزء السفلي') {
                    exercises = window.workoutApp.data.getExercisesForMuscles(['legs', 'abs'], exercisesPerDay, equipment, level);
                } else if (focusArea === 'الجسم كامل') {
                    exercises = window.workoutApp.data.getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], exercisesPerDay, equipment, level);
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
                    
                    exercises = window.workoutApp.data.getExercisesForMuscles(muscleGroups, exercisesPerDay, equipment, level);
                }
                
                // إضافة اليوم إلى الجدول
                window.workoutApp.data.workoutPlan.schedule[dayName] = {
                    focusArea: focusArea,
                    exercises: exercises.map(exercise => ({
                        id: exercise.id,
                        name: exercise.name,
                        muscle: exercise.muscle,
                        equipment: exercise.equipment,
                        sets: window.workoutApp.data.getSetsForLevel(level),
                        reps: window.workoutApp.data.getRepsForGoalAndMuscle('flexibility', exercise.muscle)
                    }))
                };
            }
        }
    };
});

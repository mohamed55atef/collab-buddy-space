/**
 * ملف البيانات لصفحة جدول التمارين
 * يحتوي على وظائف تحميل وإدارة البيانات
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة للبيانات
    window.workoutApp = window.workoutApp || {};
    window.workoutApp.data = {
        allExercises: [], // جميع التمارين
        workoutPlan: {}, // خطة التمرين الحالية
        selectedGoal: 'strength', // الهدف المختار افتراضياً
        currentDayEditing: null, // اليوم الحالي الذي يتم تعديله

        // تحميل بيانات التمارين
        loadExerciseData: async function() {
            try {
                // إظهار شاشة التحميل
                window.workoutApp.ui.showLoading();

                // قائمة بملفات التمارين التي سيتم تحميلها
                const exerciseFiles = [
                    { file: '../data/chest-exercises.json', muscle: 'chest' },
                    { file: '../data/back-exercises.json', muscle: 'back' },
                    { file: '../data/shoulders-exercises.json', muscle: 'shoulders' },
                    { file: '../data/biceps-exercises.json', muscle: 'biceps' },
                    { file: '../data/triceps-exercises-1.json', muscle: 'triceps' },
                    { file: '../data/triceps-exercises-2.json', muscle: 'triceps' },
                    { file: '../data/legs-exercises.json', muscle: 'legs' },
                    { file: '../data/abs-exercises.json', muscle: 'abs' },
                    { file: '../data/cardio-exercises.json', muscle: 'cardio' }
                ];

                // تحميل جميع ملفات التمارين
                this.allExercises = [];

                // استخدام Promise.all لتحميل جميع الملفات بالتوازي
                const loadPromises = exerciseFiles.map(async (exerciseFile) => {
                    try {
                        console.log(`جاري تحميل ملف: ${exerciseFile.file}`);
                        const response = await fetch(exerciseFile.file);

                        if (!response.ok) {
                            console.error(`فشل في تحميل ملف ${exerciseFile.file}: ${response.status} ${response.statusText}`);
                            return [];
                        }

                        const data = await response.json();

                        if (data && data.exercises && Array.isArray(data.exercises)) {
                            console.log(`تم تحميل ${data.exercises.length} تمرين من ملف ${exerciseFile.file}`);
                            return data.exercises;
                        } else {
                            console.error(`تنسيق ملف ${exerciseFile.file} غير صحيح`);
                            return [];
                        }
                    } catch (fileError) {
                        console.error(`خطأ في تحميل ملف ${exerciseFile.file}:`, fileError);
                        return [];
                    }
                });

                // انتظار تحميل جميع الملفات
                const exercisesArrays = await Promise.all(loadPromises);

                // دمج جميع مصفوفات التمارين
                this.allExercises = exercisesArrays.flat();

                // التحقق من وجود تمارين
                if (this.allExercises.length === 0) {
                    throw new Error('لم يتم تحميل أي تمارين');
                }

                console.log(`تم تحميل إجمالي ${this.allExercises.length} تمرين`);

                // طباعة بعض التمارين للتحقق
                console.log('عينة من التمارين المحملة:', this.allExercises.slice(0, 3));

                // تحقق من وجود خطة تمرين محفوظة
                const savedPlan = localStorage.getItem('workoutPlan');
                if (savedPlan) {
                    this.workoutPlan = JSON.parse(savedPlan);
                    window.workoutApp.ui.displayWorkoutPlan();
                    window.workoutApp.ui.showPlanSection();
                }

                // إخفاء شاشة التحميل
                window.workoutApp.ui.hideLoading();

                return true;
            } catch (error) {
                console.error('حدث خطأ أثناء تحميل بيانات التمارين:', error);
                window.workoutApp.ui.showMessage('حدث خطأ أثناء تحميل بيانات التمارين. يرجى تحديث الصفحة والمحاولة مرة أخرى.', 'error');
                window.workoutApp.ui.hideLoading();
                return false;
            }
        },

        // إنشاء خطة تمرين جديدة
        createWorkoutPlan: function(goal, level, days, duration, equipment) {
            // إنشاء خطة التمرين
            this.workoutPlan = {
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
                    this.createStrengthPlan(days, level, equipment);
                    break;
                case 'weight-loss':
                    this.createWeightLossPlan(days, level, equipment);
                    break;
                case 'endurance':
                    window.workoutApp.utils.createEndurancePlan(days, level, equipment);
                    break;
                case 'flexibility':
                    window.workoutApp.utils.createFlexibilityPlan(days, level, equipment);
                    break;
            }

            // حفظ خطة التمرين في التخزين المحلي
            localStorage.setItem('workoutPlan', JSON.stringify(this.workoutPlan));

            return this.workoutPlan;
        },

        // إنشاء خطة تمرين لهدف بناء العضلات
        createStrengthPlan: function(days, level, equipment) {
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
                        ...this.getExercisesForMuscles(['chest'], Math.ceil(exercisesPerDay * 0.6), equipment, level),
                        ...this.getExercisesForMuscles(['shoulders'], Math.floor(exercisesPerDay * 0.4), equipment, level)
                    ];
                } else if (focusArea === 'الظهر والذراعين') {
                    exercises = [
                        ...this.getExercisesForMuscles(['back'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                        ...this.getExercisesForMuscles(['biceps', 'triceps'], Math.floor(exercisesPerDay * 0.5), equipment, level)
                    ];
                } else if (focusArea === 'الأرجل والبطن') {
                    exercises = [
                        ...this.getExercisesForMuscles(['legs'], Math.ceil(exercisesPerDay * 0.7), equipment, level),
                        ...this.getExercisesForMuscles(['abs'], Math.floor(exercisesPerDay * 0.3), equipment, level)
                    ];
                } else if (focusArea === 'الأكتاف والذراعين') {
                    exercises = [
                        ...this.getExercisesForMuscles(['shoulders'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                        ...this.getExercisesForMuscles(['biceps', 'triceps'], Math.floor(exercisesPerDay * 0.5), equipment, level)
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

                    exercises = this.getExercisesForMuscles(muscleGroups, exercisesPerDay, equipment, level);
                }

                // إضافة اليوم إلى الجدول
                this.workoutPlan.schedule[dayName] = {
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

        // إنشاء خطة تمرين لهدف فقدان الوزن
        createWeightLossPlan: function(days, level, equipment) {
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
                        ...this.getExercisesForMuscles(['cardio'], 2, equipment, level),
                        ...this.getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], exercisesPerDay - 2, equipment, level)
                    ];
                } else if (focusArea.includes('الجزء السفلي')) {
                    exercises = [
                        ...this.getExercisesForMuscles(['cardio'], 2, equipment, level),
                        ...this.getExercisesForMuscles(['legs', 'abs'], exercisesPerDay - 2, equipment, level)
                    ];
                } else if (focusArea.includes('الجسم كامل')) {
                    exercises = [
                        ...this.getExercisesForMuscles(['cardio'], 2, equipment, level),
                        ...this.getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], exercisesPerDay - 2, equipment, level)
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
                        ...this.getExercisesForMuscles(['cardio'], 2, equipment, level),
                        ...this.getExercisesForMuscles(muscleGroups, exercisesPerDay - 2, equipment, level)
                    ];
                }

                // إضافة اليوم إلى الجدول
                this.workoutPlan.schedule[dayName] = {
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

        // الحصول على تمارين لمجموعة عضلية معينة
        getExercisesForMuscles: function(muscles, count, equipment, level) {
            console.log('البحث عن تمارين للعضلات:', muscles);
            console.log('عدد التمارين المطلوب:', count);
            console.log('المعدات المتاحة:', equipment);
            console.log('المستوى:', level);
            console.log('إجمالي التمارين المتاحة:', this.allExercises.length);

            // التحقق من وجود تمارين
            if (!this.allExercises || this.allExercises.length === 0) {
                console.error('لا توجد تمارين متاحة');
                return [];
            }

            // تصفية التمارين حسب العضلة والمعدات والمستوى
            const filteredExercises = this.allExercises.filter(exercise => {
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
                const muscleOnlyExercises = this.allExercises.filter(exercise =>
                    muscles.includes(exercise.muscle)
                );

                if (muscleOnlyExercises.length > 0) {
                    console.log(`تم العثور على ${muscleOnlyExercises.length} تمرين للعضلات المطلوبة فقط`);

                    // خلط التمارين بشكل عشوائي
                    const shuffledExercises = [...muscleOnlyExercises].sort(() => 0.5 - Math.random());

                    return shuffledExercises.slice(0, Math.min(count, shuffledExercises.length));
                }

                // إذا لم يتم العثور على تمارين للعضلة، استخدم أي تمارين متاحة
                console.log('لم يتم العثور على تمارين للعضلات المطلوبة، استخدام أي تمارين متاحة');
                const anyExercises = [...this.allExercises].sort(() => 0.5 - Math.random());
                return anyExercises.slice(0, Math.min(count, anyExercises.length));
            }

            // خلط التمارين بشكل عشوائي
            const shuffledExercises = [...filteredExercises].sort(() => 0.5 - Math.random());

            // إذا لم يكن هناك ما يكفي من التمارين، استخدم ما هو متاح
            const selectedExercises = shuffledExercises.slice(0, Math.min(count, shuffledExercises.length));
            console.log('التمارين المختارة:', selectedExercises);

            return selectedExercises;
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

        // حذف تمرين من الجدول
        deleteExercise: function(exerciseId, dayName) {
            try {
                // التحقق من وجود اليوم في الجدول
                if (!this.workoutPlan.schedule || !this.workoutPlan.schedule[dayName]) {
                    console.error('لم يتم العثور على اليوم في جدول التمارين:', dayName);
                    return false;
                }

                // التحقق من وجود التمارين في اليوم
                if (!this.workoutPlan.schedule[dayName].exercises || !Array.isArray(this.workoutPlan.schedule[dayName].exercises)) {
                    console.error('لم يتم العثور على تمارين في اليوم:', dayName);
                    return false;
                }

                // البحث عن التمرين في قائمة التمارين
                const exerciseIndex = this.workoutPlan.schedule[dayName].exercises.findIndex(ex => ex.id === exerciseId);
                if (exerciseIndex === -1) {
                    console.error('لم يتم العثور على التمرين في اليوم:', dayName);
                    return false;
                }

                // حذف التمرين من القائمة
                this.workoutPlan.schedule[dayName].exercises.splice(exerciseIndex, 1);

                // حفظ التغييرات في التخزين المحلي
                localStorage.setItem('workoutPlan', JSON.stringify(this.workoutPlan));

                return true;
            } catch (error) {
                console.error('حدث خطأ أثناء حذف التمرين:', error);
                return false;
            }
        },

        // إضافة تمرين إلى الجدول
        addExerciseToPlan: function(exerciseId, dayName) {
            try {
                // البحث عن التمرين
                const exercise = this.allExercises.find(ex => ex.id === exerciseId);

                if (!exercise) {
                    console.error('لم يتم العثور على التمرين:', exerciseId);
                    return false;
                }

                // التحقق من وجود اليوم في الجدول
                if (!this.workoutPlan.schedule || !this.workoutPlan.schedule[dayName]) {
                    console.error('لم يتم العثور على اليوم في جدول التمارين:', dayName);
                    return false;
                }

                // إضافة التمرين إلى اليوم
                const newExercise = {
                    id: exercise.id,
                    name: exercise.name,
                    muscle: exercise.muscle,
                    equipment: exercise.equipment,
                    sets: this.getSetsForLevel(this.workoutPlan.level),
                    reps: this.getRepsForGoalAndMuscle(this.workoutPlan.goal, exercise.muscle)
                };

                this.workoutPlan.schedule[dayName].exercises.push(newExercise);

                // حفظ التغييرات في التخزين المحلي
                localStorage.setItem('workoutPlan', JSON.stringify(this.workoutPlan));

                return true;
            } catch (error) {
                console.error('حدث خطأ أثناء إضافة التمرين:', error);
                return false;
            }
        }
    };
});

        // إنشاء جدول التمارين لكل يوم
        for (let i = 0; i < days; i++) {
            const dayName = `اليوم ${i + 1}`;
            const focusArea = split[i];
            let exercises = [];
            
            // اختيار التمارين حسب منطقة التركيز
            switch (focusArea) {
                case 'الجزء العلوي':
                    exercises = getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], exercisesPerDay, equipment, level);
                    break;
                case 'الجزء السفلي':
                    exercises = getExercisesForMuscles(['legs', 'abs'], exercisesPerDay, equipment, level);
                    break;
                case 'الجسم كامل':
                    exercises = getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], exercisesPerDay, equipment, level);
                    break;
                case 'الصدر والترايسبس':
                    exercises = [
                        ...getExercisesForMuscles(['chest'], Math.ceil(exercisesPerDay * 0.6), equipment, level),
                        ...getExercisesForMuscles(['triceps'], Math.floor(exercisesPerDay * 0.4), equipment, level)
                    ];
                    break;
                case 'الظهر والبايسبس':
                    exercises = [
                        ...getExercisesForMuscles(['back'], Math.ceil(exercisesPerDay * 0.6), equipment, level),
                        ...getExercisesForMuscles(['biceps'], Math.floor(exercisesPerDay * 0.4), equipment, level)
                    ];
                    break;
                case 'الأكتاف والبطن':
                    exercises = [
                        ...getExercisesForMuscles(['shoulders'], Math.ceil(exercisesPerDay * 0.6), equipment, level),
                        ...getExercisesForMuscles(['abs'], Math.floor(exercisesPerDay * 0.4), equipment, level)
                    ];
                    break;
                case 'الأرجل':
                    exercises = getExercisesForMuscles(['legs'], exercisesPerDay, equipment, level);
                    break;
                case 'الصدر':
                    exercises = getExercisesForMuscles(['chest'], exercisesPerDay, equipment, level);
                    break;
                case 'الظهر':
                    exercises = getExercisesForMuscles(['back'], exercisesPerDay, equipment, level);
                    break;
                case 'الأكتاف':
                    exercises = getExercisesForMuscles(['shoulders'], exercisesPerDay, equipment, level);
                    break;
                case 'الذراعين':
                    exercises = [
                        ...getExercisesForMuscles(['biceps'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                        ...getExercisesForMuscles(['triceps'], Math.floor(exercisesPerDay * 0.5), equipment, level)
                    ];
                    break;
                case 'الذراعين والبطن':
                    exercises = [
                        ...getExercisesForMuscles(['biceps', 'triceps'], Math.ceil(exercisesPerDay * 0.6), equipment, level),
                        ...getExercisesForMuscles(['abs'], Math.floor(exercisesPerDay * 0.4), equipment, level)
                    ];
                    break;
                case 'البطن والقلب':
                    exercises = [
                        ...getExercisesForMuscles(['abs'], Math.ceil(exercisesPerDay * 0.6), equipment, level),
                        ...getExercisesForMuscles(['cardio'], Math.floor(exercisesPerDay * 0.4), equipment, level)
                    ];
                    break;
            }
            
            // إضافة اليوم إلى الجدول
            workoutPlan.schedule[dayName] = {
                focusArea: focusArea,
                exercises: exercises.map(exercise => ({
                    id: exercise.id,
                    name: exercise.name,
                    muscle: exercise.muscle,
                    equipment: exercise.equipment,
                    sets: getSetsForLevel(level),
                    reps: getRepsForGoalAndMuscle(selectedGoal, exercise.muscle)
                }))
            };
        }
    }
    
    // إنشاء خطة تمرين لهدف فقدان الوزن
    function createWeightLossPlan(days, level, equipment) {
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

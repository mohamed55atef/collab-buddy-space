    // إنشاء خطة تمرين لهدف تحسين اللياقة
    function createEndurancePlan(days, level, equipment) {
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
                split = ['قلب + جزء علوي', 'قلب + جزء سفلي', 'قلب + جسم كامل'];
                break;
            case 4:
                split = ['قلب + صدر وكتف', 'قلب + ظهر وذراعين', 'قلب + أرجل', 'قلب + بطن'];
                break;
            case 5:
                split = ['قلب + صدر', 'قلب + ظهر', 'قلب + أكتاف وذراعين', 'قلب + أرجل', 'قلب + بطن'];
                break;
            case 6:
                split = ['قلب + صدر', 'قلب + ظهر', 'قلب + أكتاف', 'قلب + ذراعين', 'قلب + أرجل', 'قلب + بطن'];
                break;
        }

        // إنشاء جدول التمارين لكل يوم
        for (let i = 0; i < days; i++) {
            const dayName = `اليوم ${i + 1}`;
            const focusArea = split[i];
            let exercises = [];

            // اختيار التمارين حسب منطقة التركيز
            if (focusArea.includes('جزء علوي')) {
                exercises = [
                    ...getExercisesForMuscles(['cardio'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                    ...getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], Math.floor(exercisesPerDay * 0.5), equipment, level)
                ];
            } else if (focusArea.includes('جزء سفلي')) {
                exercises = [
                    ...getExercisesForMuscles(['cardio'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                    ...getExercisesForMuscles(['legs', 'abs'], Math.floor(exercisesPerDay * 0.5), equipment, level)
                ];
            } else if (focusArea.includes('جسم كامل')) {
                exercises = [
                    ...getExercisesForMuscles(['cardio'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                    ...getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], Math.floor(exercisesPerDay * 0.5), equipment, level)
                ];
            } else {
                // استخراج اسم العضلة من النص
                const musclePart = focusArea.split(' + ')[1];
                let muscleGroups = [];

                if (musclePart.includes('صدر')) {
                    muscleGroups.push('chest');
                }
                if (musclePart.includes('ظهر')) {
                    muscleGroups.push('back');
                }
                if (musclePart.includes('أكتاف')) {
                    muscleGroups.push('shoulders');
                }
                if (musclePart.includes('ذراعين')) {
                    muscleGroups.push('biceps', 'triceps');
                }
                if (musclePart.includes('أرجل')) {
                    muscleGroups.push('legs');
                }
                if (musclePart.includes('بطن')) {
                    muscleGroups.push('abs');
                }

                exercises = [
                    ...getExercisesForMuscles(['cardio'], Math.ceil(exercisesPerDay * 0.5), equipment, level),
                    ...getExercisesForMuscles(muscleGroups, Math.floor(exercisesPerDay * 0.5), equipment, level)
                ];
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

    // إنشاء خطة تمرين لهدف زيادة المرونة
    function createFlexibilityPlan(days, level, equipment) {
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
                split = ['الصدر والكتف', 'الظهر والذراعين', 'الأرجل', 'البطن والقلب'];
                break;
            case 5:
                split = ['الصدر', 'الظهر', 'الأكتاف والذراعين', 'الأرجل', 'البطن والقلب'];
                break;
            case 6:
                split = ['الصدر', 'الظهر', 'الأكتاف', 'الذراعين', 'الأرجل', 'البطن والقلب'];
                break;
        }

        // إنشاء جدول التمارين لكل يوم
        for (let i = 0; i < days; i++) {
            const dayName = `اليوم ${i + 1}`;
            const focusArea = split[i];
            let exercises = [];

            // اختيار التمارين حسب منطقة التركيز
            if (focusArea === 'الجزء العلوي') {
                exercises = getExercisesForMuscles(['chest', 'back', 'shoulders', 'biceps', 'triceps'], exercisesPerDay, equipment, level);
            } else if (focusArea === 'الجزء السفلي') {
                exercises = getExercisesForMuscles(['legs', 'abs'], exercisesPerDay, equipment, level);
            } else if (focusArea === 'الجسم كامل') {
                exercises = getExercisesForMuscles(['chest', 'back', 'shoulders', 'legs', 'abs'], exercisesPerDay, equipment, level);
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
                if (focusArea.includes('القلب')) {
                    muscleGroups.push('cardio');
                }

                exercises = getExercisesForMuscles(muscleGroups, exercisesPerDay, equipment, level);
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

    // الحصول على تمارين لمجموعة عضلية معينة
    function getExercisesForMuscles(muscles, count, equipment, level) {
        // تصفية التمارين حسب العضلة والمعدات والمستوى
        const filteredExercises = allExercises.filter(exercise => {
            return muscles.includes(exercise.muscle) &&
                   equipment.includes(exercise.equipment) &&
                   (level === 'advanced' || exercise.difficulty !== 'advanced') &&
                   (level !== 'beginner' || exercise.difficulty !== 'advanced');
        });

        // خلط التمارين بشكل عشوائي
        const shuffledExercises = [...filteredExercises].sort(() => 0.5 - Math.random());

        // إذا لم يكن هناك ما يكفي من التمارين، استخدم ما هو متاح
        return shuffledExercises.slice(0, Math.min(count, shuffledExercises.length));
    }

    // الحصول على عدد المجموعات حسب المستوى
    function getSetsForLevel(level) {
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
    }

    // الحصول على عدد التكرارات حسب الهدف ونوع العضلة
    function getRepsForGoalAndMuscle(goal, muscle) {
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
    }

    // عرض خطة التمرين
    function displayWorkoutPlan() {
        // تحديث معلومات الخطة
        planGoalValue.textContent = getGoalName(workoutPlan.goal);
        planLevelValue.textContent = getLevelName(workoutPlan.level);
        planDaysValue.textContent = `${workoutPlan.days} أيام`;

        // إنشاء HTML لأيام التمرين
        let daysHTML = '';

        for (const [dayName, dayData] of Object.entries(workoutPlan.schedule)) {
            daysHTML += `
                <div class="workout-day">
                    <div class="day-header">
                        <h3 class="day-title">${dayName} - ${dayData.focusArea}</h3>
                        <button class="btn btn-secondary edit-day-btn" data-day="${dayName}">
                            <i class="fas fa-edit"></i> تعديل
                        </button>
                    </div>
                    <div class="exercises-list">
            `;

            // إضافة التمارين
            dayData.exercises.forEach(exercise => {
                daysHTML += `
                    <div class="exercise-item" data-id="${exercise.id}">
                        <div class="exercise-info">
                            <h4 class="exercise-name">${exercise.name}</h4>
                            <div class="exercise-details">
                                <span class="exercise-muscle">${getMuscleNameArabic(exercise.muscle)}</span>
                                <span class="exercise-equipment">${getEquipmentNameArabic(exercise.equipment)}</span>
                            </div>
                        </div>
                        <div class="exercise-sets-reps">
                            <span class="sets">${exercise.sets} مجموعات</span>
                            <span class="reps">${exercise.reps} تكرار</span>
                        </div>
                        <div class="exercise-actions">
                            <button class="btn btn-icon view-exercise-btn" data-id="${exercise.id}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-icon remove-exercise-btn" data-id="${exercise.id}" onclick="deleteExercise('${exercise.id}', '${dayName}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });

            // إضافة زر إضافة تمرين
            daysHTML += `
                    </div>
                    <button class="btn btn-primary add-exercise-btn" data-day="${dayName}">
                        <i class="fas fa-plus"></i> إضافة تمرين
                    </button>
                </div>
            `;
        }

        // عرض أيام التمرين
        workoutDaysContainer.innerHTML = daysHTML;

        // إضافة مستمعي الأحداث لأزرار التعديل
        const editDayBtns = document.querySelectorAll('.edit-day-btn');
        editDayBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const day = this.getAttribute('data-day');
                // هنا يمكن إضافة وظيفة تعديل اليوم
                alert(`تعديل ${day}`);
            });
        });

        // إضافة مستمعي الأحداث لأزرار عرض التمرين
        const viewExerciseBtns = document.querySelectorAll('.view-exercise-btn');
        viewExerciseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const exerciseId = this.getAttribute('data-id');
                const exercise = allExercises.find(ex => ex.id === exerciseId);
                if (exercise) {
                    // هنا يمكن إضافة وظيفة عرض تفاصيل التمرين
                    window.open(`exercise-database.html?id=${exerciseId}`, '_blank');
                }
            });
        });

        // ملاحظة: تم نقل وظيفة حذف التمرين إلى ملف workout-delete.js
        // وتم إضافة معالج الحدث onclick مباشرة في HTML

        // إضافة مستمعي الأحداث لأزرار إضافة تمرين
        const addExerciseBtns = document.querySelectorAll('.add-exercise-btn');
        addExerciseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                currentDayEditing = this.getAttribute('data-day');
                openExerciseModal();
            });
        });
    }

    // فتح نافذة اختيار التمارين
    function openExerciseModal() {
        // تصفية التمارين حسب المعدات المتاحة
        const equipment = workoutPlan.equipment;
        const filteredExercises = allExercises.filter(exercise => equipment.includes(exercise.equipment));

        // عرض التمارين في النافذة
        displayExercisesInModal(filteredExercises);

        // عرض النافذة
        exerciseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // عرض التمارين في النافذة
    function displayExercisesInModal(exercises) {
        let exercisesHTML = '';

        exercises.forEach(exercise => {
            exercisesHTML += `
                <div class="modal-exercise-item" data-id="${exercise.id}">
                    <div class="exercise-info">
                        <h4 class="exercise-name">${exercise.name}</h4>
                        <div class="exercise-details">
                            <span class="exercise-muscle">${getMuscleNameArabic(exercise.muscle)}</span>
                            <span class="exercise-equipment">${getEquipmentNameArabic(exercise.equipment)}</span>
                            <span class="exercise-difficulty">${getDifficultyNameArabic(exercise.difficulty)}</span>
                        </div>
                    </div>
                    <button class="btn btn-primary add-to-plan-btn" data-id="${exercise.id}">
                        <i class="fas fa-plus"></i> إضافة
                    </button>
                </div>
            `;
        });

        exerciseList.innerHTML = exercisesHTML;

        // إضافة مستمعي الأحداث لأزرار إضافة التمرين
        const addToPlanBtns = document.querySelectorAll('.add-to-plan-btn');
        addToPlanBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const exerciseId = this.getAttribute('data-id');
                addExerciseToPlan(exerciseId);
            });
        });
    }

    // إضافة تمرين إلى الخطة
    function addExerciseToPlan(exerciseId) {
        // البحث عن التمرين
        const exercise = allExercises.find(ex => ex.id === exerciseId);

        if (exercise && currentDayEditing) {
            // إضافة التمرين إلى اليوم الحالي
            const newExercise = {
                id: exercise.id,
                name: exercise.name,
                muscle: exercise.muscle,
                equipment: exercise.equipment,
                sets: getSetsForLevel(workoutPlan.level),
                reps: getRepsForGoalAndMuscle(workoutPlan.goal, exercise.muscle)
            };

            workoutPlan.schedule[currentDayEditing].exercises.push(newExercise);

            // حفظ التغييرات
            localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));

            // تحديث العرض
            displayWorkoutPlan();

            // إغلاق النافذة
            closeExerciseModal();
        }
    }

    // إغلاق نافذة اختيار التمارين
    function closeExerciseModal() {
        exerciseModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentDayEditing = null;
    }

    // الحصول على اسم الهدف بالعربية
    function getGoalName(goal) {
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
    }

    // الحصول على اسم المستوى بالعربية
    function getLevelName(level) {
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
    }

    // الحصول على اسم العضلة بالعربية
    function getMuscleNameArabic(muscle) {
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
    }

    // الحصول على اسم المعدات بالعربية
    function getEquipmentNameArabic(equipment) {
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
    }

    // الحصول على اسم مستوى الصعوبة بالعربية
    function getDifficultyNameArabic(difficulty) {
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
    }

    // إضافة مستمعي الأحداث

    // اختيار هدف التمرين
    goalCards.forEach(card => {
        card.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع البطاقات
            goalCards.forEach(c => c.classList.remove('active'));

            // إضافة الفئة النشطة للبطاقة المختارة
            this.classList.add('active');

            // تحديث الهدف المختار
            selectedGoal = this.getAttribute('data-goal');
        });
    });

    // إنشاء خطة تمرين
    generatePlanBtn.addEventListener('click', generateWorkoutPlan);

    // تعديل الخطة
    editPlanBtn.addEventListener('click', function() {
        // هنا يمكن إضافة وظيفة تعديل الخطة
        alert('تعديل الخطة');
    });

    // حفظ الخطة
    savePlanBtn.addEventListener('click', function() {
        // حفظ الخطة في التخزين المحلي
        localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
        alert('تم حفظ الخطة بنجاح');
    });

    // طباعة الخطة
    printPlanBtn.addEventListener('click', function() {
        window.print();
    });

    // البحث عن تمارين
    searchBtn.addEventListener('click', function() {
        const searchTerm = exerciseSearch.value.trim().toLowerCase();
        const muscle = muscleFilter.value;

        // تصفية التمارين
        let filteredExercises = allExercises.filter(exercise => {
            const matchesSearch = exercise.name.toLowerCase().includes(searchTerm) ||
                                 (exercise.description && exercise.description.toLowerCase().includes(searchTerm));
            const matchesMuscle = muscle === 'all' || exercise.muscle === muscle;
            const matchesEquipment = workoutPlan.equipment.includes(exercise.equipment);

            return matchesSearch && matchesMuscle && matchesEquipment;
        });

        // عرض التمارين المصفاة
        displayExercisesInModal(filteredExercises);
    });

    // إغلاق النافذة المنبثقة
    modalClose.addEventListener('click', closeExerciseModal);
    modalCloseBtn.addEventListener('click', closeExerciseModal);

    // إغلاق النافذة المنبثقة عند النقر خارجها
    exerciseModal.addEventListener('click', function(event) {
        if (event.target === exerciseModal) {
            closeExerciseModal();
        }
    });

    // تحميل بيانات التمارين عند تحميل الصفحة
    loadExerciseData();
});

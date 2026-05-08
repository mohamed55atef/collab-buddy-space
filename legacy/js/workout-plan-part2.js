            // دمج جميع البيانات
            allExercises = [
                ...chestExercises.exercises,
                ...backExercises.exercises,
                ...shouldersExercises.exercises,
                ...bicepsExercises.exercises,
                ...triceps1Exercises.exercises,
                ...triceps2Exercises.exercises,
                ...legsExercises.exercises,
                ...absExercises.exercises,
                ...cardioExercises.exercises
            ];
            
            // تحقق من وجود خطة تمرين محفوظة
            const savedPlan = localStorage.getItem('workoutPlan');
            if (savedPlan) {
                workoutPlan = JSON.parse(savedPlan);
                displayWorkoutPlan();
            }
            
        } catch (error) {
            console.error('Error loading exercise data:', error);
            alert('حدث خطأ أثناء تحميل بيانات التمارين. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
        }
    }
    
    // إنشاء خطة تمرين جديدة
    function generateWorkoutPlan() {
        // الحصول على قيم الإعدادات
        const level = experienceLevel.value;
        const days = parseInt(daysPerWeek.value);
        const duration = parseInt(workoutDuration.value);
        const equipment = Array.from(equipmentCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // التحقق من اختيار معدات واحدة على الأقل
        if (equipment.length === 0) {
            alert('يرجى اختيار نوع واحد على الأقل من المعدات المتاحة.');
            return;
        }
        
        // إنشاء خطة التمرين
        workoutPlan = {
            goal: selectedGoal,
            level: level,
            days: days,
            duration: duration,
            equipment: equipment,
            schedule: {}
        };
        
        // تحديد أيام التمرين حسب الهدف
        switch (selectedGoal) {
            case 'strength':
                createStrengthPlan(days, level, equipment);
                break;
            case 'weight-loss':
                createWeightLossPlan(days, level, equipment);
                break;
            case 'endurance':
                createEndurancePlan(days, level, equipment);
                break;
            case 'flexibility':
                createFlexibilityPlan(days, level, equipment);
                break;
        }
        
        // عرض خطة التمرين
        displayWorkoutPlan();
        
        // حفظ خطة التمرين في التخزين المحلي
        localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
    }
    
    // إنشاء خطة تمرين لهدف بناء العضلات
    function createStrengthPlan(days, level, equipment) {
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
                split = ['الجزء العلوي', 'الجزء السفلي', 'الجسم كامل'];
                break;
            case 4:
                split = ['الصدر والترايسبس', 'الظهر والبايسبس', 'الأكتاف والبطن', 'الأرجل'];
                break;
            case 5:
                split = ['الصدر', 'الظهر', 'الأكتاف', 'الأرجل', 'الذراعين والبطن'];
                break;
            case 6:
                split = ['الصدر', 'الظهر', 'الأكتاف', 'الأرجل', 'الذراعين', 'البطن والقلب'];
                break;
        }

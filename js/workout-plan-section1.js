/**
 * ملف JavaScript لصفحة جدول التمارين
 * يحتوي على وظائف إنشاء وتخصيص جدول التمارين الأسبوعي
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    let allExercises = []; // جميع التمارين
    let selectedGoal = 'strength'; // الهدف المختار
    let workoutPlan = {}; // خطة التمرين
    let currentDayEditing = null; // اليوم الحالي الذي يتم تعديله

    // عناصر DOM
    const goalCards = document.querySelectorAll('.goal-card');
    const generatePlanBtn = document.getElementById('generate-plan-btn');
    const experienceLevel = document.getElementById('experience-level');
    const daysPerWeek = document.getElementById('days-per-week');
    const workoutDuration = document.getElementById('workout-duration');
    const equipmentCheckboxes = document.querySelectorAll('input[name="equipment"]');
    const workoutPlanSection = document.getElementById('workout-plan');
    const workoutDaysContainer = document.getElementById('workout-days');
    const planGoalValue = document.getElementById('plan-goal-value');
    const planLevelValue = document.getElementById('plan-level-value');
    const planDaysValue = document.getElementById('plan-days-value');
    const editPlanBtn = document.getElementById('edit-plan-btn');
    const savePlanBtn = document.getElementById('save-plan-btn');
    const printPlanBtn = document.getElementById('print-plan-btn');
    const exerciseModal = document.getElementById('exercise-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const exerciseSearch = document.getElementById('exercise-search');
    const searchBtn = document.getElementById('search-btn');
    const muscleFilter = document.getElementById('muscle-filter');
    const exerciseList = document.getElementById('exercise-list');

    // تحميل بيانات التمارين
    async function loadExerciseData() {
        try {
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
            allExercises = [];

            for (const exerciseFile of exerciseFiles) {
                try {
                    const response = await fetch(exerciseFile.file);
                    if (!response.ok) {
                        console.error(`فشل في تحميل ملف ${exerciseFile.file}: ${response.status} ${response.statusText}`);
                        continue;
                    }

                    const data = await response.json();
                    if (data && data.exercises && Array.isArray(data.exercises)) {
                        allExercises = [...allExercises, ...data.exercises];
                    } else {
                        console.error(`تنسيق ملف ${exerciseFile.file} غير صحيح`);
                    }
                } catch (fileError) {
                    console.error(`خطأ في تحميل ملف ${exerciseFile.file}:`, fileError);
                }
            }

            // التحقق من وجود تمارين
            if (allExercises.length === 0) {
                throw new Error('لم يتم تحميل أي تمارين');
            }

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

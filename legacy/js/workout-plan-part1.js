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
            // تحميل بيانات تمارين الصدر
            const chestResponse = await fetch('../data/chest-exercises.json');
            const chestExercises = await chestResponse.json();
            
            // تحميل بيانات تمارين الظهر
            const backResponse = await fetch('../data/back-exercises.json');
            const backExercises = await backResponse.json();
            
            // تحميل بيانات تمارين الأكتاف
            const shouldersResponse = await fetch('../data/shoulders-exercises.json');
            const shouldersExercises = await shouldersResponse.json();
            
            // تحميل بيانات تمارين البايسبس
            const bicepsResponse = await fetch('../data/biceps-exercises.json');
            const bicepsExercises = await bicepsResponse.json();
            
            // تحميل بيانات تمارين الترايسبس (ملفين)
            const triceps1Response = await fetch('../data/triceps-exercises-1.json');
            const triceps1Exercises = await triceps1Response.json();
            
            const triceps2Response = await fetch('../data/triceps-exercises-2.json');
            const triceps2Exercises = await triceps2Response.json();
            
            // تحميل بيانات تمارين الأرجل
            const legsResponse = await fetch('../data/legs-exercises.json');
            const legsExercises = await legsResponse.json();
            
            // تحميل بيانات تمارين البطن
            const absResponse = await fetch('../data/abs-exercises.json');
            const absExercises = await absResponse.json();
            
            // تحميل بيانات تمارين القلب
            const cardioResponse = await fetch('../data/cardio-exercises.json');
            const cardioExercises = await cardioResponse.json();

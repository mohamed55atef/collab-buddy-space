/**
 * ملف JavaScript لصفحة قاعدة بيانات التمارين
 * يحتوي على وظائف تحميل وعرض وتصفية وبحث التمارين
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    let allExercises = []; // جميع التمارين
    let filteredExercises = []; // التمارين المصفاة
    let currentPage = 1; // الصفحة الحالية
    const itemsPerPage = 12; // عدد العناصر في الصفحة الواحدة
    
    // عناصر DOM
    const exerciseItemsGrid = document.getElementById('exercise-items-grid');
    const noResults = document.getElementById('no-results');
    const pagination = document.getElementById('pagination');
    const itemsCount = document.getElementById('items-count');
    const searchInput = document.getElementById('exercise-search');
    const searchBtn = document.getElementById('search-btn');
    const muscleFilter = document.getElementById('muscle-filter');
    const equipmentFilter = document.getElementById('equipment-filter');
    const categoryCards = document.querySelectorAll('.category-card');
    const modal = document.getElementById('exercise-details-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalAddToWorkout = document.getElementById('modal-add-to-workout');
    
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

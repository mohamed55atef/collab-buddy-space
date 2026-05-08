/**
 * ملف JavaScript لصفحة قاعدة بيانات الأكلات
 * يحتوي على وظائف تحميل وعرض وتصفية وبحث الأطعمة
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    let allFoods = []; // جميع الأطعمة
    let filteredFoods = []; // الأطعمة المصفاة
    let currentPage = 1; // الصفحة الحالية
    const itemsPerPage = 12; // عدد العناصر في الصفحة الواحدة
    
    // عناصر DOM
    const foodItemsGrid = document.getElementById('food-items-grid');
    const noResults = document.getElementById('no-results');
    const pagination = document.getElementById('pagination');
    const itemsCount = document.getElementById('items-count');
    const searchInput = document.getElementById('food-search');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const categoryCards = document.querySelectorAll('.category-card');
    const modal = document.getElementById('food-details-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalAddToMeal = document.getElementById('modal-add-to-meal');
    
    // تحميل بيانات الأطعمة
    async function loadFoodData() {
        try {
            // تحميل بيانات الأكلات المصرية (3 ملفات)
            const egyptianFood1Response = await fetch('../data/egyptian-food-1.json');
            const egyptianFood1 = await egyptianFood1Response.json();
            
            const egyptianFood2Response = await fetch('../data/egyptian-food-2.json');
            const egyptianFood2 = await egyptianFood2Response.json();
            
            const egyptianFood3Response = await fetch('../data/egyptian-food-3.json');
            const egyptianFood3 = await egyptianFood3Response.json();
            
            // تحميل بيانات الوجبات السريعة
            const fastFoodResponse = await fetch('../data/fast-food.json');
            const fastFood = await fastFoodResponse.json();
            
            // تحميل بيانات الحلويات
            const dessertsResponse = await fetch('../data/desserts.json');
            const desserts = await dessertsResponse.json();
            
            // تحميل بيانات المشروبات
            const drinksResponse = await fetch('../data/drinks.json');
            const drinks = await drinksResponse.json();
            
            // تحميل بيانات فئات الطعام (النشويات، البروتينات، الخضروات، الفواكه)
            const foodCategoriesResponse = await fetch('../data/food-categories.json');
            const foodCategories = await foodCategoriesResponse.json();
            
            // دمج جميع البيانات
            allFoods = [
                ...egyptianFood1.foods.map(food => ({ ...food, category: 'egyptian' })),
                ...egyptianFood2.foods.map(food => ({ ...food, category: 'egyptian' })),
                ...egyptianFood3.foods.map(food => ({ ...food, category: 'egyptian' })),
                ...fastFood.foods.map(food => ({ ...food, category: 'fast-food' })),
                ...desserts.foods.map(food => ({ ...food, category: 'desserts' })),
                ...drinks.foods.map(food => ({ ...food, category: 'drinks' }))
            ];

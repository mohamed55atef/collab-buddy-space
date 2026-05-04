/**
 * ملف JavaScript لصفحة خطة الوجبات
 * يحتوي على وظائف إنشاء وعرض وتحميل وتعديل خطط الوجبات
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Elements ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const mealPlanForm = document.getElementById('meal-plan-form');
    const currentMealPlanElement = document.getElementById('current-meal-plan');
    const templateButtons = document.querySelectorAll('.load-template');
    const modal = document.getElementById('replacement-modal');
    const modalCloseBtn = modal.querySelector('.modal-close-btn');
    const modalSearchInput = modal.querySelector('#modal-search-input');
    const modalFoodList = modal.querySelector('#modal-food-list');

    // --- Global State ---
    let currentPlan = null;
    let itemToReplace = null; // { weekIdx, dayIdx, mealIdx, itemIdx }

    // --- Functions ---

    function switchTab(event) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        const tabId = event.target.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    function getAllFoods() {
        let allFoods = [];
        if (typeof egyptianFood1 !== 'undefined') allFoods = allFoods.concat(egyptianFood1);
        if (typeof fastFood1 !== 'undefined') allFoods = allFoods.concat(fastFood1);
        if (typeof desserts1 !== 'undefined') allFoods = allFoods.concat(desserts1);
        if (typeof drinks1 !== 'undefined') allFoods = allFoods.concat(drinks1);
        if (typeof carbs1 !== 'undefined') allFoods = allFoods.concat(carbs1);
        if (typeof proteins1 !== 'undefined') allFoods = allFoods.concat(proteins1);
        if (typeof vegetables1 !== 'undefined') allFoods = allFoods.concat(vegetables1);
        if (typeof fruits1 !== 'undefined') allFoods = allFoods.concat(fruits1);
        return allFoods;
    }

    function filterAvailableFoods(foodPreferences, dietaryRestrictions) {
        let allFoods = getAllFoods();
        let availableFoods = foodPreferences.length > 0 ? allFoods.filter(food => foodPreferences.includes(food.category)) : allFoods;

        if (dietaryRestrictions.includes('vegetarian')) {
            const nonVegKeywords = ['دجاج', 'لحم', 'شاورما', 'كبدة', 'سجق', 'سمك', 'جمبري', 'رنجة', 'سردين', 'ماكريل', 'بورى', 'بلطي', 'حمام', 'كوارع'];
            availableFoods = availableFoods.filter(food => !nonVegKeywords.some(keyword => food.name.includes(keyword)));
        }
        if (dietaryRestrictions.includes('low-carb')) availableFoods = availableFoods.filter(food => food.carbs < 15);
        if (dietaryRestrictions.includes('high-protein')) availableFoods = availableFoods.filter(food => food.protein > 15);
        if (dietaryRestrictions.includes('low-fat')) availableFoods = availableFoods.filter(food => food.fat < 5);
        return availableFoods;
    }

    function generateMealItems(calories, availableFoods) {
        const items = [];
        let remainingCalories = calories;
        let foodPool = [...availableFoods];
        const itemsCount = Math.floor(Math.random() * 2) + 2;

        for (let i = 0; i < itemsCount; i++) {
            if (foodPool.length === 0 || remainingCalories <= 20) break;
            let suitableFoods = foodPool.filter(f => f.calories <= remainingCalories);
            if (suitableFoods.length === 0) break;

            const randomIndex = Math.floor(Math.random() * suitableFoods.length);
            const selectedFood = suitableFoods[randomIndex];
            
            items.push({ ...selectedFood });
            remainingCalories -= selectedFood.calories;
            foodPool.splice(foodPool.findIndex(f => f.id === selectedFood.id), 1);
        }
        return items;
    }
    
    function generateMealPlan(caloriesGoal, mealsCount, planDuration, foodPreferences, dietaryRestrictions) {
        const daysOfWeek = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const mealNames = ['الإفطار', 'الغداء', 'العشاء', 'وجبة خفيفة 1', 'وجبة خفيفة 2', 'وجبة خفيفة 3'];
        const availableFoods = filterAvailableFoods(foodPreferences, dietaryRestrictions);
        const plan = { id: `plan_${new Date().getTime()}`, caloriesGoal, mealsCount, planDuration, foodPreferences, dietaryRestrictions, weeks: [] };

        for (let week = 0; week < planDuration; week++) {
            const weekPlan = { weekNumber: week + 1, days: [] };
            for (let day = 0; day < 7; day++) {
                const dayPlan = { dayName: daysOfWeek[day], meals: [], totalCalories: 0 };
                let remainingCalories = caloriesGoal;
                const caloriesPerMeal = Math.floor(caloriesGoal / mealsCount);

                for (let meal = 0; meal < mealsCount; meal++) {
                    let mealCalories = (meal === mealsCount - 1) ? remainingCalories : caloriesPerMeal + Math.floor(Math.random() * (caloriesPerMeal * 0.2 * 2)) - (caloriesPerMeal * 0.2);
                    remainingCalories -= mealCalories;
                    
                    const mealItems = generateMealItems(mealCalories, availableFoods);
                    const totalMealCalories = mealItems.reduce((sum, item) => sum + item.calories, 0);

                    dayPlan.meals.push({ mealName: mealNames[meal], calories: totalMealCalories, items: mealItems });
                }
                dayPlan.totalCalories = dayPlan.meals.reduce((sum, meal) => sum + meal.calories, 0);
                weekPlan.days.push(dayPlan);
            }
            plan.weeks.push(weekPlan);
        }
        return plan;
    }

    function displayMealPlan(mealPlan) {
        if (!mealPlan) {
            currentMealPlanElement.innerHTML = `<div class="no-plan-message"><i class="fas fa-utensils"></i><h3>لا توجد خطة وجبات حالية</h3><p>قم بإنشاء خطة وجبات جديدة أو اختر من القوالب الجاهزة</p></div>`;
            return;
        }
        let html = `<div class="meal-plan-header"><h2 class="meal-plan-title">خطة الوجبات الأسبوعية</h2><div class="meal-plan-info"><span class="info-item"><i class="fas fa-fire"></i> ${mealPlan.caloriesGoal} سعرة حرارية يومياً</span><span class="info-item"><i class="fas fa-utensils"></i> ${mealPlan.mealsCount} وجبات يومياً</span></div></div><div class="meal-plan-weeks">`;
        mealPlan.weeks.forEach((week, weekIndex) => {
            html += `<div class="meal-plan-week"><h3 class="week-title">الأسبوع ${week.weekNumber}</h3><div class="days-grid">`;
            week.days.forEach((day, dayIndex) => {
                html += `<div class="day-card"><div class="day-header"><h4 class="day-name">${day.dayName}</h4><span class="day-calories" id="day-total-${weekIndex}-${dayIndex}">${day.totalCalories} سعرة</span></div><div class="day-meals">`;
                day.meals.forEach((meal, mealIndex) => {
                    html += `<div class="meal-item"><div class="meal-header"><h5 class="meal-name">${meal.mealName}</h5><span class="meal-calories" id="meal-total-${weekIndex}-${dayIndex}-${mealIndex}">${meal.calories} سعرة</span></div><ul class="meal-foods">`;
                    meal.items.forEach((item, itemIndex) => {
                        html += `<li class="food-item" data-week="${weekIndex}" data-day="${dayIndex}" data-meal="${mealIndex}" data-item="${itemIndex}"><div class="food-info"><span class="food-name">${item.name}</span><span class="food-details">${item.serving} - ${item.calories} سعرة</span></div><div class="food-actions"><button class="replace-food-btn" title="استبدال"><i class="fas fa-sync-alt"></i></button><button class="delete-food-btn" title="حذف"><i class="fas fa-trash-alt"></i></button></div></li>`;
                    });
                    html += `</ul></div>`;
                });
                html += `</div></div>`;
            });
            html += `</div></div>`;
        });
        html += `</div><div class="meal-plan-actions"><button id="print-meal-plan" class="btn btn-secondary"><i class="fas fa-print"></i> طباعة</button><button id="edit-meal-plan" class="btn btn-primary"><i class="fas fa-edit"></i> تعديل تفضيلات الخطة</button></div>`;
        currentMealPlanElement.innerHTML = html;
    }

    function handlePlanActions(e) {
        const target = e.target.closest('button');
        if (!target) return;
        const foodItemLi = target.closest('.food-item');
        if (!foodItemLi) return;
        const { week, day, meal, item } = foodItemLi.dataset;
        if (target.classList.contains('delete-food-btn')) {
            deleteFoodItem(parseInt(week), parseInt(day), parseInt(meal), parseInt(item));
        } else if (target.classList.contains('replace-food-btn')) {
            openReplacementModal(parseInt(week), parseInt(day), parseInt(meal), parseInt(item));
        }
    }

    function deleteFoodItem(weekIdx, dayIdx, mealIdx, itemIdx) {
        currentPlan.weeks[weekIdx].days[dayIdx].meals[mealIdx].items.splice(itemIdx, 1);
        updateTotals(weekIdx, dayIdx, mealIdx);
        saveMealPlan(currentPlan);
        displayMealPlan(currentPlan);
    }

    function openReplacementModal(weekIdx, dayIdx, mealIdx, itemIdx) {
        itemToReplace = { weekIdx, dayIdx, mealIdx, itemIdx };
        const foodPool = filterAvailableFoods(currentPlan.foodPreferences, currentPlan.dietaryRestrictions);
        populateReplacementModal(foodPool);
        modal.style.display = 'flex';
        modalSearchInput.focus();
    }

    function closeReplacementModal() {
        modal.style.display = 'none';
        modalSearchInput.value = '';
        itemToReplace = null;
    }

    function populateReplacementModal(foods, searchTerm = '') {
        let filteredFoods = foods;
        if (searchTerm) {
            filteredFoods = foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        let listHtml = filteredFoods.map(food => `
            <div class="modal-food-item">
                <div class="food-info">
                    <span class="food-name">${food.name}</span>
                    <span class="food-details">${food.serving} - ${food.calories} سعرة</span>
                </div>
                <button class="select-food-btn" data-food-id="${food.id}">اختر</button>
            </div>
        `).join('');
        modalFoodList.innerHTML = listHtml || '<p>لا توجد نتائج.</p>';
    }

    function handleSelectReplacement(e) {
        if (!e.target.classList.contains('select-food-btn')) return;
        if (!itemToReplace) return;

        const foodId = e.target.dataset.foodId;
        const allFoods = getAllFoods();
        const newFood = allFoods.find(food => food.id === foodId);

        if (newFood) {
            const { weekIdx, dayIdx, mealIdx, itemIdx } = itemToReplace;
            currentPlan.weeks[weekIdx].days[dayIdx].meals[mealIdx].items[itemIdx] = { ...newFood };
            updateTotals(weekIdx, dayIdx, mealIdx);
            saveMealPlan(currentPlan);
            displayMealPlan(currentPlan);
        }
        closeReplacementModal();
    }

    function updateTotals(weekIdx, dayIdx, mealIdx) {
        const day = currentPlan.weeks[weekIdx].days[dayIdx];
        const meal = day.meals[mealIdx];
        meal.calories = meal.items.reduce((sum, item) => sum + item.calories, 0);
        day.totalCalories = day.meals.reduce((sum, m) => sum + m.calories, 0);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const caloriesGoal = parseInt(document.getElementById('calories-goal').value);
        const mealsCount = parseInt(document.getElementById('meals-count').value);
        const planDuration = parseInt(document.getElementById('plan-duration').value);
        const foodPreferences = Array.from(document.querySelectorAll('input[name="food-preference"]:checked')).map(cb => cb.value);
        const dietaryRestrictions = Array.from(document.querySelectorAll('input[name="dietary-restriction"]:checked')).map(cb => cb.value);

        if (isNaN(caloriesGoal) || isNaN(mealsCount) || isNaN(planDuration) || foodPreferences.length === 0) {
            showError('يرجى إدخال جميع البيانات المطلوبة بشكل صحيح');
            return;
        }
        currentPlan = generateMealPlan(caloriesGoal, mealsCount, planDuration, foodPreferences, dietaryRestrictions);
        saveMealPlan(currentPlan);
        displayMealPlan(currentPlan);
        document.querySelector('.tab-btn[data-tab="view"]').click();
    }

    function saveMealPlan(mealPlan) {
        localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    }

    function loadMealPlan() {
        const savedPlan = localStorage.getItem('mealPlan');
        return savedPlan ? JSON.parse(savedPlan) : null;
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        mealPlanForm.insertBefore(errorDiv, mealPlanForm.querySelector('.form-actions'));
        setTimeout(() => errorDiv.remove(), 3000);
    }
    
    function handleLoadTemplate(event) {
        const templateName = event.target.closest('button').getAttribute('data-template');
        let template;
        switch (templateName) {
            case 'weight-loss':
                template = { caloriesGoal: 1500, mealsCount: 4, foodPreferences: ['proteins', 'vegetables', 'fruits'], dietaryRestrictions: ['low-carb'] };
                break;
            case 'weight-gain':
                template = { caloriesGoal: 3000, mealsCount: 6, foodPreferences: ['egyptian', 'fast-food', 'carbs', 'proteins'], dietaryRestrictions: ['high-protein'] };
                break;
            case 'balanced':
                template = { caloriesGoal: 2200, mealsCount: 5, foodPreferences: ['egyptian', 'drinks', 'carbs', 'proteins', 'vegetables', 'fruits'], dietaryRestrictions: [] };
                break;
            default: return;
        }
        currentPlan = generateMealPlan(template.caloriesGoal, template.mealsCount, 1, template.foodPreferences, template.dietaryRestrictions);
        saveMealPlan(currentPlan);
        displayMealPlan(currentPlan);
        document.querySelector('.tab-btn[data-tab="view"]').click();
    }

    // --- Event Listeners ---
    tabButtons.forEach(button => button.addEventListener('click', switchTab));
    if (mealPlanForm) mealPlanForm.addEventListener('submit', handleFormSubmit);
    templateButtons.forEach(button => button.addEventListener('click', handleLoadTemplate));
    currentMealPlanElement.addEventListener('click', handlePlanActions);
    modalCloseBtn.addEventListener('click', closeReplacementModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeReplacementModal(); });
    modalSearchInput.addEventListener('keyup', () => {
        const foodPool = filterAvailableFoods(currentPlan.foodPreferences, currentPlan.dietaryRestrictions);
        populateReplacementModal(foodPool, modalSearchInput.value);
    });
    modalFoodList.addEventListener('click', handleSelectReplacement);

    // --- Initial Load ---
    currentPlan = loadMealPlan();
    if (currentPlan) {
        displayMealPlan(currentPlan);
    }
});

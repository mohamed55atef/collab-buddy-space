    // وظيفة إنشاء خطة الوجبات
    function createMealPlan() {
        // الحصول على قيم المدخلات
        const caloriesGoal = parseInt(document.getElementById('calories-goal').value);
        const mealsCount = parseInt(document.getElementById('meals-count').value);
        const planDuration = parseInt(document.getElementById('plan-duration').value);
        
        // الحصول على تفضيلات الطعام المحددة
        const foodPreferences = [];
        document.querySelectorAll('input[name="food-preference"]:checked').forEach(checkbox => {
            foodPreferences.push(checkbox.value);
        });
        
        // الحصول على القيود الغذائية المحددة
        const dietaryRestrictions = [];
        document.querySelectorAll('input[name="dietary-restriction"]:checked').forEach(checkbox => {
            dietaryRestrictions.push(checkbox.value);
        });
        
        // التحقق من صحة المدخلات
        if (isNaN(caloriesGoal) || isNaN(mealsCount) || isNaN(planDuration)) {
            showError('يرجى إدخال جميع البيانات المطلوبة بشكل صحيح');
            return;
        }
        
        if (foodPreferences.length === 0) {
            showError('يرجى اختيار تفضيل طعام واحد على الأقل');
            return;
        }
        
        // إنشاء خطة الوجبات
        const mealPlan = generateMealPlan(caloriesGoal, mealsCount, planDuration, foodPreferences, dietaryRestrictions);
        
        // حفظ خطة الوجبات في التخزين المحلي
        saveMealPlan(mealPlan);
        
        // عرض خطة الوجبات
        displayMealPlan(mealPlan);
        
        // التبديل إلى تبويب عرض الخطة
        document.querySelector('.tab-btn[data-tab="view"]').click();
    }

    // وظيفة توليد خطة الوجبات
    function generateMealPlan(caloriesGoal, mealsCount, planDuration, foodPreferences, dietaryRestrictions) {
        // هذه وظيفة مؤقتة لتوليد خطة وجبات عشوائية
        // في التطبيق الحقيقي، ستستخدم قاعدة بيانات الأكلات لإنشاء خطة متوازنة
        
        const daysOfWeek = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const mealNames = ['الإفطار', 'الغداء', 'العشاء', 'وجبة خفيفة 1', 'وجبة خفيفة 2', 'وجبة خفيفة 3'];
        
        // إنشاء خطة فارغة
        const plan = {
            caloriesGoal,
            mealsCount,
            planDuration,
            foodPreferences,
            dietaryRestrictions,
            weeks: []
        };
        
        // إنشاء أسابيع الخطة
        for (let week = 0; week < planDuration; week++) {
            const weekPlan = {
                weekNumber: week + 1,
                days: []
            };
            
            // إنشاء أيام الأسبوع
            for (let day = 0; day < 7; day++) {
                const dayPlan = {
                    dayName: daysOfWeek[day],
                    meals: []
                };
                
                // توزيع السعرات على الوجبات
                let remainingCalories = caloriesGoal;
                const caloriesPerMeal = Math.floor(caloriesGoal / mealsCount);
                
                // إنشاء الوجبات
                for (let meal = 0; meal < mealsCount; meal++) {
                    // تحديد سعرات الوجبة
                    let mealCalories;
                    if (meal === mealsCount - 1) {
                        // آخر وجبة تأخذ السعرات المتبقية
                        mealCalories = remainingCalories;
                    } else {
                        // توزيع السعرات بشكل عشوائي مع بعض التنوع
                        const variation = Math.floor(caloriesPerMeal * 0.2); // 20% تنوع
                        mealCalories = caloriesPerMeal + Math.floor(Math.random() * variation * 2) - variation;
                        remainingCalories -= mealCalories;
                    }
                    
                    // إنشاء الوجبة
                    const mealPlan = {
                        mealName: mealNames[meal],
                        calories: mealCalories,
                        items: generateMealItems(mealCalories, foodPreferences, dietaryRestrictions)
                    };
                    
                    dayPlan.meals.push(mealPlan);
                }
                
                weekPlan.days.push(dayPlan);
            }
            
            plan.weeks.push(weekPlan);
        }
        
        return plan;
    }

    // وظيفة توليد عناصر الوجبة
    function generateMealItems(calories, foodPreferences, dietaryRestrictions) {
        // هذه وظيفة مؤقتة لتوليد عناصر وجبة عشوائية
        // في التطبيق الحقيقي، ستستخدم قاعدة بيانات الأكلات لإنشاء وجبات متوازنة
        
        const egyptianFoods = [
            { name: 'كشري', calories: 350, protein: 10, carbs: 70, fat: 5 },
            { name: 'فول مدمس', calories: 200, protein: 15, carbs: 30, fat: 2 },
            { name: 'طعمية', calories: 250, protein: 12, carbs: 25, fat: 10 },
            { name: 'ملوخية', calories: 150, protein: 5, carbs: 15, fat: 8 },
            { name: 'محشي', calories: 300, protein: 8, carbs: 40, fat: 12 }
        ];
        
        const fastFoods = [
            { name: 'برجر دجاج', calories: 400, protein: 25, carbs: 35, fat: 15 },
            { name: 'بيتزا', calories: 450, protein: 20, carbs: 50, fat: 18 },
            { name: 'شاورما', calories: 350, protein: 30, carbs: 25, fat: 12 },
            { name: 'بطاطس مقلية', calories: 250, protein: 3, carbs: 35, fat: 12 },
            { name: 'ناجتس دجاج', calories: 300, protein: 18, carbs: 20, fat: 15 }
        ];
        
        const desserts = [
            { name: 'كنافة', calories: 400, protein: 8, carbs: 60, fat: 15 },
            { name: 'بسبوسة', calories: 350, protein: 5, carbs: 55, fat: 12 },
            { name: 'أم علي', calories: 450, protein: 10, carbs: 65, fat: 18 },
            { name: 'قطايف', calories: 300, protein: 6, carbs: 45, fat: 10 },
            { name: 'بلح الشام', calories: 250, protein: 4, carbs: 40, fat: 8 }
        ];
        
        const drinks = [
            { name: 'عصير برتقال', calories: 120, protein: 1, carbs: 30, fat: 0 },
            { name: 'عصير مانجو', calories: 150, protein: 1, carbs: 35, fat: 0 },
            { name: 'عصير جوافة', calories: 100, protein: 1, carbs: 25, fat: 0 },
            { name: 'شاي بالنعناع', calories: 5, protein: 0, carbs: 1, fat: 0 },
            { name: 'قهوة', calories: 5, protein: 0, carbs: 1, fat: 0 }
        ];
        
        // تجميع قائمة الأطعمة المتاحة بناءً على التفضيلات
        let availableFoods = [];
        
        if (foodPreferences.includes('egyptian')) {
            availableFoods = availableFoods.concat(egyptianFoods);
        }
        
        if (foodPreferences.includes('fast-food')) {
            availableFoods = availableFoods.concat(fastFoods);
        }
        
        if (foodPreferences.includes('desserts')) {
            availableFoods = availableFoods.concat(desserts);
        }
        
        if (foodPreferences.includes('drinks')) {
            availableFoods = availableFoods.concat(drinks);
        }
        
        // تطبيق القيود الغذائية (هذا مجرد مثال بسيط)
        if (dietaryRestrictions.includes('vegetarian')) {
            availableFoods = availableFoods.filter(food => 
                !food.name.includes('دجاج') && 
                !food.name.includes('لحم') && 
                !food.name.includes('شاورما')
            );
        }
        
        // اختيار عناصر الوجبة
        const items = [];
        let remainingCalories = calories;
        
        // إضافة 2-4 عناصر للوجبة
        const itemsCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < itemsCount; i++) {
            if (availableFoods.length === 0 || remainingCalories <= 0) {
                break;
            }
            
            // اختيار عنصر عشوائي
            const randomIndex = Math.floor(Math.random() * availableFoods.length);
            const selectedFood = availableFoods[randomIndex];
            
            // تحديد الكمية بناءً على السعرات المتبقية
            let quantity = 1;
            if (selectedFood.calories > remainingCalories) {
                quantity = remainingCalories / selectedFood.calories;
            } else if (i === itemsCount - 1) {
                // آخر عنصر يأخذ السعرات المتبقية
                quantity = remainingCalories / selectedFood.calories;
            }
            
            // إضافة العنصر إلى الوجبة
            items.push({
                name: selectedFood.name,
                quantity: Math.round(quantity * 10) / 10, // تقريب إلى 1 رقم عشري
                calories: Math.round(selectedFood.calories * quantity),
                protein: Math.round(selectedFood.protein * quantity),
                carbs: Math.round(selectedFood.carbs * quantity),
                fat: Math.round(selectedFood.fat * quantity)
            });
            
            // تحديث السعرات المتبقية
            remainingCalories -= selectedFood.calories * quantity;
            
            // إزالة العنصر من القائمة لتجنب التكرار
            availableFoods.splice(randomIndex, 1);
        }
        
        return items;
    }
    
    // وظيفة عرض خطة الوجبات
    function displayMealPlan(mealPlan) {
        const currentMealPlanElement = document.getElementById('current-meal-plan');
        
        // إنشاء محتوى خطة الوجبات
        let html = `
            <div class="meal-plan-header">
                <h2 class="meal-plan-title">خطة الوجبات الأسبوعية</h2>
                <div class="meal-plan-info">
                    <span class="info-item"><i class="fas fa-fire"></i> ${mealPlan.caloriesGoal} سعرة حرارية يومياً</span>
                    <span class="info-item"><i class="fas fa-utensils"></i> ${mealPlan.mealsCount} وجبات يومياً</span>
                    <span class="info-item"><i class="fas fa-calendar-alt"></i> ${mealPlan.planDuration} أسبوع</span>
                </div>
            </div>
            
            <div class="meal-plan-weeks">
        `;
        
        // عرض الأسبوع الأول فقط
        const firstWeek = mealPlan.weeks[0];
        
        html += `
            <div class="meal-plan-week">
                <h3 class="week-title">الأسبوع ${firstWeek.weekNumber}</h3>
                <div class="days-grid">
        `;
        
        // عرض أيام الأسبوع
        firstWeek.days.forEach(day => {
            html += `
                <div class="day-card">
                    <div class="day-header">
                        <h4 class="day-name">${day.dayName}</h4>
                    </div>
                    <div class="day-meals">
            `;
            
            // عرض وجبات اليوم
            day.meals.forEach(meal => {
                html += `
                    <div class="meal-item">
                        <div class="meal-header">
                            <h5 class="meal-name">${meal.mealName}</h5>
                            <span class="meal-calories">${meal.calories} سعرة</span>
                        </div>
                        <ul class="meal-foods">
                `;
                
                // عرض عناصر الوجبة
                meal.items.forEach(item => {
                    html += `
                        <li class="food-item">
                            <span class="food-name">${item.name}</span>
                            <span class="food-quantity">${item.quantity} حصة</span>
                            <span class="food-calories">${item.calories} سعرة</span>
                        </li>
                    `;
                });
                
                html += `
                        </ul>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        // إضافة أزرار التحكم
        html += `
            <div class="meal-plan-actions">
                <button id="print-meal-plan" class="btn btn-secondary">
                    <i class="fas fa-print"></i> طباعة الخطة
                </button>
                <button id="edit-meal-plan" class="btn btn-primary">
                    <i class="fas fa-edit"></i> تعديل الخطة
                </button>
            </div>
        `;
        
        // عرض خطة الوجبات
        currentMealPlanElement.innerHTML = html;
        
        // إضافة مستمعي الأحداث للأزرار
        document.getElementById('print-meal-plan').addEventListener('click', function() {
            window.print();
        });
        
        document.getElementById('edit-meal-plan').addEventListener('click', function() {
            document.querySelector('.tab-btn[data-tab="create"]').click();
        });
    }
    
    // وظيفة حفظ خطة الوجبات في التخزين المحلي
    function saveMealPlan(mealPlan) {
        localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    }
    
    // وظيفة استرجاع خطة الوجبات من التخزين المحلي
    function loadMealPlan() {
        const savedPlan = localStorage.getItem('mealPlan');
        if (savedPlan) {
            return JSON.parse(savedPlan);
        }
        return null;
    }
    
    // وظيفة عرض رسالة خطأ
    function showError(message) {
        // إنشاء عنصر رسالة الخطأ
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // إضافة رسالة الخطأ إلى النموذج
        const formActions = document.querySelector('.form-actions');
        mealPlanForm.insertBefore(errorDiv, formActions);
        
        // إزالة رسالة الخطأ بعد 3 ثوانٍ
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // تحميل القوالب الجاهزة
    const templateButtons = document.querySelectorAll('.load-template');
    templateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateName = this.getAttribute('data-template');
            loadTemplate(templateName);
        });
    });
    
    // وظيفة تحميل قالب جاهز
    function loadTemplate(templateName) {
        // هنا يمكن تحميل قوالب جاهزة من ملف JSON
        // لكن في هذا المثال سنستخدم قوالب مضمنة
        
        let template;
        
        switch (templateName) {
            case 'weight-loss':
                template = {
                    caloriesGoal: 1500,
                    mealsCount: 4,
                    planDuration: 1,
                    foodPreferences: ['egyptian'],
                    dietaryRestrictions: ['low-carb'],
                    // ... باقي بيانات القالب
                };
                break;
            case 'weight-gain':
                template = {
                    caloriesGoal: 3000,
                    mealsCount: 6,
                    planDuration: 1,
                    foodPreferences: ['egyptian', 'fast-food'],
                    dietaryRestrictions: ['high-protein'],
                    // ... باقي بيانات القالب
                };
                break;
            case 'balanced':
                template = {
                    caloriesGoal: 2200,
                    mealsCount: 5,
                    planDuration: 1,
                    foodPreferences: ['egyptian', 'drinks'],
                    dietaryRestrictions: [],
                    // ... باقي بيانات القالب
                };
                break;
            default:
                return;
        }
        
        // إنشاء خطة الوجبات من القالب
        const mealPlan = generateMealPlan(
            template.caloriesGoal,
            template.mealsCount,
            template.planDuration,
            template.foodPreferences,
            template.dietaryRestrictions
        );
        
        // حفظ خطة الوجبات
        saveMealPlan(mealPlan);
        
        // عرض خطة الوجبات
        displayMealPlan(mealPlan);
        
        // التبديل إلى تبويب عرض الخطة
        document.querySelector('.tab-btn[data-tab="view"]').click();
    }
    
    // تحميل خطة الوجبات المحفوظة عند فتح الصفحة
    const savedMealPlan = loadMealPlan();
    if (savedMealPlan) {
        displayMealPlan(savedMealPlan);
    }
});

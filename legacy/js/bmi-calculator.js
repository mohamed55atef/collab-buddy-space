/**
 * ملف JavaScript لصفحة حاسبة مؤشر كتلة الجسم وتوزيع العناصر الغذائية
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM للتبويبات
    const tabButtons = document.querySelectorAll('.tab-btn');
    const calculatorContents = document.querySelectorAll('.calculator-content');
    
    // عناصر DOM لحاسبة مؤشر كتلة الجسم
    const bmiWeight = document.getElementById('bmi-weight');
    const bmiHeight = document.getElementById('bmi-height');
    const calculateBmiBtn = document.getElementById('calculate-bmi');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    
    // عناصر DOM لحاسبة العناصر الغذائية
    const macroGender = document.getElementById('macro-gender');
    const macroAge = document.getElementById('macro-age');
    const macroWeight = document.getElementById('macro-weight');
    const macroHeight = document.getElementById('macro-height');
    const macroActivity = document.getElementById('macro-activity');
    const macroGoal = document.getElementById('macro-goal');
    const calculateMacrosBtn = document.getElementById('calculate-macros');
    const caloriesValue = document.getElementById('calories-value');
    const proteinValue = document.getElementById('protein-value');
    const carbsValue = document.getElementById('carbs-value');
    const fatValue = document.getElementById('fat-value');
    const proteinCalories = document.getElementById('protein-calories');
    const carbsCalories = document.getElementById('carbs-calories');
    const fatCalories = document.getElementById('fat-calories');
    
    // متغير لمخطط العناصر الغذائية
    let macrosChart;
    
    // التبديل بين التبويبات
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر المضغوط
            this.classList.add('active');
            
            // إخفاء جميع المحتويات
            calculatorContents.forEach(content => content.classList.remove('active'));
            
            // إظهار المحتوى المطلوب
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-calculator`).classList.add('active');
        });
    });
    
    // حساب مؤشر كتلة الجسم
    calculateBmiBtn.addEventListener('click', function() {
        // التحقق من إدخال البيانات
        if (!bmiWeight.value || !bmiHeight.value) {
            alert('يرجى إدخال الوزن والطول');
            return;
        }
        
        // تحويل القيم إلى أرقام
        const weight = parseFloat(bmiWeight.value);
        const height = parseFloat(bmiHeight.value) / 100; // تحويل من سم إلى متر
        
        // التحقق من صحة القيم
        if (weight < 30 || weight > 300 || height < 1 || height > 2.5) {
            alert('يرجى إدخال قيم صحيحة للوزن والطول');
            return;
        }
        
        // حساب مؤشر كتلة الجسم
        const bmi = weight / (height * height);
        
        // عرض النتيجة
        bmiValue.textContent = bmi.toFixed(1);
        
        // تحديد الفئة
        let category = '';
        let categoryClass = '';
        
        if (bmi < 18.5) {
            category = 'نقص الوزن';
            categoryClass = 'bmi-category-underweight';
        } else if (bmi < 25) {
            category = 'وزن طبيعي';
            categoryClass = 'bmi-category-normal';
        } else if (bmi < 30) {
            category = 'زيادة الوزن';
            categoryClass = 'bmi-category-overweight';
        } else {
            category = 'سمنة';
            categoryClass = 'bmi-category-obese';
        }
        
        // عرض الفئة
        bmiCategory.textContent = category;
        
        // إزالة جميع فئات الألوان
        bmiCategory.classList.remove('bmi-category-underweight', 'bmi-category-normal', 'bmi-category-overweight', 'bmi-category-obese');
        
        // إضافة فئة اللون المناسبة
        bmiCategory.classList.add(categoryClass);
        
        // تحريك المؤشر على المقياس (يمكن إضافة هذه الميزة لاحقاً)
    });
    
    // حساب توزيع العناصر الغذائية
    calculateMacrosBtn.addEventListener('click', function() {
        // التحقق من إدخال البيانات
        if (!macroAge.value || !macroWeight.value || !macroHeight.value) {
            alert('يرجى إدخال جميع البيانات المطلوبة');
            return;
        }
        
        // تحويل القيم إلى أرقام
        const gender = macroGender.value;
        const age = parseInt(macroAge.value);
        const weight = parseFloat(macroWeight.value);
        const height = parseFloat(macroHeight.value);
        const activityLevel = parseFloat(macroActivity.value);
        const goal = macroGoal.value;
        
        // التحقق من صحة القيم
        if (age < 15 || age > 100 || weight < 30 || weight > 300 || height < 100 || height > 250) {
            alert('يرجى إدخال قيم صحيحة');
            return;
        }
        
        // حساب معدل الأيض الأساسي (BMR) باستخدام معادلة Mifflin-St Jeor
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        
        // حساب إجمالي السعرات الحرارية اليومية (TDEE)
        let tdee = bmr * activityLevel;
        
        // تعديل السعرات حسب الهدف
        let calories;
        if (goal === 'cut') {
            calories = tdee * 0.85; // نقص 15% للتخسيس
        } else if (goal === 'bulk') {
            calories = tdee * 1.15; // زيادة 15% لبناء العضلات
        } else {
            calories = tdee; // الحفاظ على الوزن
        }
        
        // حساب توزيع العناصر الغذائية
        let proteinRatio, carbsRatio, fatRatio;
        
        if (goal === 'cut') {
            // للتخسيس: بروتين عالي، كربوهيدرات منخفضة، دهون متوسطة
            proteinRatio = 0.40; // 40% من السعرات
            fatRatio = 0.35; // 35% من السعرات
            carbsRatio = 0.25; // 25% من السعرات
        } else if (goal === 'bulk') {
            // لبناء العضلات: بروتين عالي، كربوهيدرات عالية، دهون منخفضة
            proteinRatio = 0.30; // 30% من السعرات
            carbsRatio = 0.50; // 50% من السعرات
            fatRatio = 0.20; // 20% من السعرات
        } else {
            // للحفاظ على الوزن: توزيع متوازن
            proteinRatio = 0.30; // 30% من السعرات
            carbsRatio = 0.40; // 40% من السعرات
            fatRatio = 0.30; // 30% من السعرات
        }
        
        // حساب السعرات من كل عنصر
        const proteinCals = calories * proteinRatio;
        const carbsCals = calories * carbsRatio;
        const fatCals = calories * fatRatio;
        
        // حساب الجرامات من كل عنصر
        const proteinGrams = proteinCals / 4; // البروتين = 4 سعرات/جرام
        const carbsGrams = carbsCals / 4; // الكربوهيدرات = 4 سعرات/جرام
        const fatGrams = fatCals / 9; // الدهون = 9 سعرات/جرام
        
        // عرض النتائج
        caloriesValue.textContent = Math.round(calories);
        proteinValue.textContent = Math.round(proteinGrams);
        carbsValue.textContent = Math.round(carbsGrams);
        fatValue.textContent = Math.round(fatGrams);
        proteinCalories.textContent = Math.round(proteinCals);
        carbsCalories.textContent = Math.round(carbsCals);
        fatCalories.textContent = Math.round(fatCals);
        
        // إنشاء أو تحديث المخطط الدائري
        createOrUpdateMacrosChart(proteinRatio, carbsRatio, fatRatio);
    });
    
    // إنشاء أو تحديث المخطط الدائري للعناصر الغذائية
    function createOrUpdateMacrosChart(proteinRatio, carbsRatio, fatRatio) {
        const ctx = document.getElementById('macros-chart-canvas').getContext('2d');
        
        // تحويل النسب إلى نسب مئوية للعرض
        const proteinPercent = Math.round(proteinRatio * 100);
        const carbsPercent = Math.round(carbsRatio * 100);
        const fatPercent = Math.round(fatRatio * 100);
        
        // إذا كان المخطط موجوداً بالفعل، قم بتدميره
        if (macrosChart) {
            macrosChart.destroy();
        }
        
        // إنشاء مخطط جديد
        macrosChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [`بروتين (${proteinPercent}%)`, `كربوهيدرات (${carbsPercent}%)`, `دهون (${fatPercent}%)`],
                datasets: [{
                    data: [proteinPercent, carbsPercent, fatPercent],
                    backgroundColor: ['#e74c3c', '#3498db', '#f39c12'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Cairo, sans-serif'
                            }
                        }
                    }
                }
            }
        });
    }
});

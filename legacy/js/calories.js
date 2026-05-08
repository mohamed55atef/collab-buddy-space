/**
 * ملف JavaScript لصفحة حساب السعرات الحرارية
 * يحتوي على وظائف حساب السعرات الحرارية ومؤشر كتلة الجسم وتوزيع العناصر الغذائية
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التبديل بين علامات التبويب
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر المضغوط
            button.classList.add('active');

            // إخفاء جميع محتويات التبويب
            tabContents.forEach(content => content.classList.remove('active'));

            // إظهار محتوى التبويب المطلوب
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // نموذج حساب السعرات الحرارية
    const caloriesForm = document.getElementById('calories-form');
    const caloriesResults = document.getElementById('calories-results');

    if (caloriesForm) {
        caloriesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCalories();
        });
    }

    // نموذج حساب مؤشر كتلة الجسم
    const bmiForm = document.getElementById('bmi-form');
    const bmiResults = document.getElementById('bmi-results');

    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMI();
        });
    }

    // نموذج حساب توزيع العناصر الغذائية
    const macrosForm = document.getElementById('macros-form');
    const macrosResults = document.getElementById('macros-results');
    let macrosChart;

    if (macrosForm) {
        macrosForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateMacros();
        });
    }

    // وظيفة حساب السعرات الحرارية
    function calculateCalories() {
        // الحصول على قيم المدخلات
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('age').value);
        const height = parseInt(document.getElementById('height').value);
        const weight = parseInt(document.getElementById('weight').value);
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;

        // التحقق من صحة المدخلات
        if (isNaN(age) || isNaN(height) || isNaN(weight) || isNaN(activity)) {
            showError('يرجى إدخال جميع البيانات المطلوبة بشكل صحيح');
            return;
        }

        // حساب معدل الأيض الأساسي (BMR) باستخدام معادلة Mifflin-St Jeor
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // حساب إجمالي السعرات اليومية (TDEE)
        const tdee = Math.round(bmr * activity);

        // حساب السعرات المطلوبة لتحقيق الهدف
        let goalCalories;
        switch (goal) {
            case 'lose':
                goalCalories = Math.round(tdee * 0.85); // نقص 15% للتخسيس
                break;
            case 'maintain':
                goalCalories = tdee; // الحفاظ على نفس السعرات
                break;
            case 'gain':
                goalCalories = Math.round(tdee * 1.15); // زيادة 15% لزيادة الوزن
                break;
            default:
                goalCalories = tdee;
        }

        // عرض النتائج
        document.getElementById('bmr-value').textContent = Math.round(bmr);
        document.getElementById('tdee-value').textContent = tdee;
        document.getElementById('goal-value').textContent = goalCalories;

        // إظهار قسم النتائج مع تأثير حركي
        caloriesResults.style.display = 'block';
        caloriesResults.classList.add('fade-in');

        // التمرير إلى قسم النتائج
        caloriesResults.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // حفظ النتائج في التخزين المحلي
        saveResults({
            gender,
            age,
            height,
            weight,
            activity,
            goal,
            bmr: Math.round(bmr),
            tdee,
            goalCalories
        });
    }

    // وظيفة عرض رسالة خطأ
    function showError(message, form = caloriesForm) {
        // إنشاء عنصر رسالة الخطأ
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        // إضافة رسالة الخطأ إلى النموذج
        const formActions = form.querySelector('.form-actions');
        form.insertBefore(errorDiv, formActions);

        // إزالة رسالة الخطأ بعد 3 ثوانٍ
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // وظيفة حفظ النتائج في التخزين المحلي
    function saveResults(data) {
        localStorage.setItem('caloriesData', JSON.stringify(data));
    }

    // وظيفة استرجاع النتائج من التخزين المحلي
    function loadResults() {
        const savedData = localStorage.getItem('caloriesData');
        if (savedData) {
            return JSON.parse(savedData);
        }
        return null;
    }

    // زر حفظ النتائج
    const saveResultsBtn = document.getElementById('save-results');
    if (saveResultsBtn) {
        saveResultsBtn.addEventListener('click', function() {
            // إنشاء رسالة تأكيد
            const confirmDiv = document.createElement('div');
            confirmDiv.className = 'confirm-message';
            confirmDiv.textContent = 'تم حفظ النتائج بنجاح!';

            // إضافة رسالة التأكيد إلى قسم النتائج
            const resultsNote = document.querySelector('.results-note');
            resultsNote.appendChild(confirmDiv);

            // إزالة رسالة التأكيد بعد 3 ثوانٍ
            setTimeout(() => {
                confirmDiv.remove();
            }, 3000);
        });
    }

    // وظيفة حساب مؤشر كتلة الجسم
    function calculateBMI() {
        // الحصول على قيم المدخلات
        const weight = parseFloat(document.getElementById('bmi-weight').value);
        const height = parseFloat(document.getElementById('bmi-height').value) / 100; // تحويل من سم إلى متر

        // التحقق من صحة المدخلات
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            showError('يرجى إدخال قيم صحيحة للوزن والطول', bmiForm);
            return;
        }

        // حساب مؤشر كتلة الجسم
        const bmi = weight / (height * height);

        // تحديد فئة مؤشر كتلة الجسم
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

        // عرض النتائج
        document.getElementById('bmi-value').textContent = bmi.toFixed(1);

        const categoryElement = document.getElementById('bmi-category');
        categoryElement.textContent = category;

        // إزالة جميع فئات الألوان
        categoryElement.classList.remove('bmi-category-underweight', 'bmi-category-normal', 'bmi-category-overweight', 'bmi-category-obese');

        // إضافة فئة اللون المناسبة
        categoryElement.classList.add(categoryClass);

        // إظهار قسم النتائج مع تأثير حركي
        bmiResults.style.display = 'block';
        bmiResults.classList.add('fade-in');

        // التمرير إلى قسم النتائج
        bmiResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // وظيفة حساب توزيع العناصر الغذائية
    function calculateMacros() {
        // الحصول على قيم المدخلات
        const gender = document.querySelector('input[name="macro-gender"]:checked').value;
        const age = parseInt(document.getElementById('macro-age').value);
        const height = parseInt(document.getElementById('macro-height').value);
        const weight = parseInt(document.getElementById('macro-weight').value);
        const activity = parseFloat(document.getElementById('macro-activity').value);
        const goal = document.getElementById('macro-goal').value;

        // التحقق من صحة المدخلات
        if (isNaN(age) || isNaN(height) || isNaN(weight) || isNaN(activity)) {
            showError('يرجى إدخال جميع البيانات المطلوبة بشكل صحيح', macrosForm);
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
        let tdee = bmr * activity;

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
        document.getElementById('calories-value').textContent = Math.round(calories);
        document.getElementById('protein-value').textContent = Math.round(proteinGrams);
        document.getElementById('carbs-value').textContent = Math.round(carbsGrams);
        document.getElementById('fat-value').textContent = Math.round(fatGrams);
        document.getElementById('protein-calories').textContent = Math.round(proteinCals);
        document.getElementById('carbs-calories').textContent = Math.round(carbsCals);
        document.getElementById('fat-calories').textContent = Math.round(fatCals);

        // إنشاء أو تحديث المخطط الدائري
        createOrUpdateMacrosChart(proteinRatio, carbsRatio, fatRatio);

        // إظهار قسم النتائج مع تأثير حركي
        macrosResults.style.display = 'block';
        macrosResults.classList.add('fade-in');

        // التمرير إلى قسم النتائج
        macrosResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // وظيفة إنشاء أو تحديث المخطط الدائري للعناصر الغذائية
    function createOrUpdateMacrosChart(proteinRatio, carbsRatio, fatRatio) {
        const ctx = document.getElementById('macros-chart').getContext('2d');

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
                            },
                            color: '#f5f5f5'
                        }
                    }
                }
            }
        });
    }


    // تحميل النتائج المحفوظة عند فتح الصفحة
    const savedData = loadResults();
    if (savedData && caloriesForm) {
        // ملء النموذج بالبيانات المحفوظة
        document.querySelector(`input[name="gender"][value="${savedData.gender}"]`).checked = true;
        document.getElementById('age').value = savedData.age;
        document.getElementById('height').value = savedData.height;
        document.getElementById('weight').value = savedData.weight;
        document.getElementById('activity').value = savedData.activity;
        document.getElementById('goal').value = savedData.goal;

        // عرض النتائج المحفوظة
        document.getElementById('bmr-value').textContent = savedData.bmr;
        document.getElementById('tdee-value').textContent = savedData.tdee;
        document.getElementById('goal-value').textContent = savedData.goalCalories;

        // إظهار قسم النتائج
        caloriesResults.style.display = 'block';
    }
});

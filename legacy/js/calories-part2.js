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

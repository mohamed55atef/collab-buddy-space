    // إظهار إشعار
    function showNotification(message, type = 'info') {
        // التحقق من وجود عنصر الإشعارات
        let notifications = document.querySelector('.notifications');
        
        // إنشاء عنصر الإشعارات إذا لم يكن موجوداً
        if (!notifications) {
            notifications = document.createElement('div');
            notifications.className = 'notifications';
            document.body.appendChild(notifications);
        }
        
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // تحديد الأيقونة حسب نوع الإشعار
        let icon;
        switch (type) {
            case 'success':
                icon = 'check-circle';
                break;
            case 'error':
                icon = 'exclamation-circle';
                break;
            case 'warning':
                icon = 'exclamation-triangle';
                break;
            default:
                icon = 'info-circle';
        }
        
        // إنشاء محتوى الإشعار
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <p>${message}</p>
        `;
        
        // إضافة الإشعار إلى حاوية الإشعارات
        notifications.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // إخفاء الإشعار بعد 5 ثوانٍ
        setTimeout(() => {
            notification.classList.remove('show');
            
            // إزالة الإشعار من DOM بعد انتهاء الرسوم المتحركة
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // تنسيق التاريخ
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('ar-EG', options);
    }
    
    // تنسيق الوقت
    function formatTime(time) {
        return time.replace(/(\d+):(\d+)/, '$1:$2');
    }
    
    // اقتطاع النص
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        
        return text.substring(0, maxLength) + '...';
    }
    
    // تحويل السعرات الحرارية إلى كيلو جول
    function caloriesToKilojoules(calories) {
        return Math.round(calories * 4.184);
    }
    
    // تحويل كيلو جول إلى سعرات حرارية
    function kilojoulesToCalories(kilojoules) {
        return Math.round(kilojoules / 4.184);
    }
    
    // حساب مؤشر كتلة الجسم
    function calculateBMI(weight, height) {
        // تحويل الطول من سم إلى متر
        const heightInMeters = height / 100;
        
        // حساب مؤشر كتلة الجسم
        const bmi = weight / (heightInMeters * heightInMeters);
        
        // تقريب النتيجة إلى رقمين عشريين
        return Math.round(bmi * 100) / 100;
    }
    
    // تصنيف مؤشر كتلة الجسم
    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return 'نقص في الوزن';
        } else if (bmi < 25) {
            return 'وزن طبيعي';
        } else if (bmi < 30) {
            return 'زيادة في الوزن';
        } else if (bmi < 35) {
            return 'سمنة درجة أولى';
        } else if (bmi < 40) {
            return 'سمنة درجة ثانية';
        } else {
            return 'سمنة مفرطة';
        }
    }
    
    // حساب معدل الأيض الأساسي (Mifflin-St Jeor)
    function calculateBMR(weight, height, age, gender) {
        if (gender === 'male') {
            return 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            return 10 * weight + 6.25 * height - 5 * age - 161;
        }
    }
    
    // حساب السعرات الحرارية اليومية
    function calculateTDEE(bmr, activityLevel) {
        const activityMultipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'active': 1.725,
            'very-active': 1.9
        };
        
        return Math.round(bmr * activityMultipliers[activityLevel]);
    }
    
    // حساب توزيع العناصر الغذائية
    function calculateMacros(calories, ratio) {
        // نسب البروتين والدهون والكربوهيدرات
        const proteinRatio = ratio.protein / 100;
        const fatRatio = ratio.fat / 100;
        const carbRatio = ratio.carbs / 100;
        
        // حساب السعرات الحرارية لكل عنصر غذائي
        const proteinCalories = calories * proteinRatio;
        const fatCalories = calories * fatRatio;
        const carbCalories = calories * carbRatio;
        
        // حساب الجرامات (البروتين والكربوهيدرات = 4 سعرات/جرام، الدهون = 9 سعرات/جرام)
        const protein = Math.round(proteinCalories / 4);
        const fat = Math.round(fatCalories / 9);
        const carbs = Math.round(carbCalories / 4);
        
        return {
            protein,
            fat,
            carbs
        };
    }
    
    // تصدير الوظائف العامة
    window.showNotification = showNotification;
    window.formatDate = formatDate;
    window.formatTime = formatTime;
    window.truncateText = truncateText;
    window.caloriesToKilojoules = caloriesToKilojoules;
    window.kilojoulesToCalories = kilojoulesToCalories;
    window.calculateBMI = calculateBMI;
    window.getBMICategory = getBMICategory;
    window.calculateBMR = calculateBMR;
    window.calculateTDEE = calculateTDEE;
    window.calculateMacros = calculateMacros;
});

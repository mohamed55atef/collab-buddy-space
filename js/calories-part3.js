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
    function showError(message) {
        // إنشاء عنصر رسالة الخطأ
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // إضافة رسالة الخطأ إلى النموذج
        const formActions = document.querySelector('.form-actions');
        caloriesForm.insertBefore(errorDiv, formActions);
        
        // إزالة رسالة الخطأ بعد 3 ثوانٍ
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

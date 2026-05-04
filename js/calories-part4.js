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
    
    // تحميل النتائج المحفوظة عند فتح الصفحة
    const savedData = loadResults();
    if (savedData) {
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

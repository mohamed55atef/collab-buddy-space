/**
 * ملف JavaScript لوظيفة حذف التمارين من جدول التمارين
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // وظيفة حذف تمرين من الجدول
    window.deleteExercise = function(exerciseId, dayName) {
        console.log('حذف التمرين:', exerciseId, 'من اليوم:', dayName);
        
        try {
            // الحصول على خطة التمرين من التخزين المحلي
            const savedPlan = localStorage.getItem('workoutPlan');
            if (!savedPlan) {
                console.error('لم يتم العثور على خطة تمرين محفوظة');
                showMessage('لم يتم العثور على خطة تمرين محفوظة', 'error');
                return;
            }
            
            // تحويل البيانات من JSON إلى كائن JavaScript
            const workoutPlan = JSON.parse(savedPlan);
            
            // التحقق من وجود اليوم في الجدول
            if (!workoutPlan.schedule || !workoutPlan.schedule[dayName]) {
                console.error('لم يتم العثور على اليوم في جدول التمارين:', dayName);
                showMessage('لم يتم العثور على اليوم في جدول التمارين', 'error');
                return;
            }
            
            // التحقق من وجود التمارين في اليوم
            if (!workoutPlan.schedule[dayName].exercises || !Array.isArray(workoutPlan.schedule[dayName].exercises)) {
                console.error('لم يتم العثور على تمارين في اليوم:', dayName);
                showMessage('لم يتم العثور على تمارين في اليوم', 'error');
                return;
            }
            
            // البحث عن التمرين في قائمة التمارين
            const exerciseIndex = workoutPlan.schedule[dayName].exercises.findIndex(ex => ex.id === exerciseId);
            if (exerciseIndex === -1) {
                console.error('لم يتم العثور على التمرين في اليوم:', dayName);
                showMessage('لم يتم العثور على التمرين في اليوم', 'error');
                return;
            }
            
            // حذف التمرين من القائمة
            workoutPlan.schedule[dayName].exercises.splice(exerciseIndex, 1);
            
            // حفظ التغييرات في التخزين المحلي
            localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
            
            // حذف التمرين من العرض
            const exerciseElement = document.querySelector(`.exercise-item[data-id="${exerciseId}"]`);
            if (exerciseElement) {
                exerciseElement.remove();
            }
            
            // عرض رسالة نجاح
            showMessage('تم حذف التمرين بنجاح', 'success');
            
            console.log('تم حذف التمرين بنجاح');
            return true;
        } catch (error) {
            console.error('حدث خطأ أثناء حذف التمرين:', error);
            showMessage('حدث خطأ أثناء حذف التمرين', 'error');
            return false;
        }
    };
    
    // وظيفة عرض رسالة للمستخدم
    function showMessage(message, type = 'success') {
        // إنشاء عنصر الرسالة
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'confirm-message' : 'error-message';
        messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        
        // إضافة الرسالة إلى الصفحة
        document.body.appendChild(messageDiv);
        
        // إزالة الرسالة بعد 3 ثوانٍ
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
});

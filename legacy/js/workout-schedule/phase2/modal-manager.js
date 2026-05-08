/**
 * ملف إدارة النوافذ المنبثقة لصفحة جدول التمارين
 * يحتوي على وظائف فتح وإغلاق النوافذ المنبثقة
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن إدارة النوافذ المنبثقة
window.workoutScheduleApp.modalManager = {
    // اليوم الحالي الذي يتم تعديله
    currentDayEditing: null,
    
    // فتح نافذة اختيار التمارين
    openExerciseModal: function(dayName) {
        // تحديث اليوم الحالي الذي يتم تعديله
        this.currentDayEditing = dayName;
        
        // تصفية التمارين حسب المعدات المتاحة
        const equipment = window.workoutScheduleApp.scheduleCreator.currentSchedule.equipment;
        const filteredExercises = window.workoutScheduleApp.dataLoader.getExercisesByEquipment(equipment);
        
        // عرض التمارين في النافذة
        window.workoutScheduleApp.ui.displayExercisesInModal(filteredExercises);
        
        // فتح النافذة
        window.workoutScheduleApp.ui.elements.exerciseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // إضافة مستمعي الأحداث للنافذة
        this.addModalEventListeners();
    },
    
    // إغلاق نافذة اختيار التمارين
    closeExerciseModal: function() {
        window.workoutScheduleApp.ui.elements.exerciseModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // إعادة تعيين اليوم الحالي
        this.currentDayEditing = null;
    },
    
    // إضافة مستمعي الأحداث للنافذة
    addModalEventListeners: function() {
        // زر البحث
        window.workoutScheduleApp.ui.elements.searchBtn.addEventListener('click', this.searchExercises.bind(this));
        
        // البحث عند الضغط على Enter
        window.workoutScheduleApp.ui.elements.exerciseSearch.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.searchExercises();
            }
        });
        
        // تغيير تصفية العضلات
        window.workoutScheduleApp.ui.elements.muscleFilter.addEventListener('change', this.searchExercises.bind(this));
    },
    
    // البحث عن تمارين
    searchExercises: function() {
        const searchTerm = window.workoutScheduleApp.ui.elements.exerciseSearch.value.trim();
        const muscle = window.workoutScheduleApp.ui.elements.muscleFilter.value;
        const equipment = window.workoutScheduleApp.scheduleCreator.currentSchedule.equipment;
        
        // تصفية التمارين
        const filteredExercises = window.workoutScheduleApp.exerciseFilter.filterExercises(searchTerm, muscle, equipment);
        
        // عرض التمارين المصفاة
        window.workoutScheduleApp.ui.displayExercisesInModal(filteredExercises);
    },
    
    // فتح نافذة تفاصيل التمرين
    openExerciseDetailsModal: function(exercise) {
        // إنشاء نافذة تفاصيل التمرين
        const modalHTML = `
            <div class="modal exercise-details-modal" id="exercise-details-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">تفاصيل التمرين</h2>
                        <button class="modal-close" id="details-modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="exercise-details-header">
                            <h3 class="exercise-details-name">${exercise.name}</h3>
                            <div class="exercise-details-meta">
                                <div class="exercise-details-meta-item">
                                    <i class="fas fa-dumbbell"></i>
                                    <span>${window.workoutScheduleApp.utils.getMuscleNameArabic(exercise.muscle)}</span>
                                </div>
                                <div class="exercise-details-meta-item">
                                    <i class="fas fa-weight"></i>
                                    <span>${window.workoutScheduleApp.utils.getEquipmentNameArabic(exercise.equipment)}</span>
                                </div>
                                <div class="exercise-details-meta-item">
                                    <i class="fas fa-signal"></i>
                                    <span>${window.workoutScheduleApp.utils.getDifficultyNameArabic(exercise.difficulty)}</span>
                                </div>
                            </div>
                        </div>
                        
                        ${exercise.description ? `
                            <div class="exercise-details-description">
                                <p>${exercise.description}</p>
                            </div>
                        ` : ''}
                        
                        ${exercise.instructions && exercise.instructions.length > 0 ? `
                            <div class="exercise-details-instructions">
                                <h3>طريقة التنفيذ</h3>
                                <ol>
                                    ${exercise.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                                </ol>
                            </div>
                        ` : ''}
                        
                        ${exercise.tips && exercise.tips.length > 0 ? `
                            <div class="exercise-details-tips">
                                <h3>نصائح</h3>
                                <ul>
                                    ${exercise.tips.map(tip => `<li>${tip}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="details-modal-close-btn">إغلاق</button>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة النافذة إلى الصفحة
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // الحصول على عناصر النافذة
        const detailsModal = document.getElementById('exercise-details-modal');
        const detailsModalClose = document.getElementById('details-modal-close');
        const detailsModalCloseBtn = document.getElementById('details-modal-close-btn');
        
        // فتح النافذة
        detailsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // إضافة مستمعي الأحداث للنافذة
        detailsModalClose.addEventListener('click', () => {
            this.closeExerciseDetailsModal(detailsModal);
        });
        
        detailsModalCloseBtn.addEventListener('click', () => {
            this.closeExerciseDetailsModal(detailsModal);
        });
        
        // إغلاق النافذة عند النقر خارجها
        detailsModal.addEventListener('click', (event) => {
            if (event.target === detailsModal) {
                this.closeExerciseDetailsModal(detailsModal);
            }
        });
    },
    
    // إغلاق نافذة تفاصيل التمرين
    closeExerciseDetailsModal: function(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // إزالة النافذة من الصفحة بعد انتهاء الرسوم المتحركة
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
};

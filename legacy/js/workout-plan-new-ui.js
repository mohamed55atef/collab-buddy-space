/**
 * ملف واجهة المستخدم لصفحة جدول التمارين
 * يحتوي على وظائف عرض وتحديث واجهة المستخدم
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة لواجهة المستخدم
    window.workoutApp = window.workoutApp || {};
    window.workoutApp.ui = {
        // عناصر DOM
        elements: {
            goalCards: document.querySelectorAll('.goal-card'),
            generatePlanBtn: document.getElementById('generate-plan-btn'),
            experienceLevel: document.getElementById('experience-level'),
            daysPerWeek: document.getElementById('days-per-week'),
            workoutDuration: document.getElementById('workout-duration'),
            equipmentCheckboxes: document.querySelectorAll('input[name="equipment"]'),
            workoutPlanSection: document.getElementById('workout-plan'),
            workoutDaysContainer: document.getElementById('workout-days'),
            planGoalValue: document.getElementById('plan-goal-value'),
            planLevelValue: document.getElementById('plan-level-value'),
            planDaysValue: document.getElementById('plan-days-value'),
            editPlanBtn: document.getElementById('edit-plan-btn'),
            savePlanBtn: document.getElementById('save-plan-btn'),
            printPlanBtn: document.getElementById('print-plan-btn'),
            exerciseModal: document.getElementById('exercise-modal'),
            modalClose: document.getElementById('modal-close'),
            modalCloseBtn: document.getElementById('modal-close-btn'),
            exerciseSearch: document.getElementById('exercise-search'),
            searchBtn: document.getElementById('search-btn'),
            muscleFilter: document.getElementById('muscle-filter'),
            exerciseList: document.getElementById('exercise-list'),
            loadingOverlay: document.getElementById('loading-overlay')
        },
        
        // عرض خطة التمرين
        displayWorkoutPlan: function() {
            const workoutPlan = window.workoutApp.data.workoutPlan;
            
            if (!workoutPlan || !workoutPlan.schedule) {
                console.error('لا توجد خطة تمرين لعرضها');
                return;
            }
            
            // تحديث معلومات الخطة
            this.elements.planGoalValue.textContent = window.workoutApp.utils.getGoalName(workoutPlan.goal);
            this.elements.planLevelValue.textContent = window.workoutApp.utils.getLevelName(workoutPlan.level);
            this.elements.planDaysValue.textContent = `${workoutPlan.days} أيام`;
            
            // إنشاء أيام التمرين
            let daysHTML = '';
            
            Object.keys(workoutPlan.schedule).forEach(dayName => {
                const day = workoutPlan.schedule[dayName];
                
                daysHTML += `
                    <div class="workout-day">
                        <div class="day-header">
                            <h3 class="day-title">${dayName} - ${day.focusArea}</h3>
                            <button class="btn btn-primary add-exercise-btn" data-day="${dayName}">
                                <i class="fas fa-plus"></i> إضافة تمرين
                            </button>
                        </div>
                        <div class="exercises-list">
                `;
                
                if (day.exercises && day.exercises.length > 0) {
                    day.exercises.forEach(exercise => {
                        daysHTML += `
                            <div class="exercise-item" data-id="${exercise.id}">
                                <div class="exercise-info">
                                    <h4 class="exercise-name">${exercise.name}</h4>
                                    <div class="exercise-details">
                                        <span class="exercise-muscle">${window.workoutApp.utils.getMuscleNameArabic(exercise.muscle)}</span>
                                        <span class="exercise-equipment">${window.workoutApp.utils.getEquipmentNameArabic(exercise.equipment)}</span>
                                    </div>
                                </div>
                                <div class="exercise-sets-reps">
                                    <span class="sets">${exercise.sets} مجموعات</span>
                                    <span class="reps">${exercise.reps} تكرار</span>
                                </div>
                                <div class="exercise-actions">
                                    <button class="btn btn-icon view-exercise-btn" data-id="${exercise.id}" onclick="window.workoutApp.actions.viewExerciseDetails('${exercise.id}')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-icon remove-exercise-btn" data-id="${exercise.id}" onclick="window.workoutApp.actions.removeExercise('${exercise.id}', '${dayName}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    daysHTML += `
                        <div class="no-exercises">
                            <p>لا توجد تمارين مضافة لهذا اليوم</p>
                        </div>
                    `;
                }
                
                daysHTML += `
                        </div>
                    </div>
                `;
            });
            
            this.elements.workoutDaysContainer.innerHTML = daysHTML;
            
            // إضافة مستمعي الأحداث لأزرار إضافة تمرين
            const addExerciseBtns = document.querySelectorAll('.add-exercise-btn');
            addExerciseBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const dayName = this.getAttribute('data-day');
                    window.workoutApp.actions.openExerciseModal(dayName);
                });
            });
        },
        
        // عرض التمارين في النافذة المنبثقة
        displayExercisesInModal: function(exercises) {
            let exercisesHTML = '';
            
            if (exercises.length === 0) {
                exercisesHTML = `
                    <div class="no-exercises">
                        <p>لا توجد تمارين متطابقة مع معايير البحث</p>
                    </div>
                `;
            } else {
                exercises.forEach(exercise => {
                    exercisesHTML += `
                        <div class="modal-exercise-item" data-id="${exercise.id}">
                            <div class="exercise-info">
                                <h4 class="exercise-name">${exercise.name}</h4>
                                <div class="exercise-details">
                                    <span class="exercise-muscle">${window.workoutApp.utils.getMuscleNameArabic(exercise.muscle)}</span>
                                    <span class="exercise-equipment">${window.workoutApp.utils.getEquipmentNameArabic(exercise.equipment)}</span>
                                    <span class="exercise-difficulty">${window.workoutApp.utils.getDifficultyNameArabic(exercise.difficulty)}</span>
                                </div>
                            </div>
                            <button class="btn btn-primary add-to-plan-btn" data-id="${exercise.id}" onclick="window.workoutApp.actions.addExerciseToPlan('${exercise.id}')">
                                <i class="fas fa-plus"></i> إضافة
                            </button>
                        </div>
                    `;
                });
            }
            
            this.elements.exerciseList.innerHTML = exercisesHTML;
        },
        
        // إظهار قسم خطة التمرين
        showPlanSection: function() {
            this.elements.workoutPlanSection.style.display = 'block';
        },
        
        // إخفاء قسم خطة التمرين
        hidePlanSection: function() {
            this.elements.workoutPlanSection.style.display = 'none';
        },
        
        // فتح نافذة اختيار التمارين
        openExerciseModal: function() {
            this.elements.exerciseModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        },
        
        // إغلاق نافذة اختيار التمارين
        closeExerciseModal: function() {
            this.elements.exerciseModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        },
        
        // عرض رسالة للمستخدم
        showMessage: function(message, type = 'success') {
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
        },
        
        // إظهار شاشة التحميل
        showLoading: function() {
            this.elements.loadingOverlay.classList.add('active');
        },
        
        // إخفاء شاشة التحميل
        hideLoading: function() {
            this.elements.loadingOverlay.classList.remove('active');
        }
    };
});

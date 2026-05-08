/**
 * ملف عرض واجهة المستخدم لصفحة جدول التمارين
 * يحتوي على وظائف عرض وتحديث واجهة المستخدم
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن عرض واجهة المستخدم
window.workoutScheduleApp.ui = {
    // عناصر DOM
    elements: {
        goalCards: document.querySelectorAll('.goal-card'),
        generateScheduleBtn: document.getElementById('generate-schedule-btn'),
        experienceLevel: document.getElementById('experience-level'),
        daysPerWeek: document.getElementById('days-per-week'),
        workoutDuration: document.getElementById('workout-duration'),
        equipmentCheckboxes: document.querySelectorAll('input[name="equipment"]'),
        workoutScheduleSection: document.getElementById('workout-schedule'),
        workoutDaysContainer: document.getElementById('workout-days'),
        scheduleGoalValue: document.getElementById('schedule-goal-value'),
        scheduleLevelValue: document.getElementById('schedule-level-value'),
        scheduleDaysValue: document.getElementById('schedule-days-value'),
        editScheduleBtn: document.getElementById('edit-schedule-btn'),
        saveScheduleBtn: document.getElementById('save-schedule-btn'),
        printScheduleBtn: document.getElementById('print-schedule-btn'),
        exerciseModal: document.getElementById('exercise-modal'),
        modalClose: document.getElementById('modal-close'),
        modalCloseBtn: document.getElementById('modal-close-btn'),
        exerciseSearch: document.getElementById('exercise-search'),
        searchBtn: document.getElementById('search-btn'),
        muscleFilter: document.getElementById('muscle-filter'),
        exerciseList: document.getElementById('exercise-list'),
        loadingOverlay: document.getElementById('loading-overlay')
    },
    
    // عرض جدول التمارين
    displayWorkoutSchedule: function() {
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule) {
            console.error('لا يوجد جدول تمارين لعرضه');
            return;
        }
        
        // تحديث معلومات الجدول
        this.elements.scheduleGoalValue.textContent = window.workoutScheduleApp.utils.getGoalName(schedule.goal);
        this.elements.scheduleLevelValue.textContent = window.workoutScheduleApp.utils.getLevelName(schedule.level);
        this.elements.scheduleDaysValue.textContent = `${schedule.days} أيام`;
        
        // إنشاء أيام التمرين
        let daysHTML = '';
        
        Object.keys(schedule.schedule).forEach(dayName => {
            const day = schedule.schedule[dayName];
            
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
                                    <span class="exercise-muscle">${window.workoutScheduleApp.utils.getMuscleNameArabic(exercise.muscle)}</span>
                                    <span class="exercise-equipment">${window.workoutScheduleApp.utils.getEquipmentNameArabic(exercise.equipment)}</span>
                                </div>
                            </div>
                            <div class="exercise-sets-reps">
                                <span class="sets">${exercise.sets} مجموعات</span>
                                <span class="reps">${exercise.reps} تكرار</span>
                            </div>
                            <div class="exercise-actions">
                                <button class="btn btn-icon view-exercise-btn" data-id="${exercise.id}">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-icon remove-exercise-btn" data-id="${exercise.id}" data-day="${dayName}">
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
        
        // إضافة مستمعي الأحداث للأزرار
        this.addEventListenersToButtons();
    },
    
    // إضافة مستمعي الأحداث للأزرار
    addEventListenersToButtons: function() {
        // أزرار إضافة تمرين
        const addExerciseBtns = document.querySelectorAll('.add-exercise-btn');
        addExerciseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const dayName = this.getAttribute('data-day');
                window.workoutScheduleApp.modalManager.openExerciseModal(dayName);
            });
        });
        
        // أزرار عرض تفاصيل التمرين
        const viewExerciseBtns = document.querySelectorAll('.view-exercise-btn');
        viewExerciseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const exerciseId = this.getAttribute('data-id');
                window.workoutScheduleApp.exerciseManager.viewExerciseDetails(exerciseId);
            });
        });
        
        // أزرار حذف التمرين
        const removeExerciseBtns = document.querySelectorAll('.remove-exercise-btn');
        removeExerciseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const exerciseId = this.getAttribute('data-id');
                const dayName = this.getAttribute('data-day');
                window.workoutScheduleApp.exerciseManager.removeExercise(exerciseId, dayName);
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
                                <span class="exercise-muscle">${window.workoutScheduleApp.utils.getMuscleNameArabic(exercise.muscle)}</span>
                                <span class="exercise-equipment">${window.workoutScheduleApp.utils.getEquipmentNameArabic(exercise.equipment)}</span>
                                <span class="exercise-difficulty">${window.workoutScheduleApp.utils.getDifficultyNameArabic(exercise.difficulty)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary add-to-schedule-btn" data-id="${exercise.id}">
                            <i class="fas fa-plus"></i> إضافة
                        </button>
                    </div>
                `;
            });
        }
        
        this.elements.exerciseList.innerHTML = exercisesHTML;
        
        // إضافة مستمعي الأحداث لأزرار إضافة التمرين
        const addToScheduleBtns = document.querySelectorAll('.add-to-schedule-btn');
        addToScheduleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const exerciseId = this.getAttribute('data-id');
                window.workoutScheduleApp.exerciseManager.addExerciseToSchedule(exerciseId);
            });
        });
    },
    
    // إظهار قسم جدول التمارين
    showScheduleSection: function() {
        this.elements.workoutScheduleSection.style.display = 'block';
    },
    
    // إخفاء قسم جدول التمارين
    hideScheduleSection: function() {
        this.elements.workoutScheduleSection.style.display = 'none';
    },
    
    // عرض رسالة للمستخدم
    showMessage: function(message, type = 'success') {
        window.workoutScheduleApp.notificationManager.showNotification(message, type);
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

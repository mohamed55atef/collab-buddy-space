/**
 * ملف الإجراءات لصفحة جدول التمارين
 * يحتوي على وظائف معالجة الأحداث والتفاعلات
 */

// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة للإجراءات
    window.workoutApp = window.workoutApp || {};
    window.workoutApp.actions = {
        // اليوم الحالي الذي يتم تعديله
        currentDayEditing: null,

        // تهيئة الإجراءات
        init: function() {
            // إضافة مستمعي الأحداث
            this.setupEventListeners();

            // تحميل بيانات التمارين
            window.workoutApp.data.loadExerciseData();
        },

        // إعداد مستمعي الأحداث
        setupEventListeners: function() {
            const ui = window.workoutApp.ui;

            // اختيار هدف التمرين
            ui.elements.goalCards.forEach(card => {
                card.addEventListener('click', () => {
                    // إزالة الفئة النشطة من جميع البطاقات
                    ui.elements.goalCards.forEach(c => c.classList.remove('active'));

                    // إضافة الفئة النشطة للبطاقة المختارة
                    card.classList.add('active');

                    // تحديث الهدف المختار
                    window.workoutApp.data.selectedGoal = card.getAttribute('data-goal');
                });
            });

            // إنشاء خطة تمرين
            ui.elements.generatePlanBtn.addEventListener('click', () => {
                this.generateWorkoutPlan();
            });

            // تعديل الخطة
            ui.elements.editPlanBtn.addEventListener('click', () => {
                // هنا يمكن إضافة وظيفة تعديل الخطة
                ui.showMessage('ميزة تعديل الخطة قيد التطوير', 'error');
            });

            // حفظ الخطة
            ui.elements.savePlanBtn.addEventListener('click', () => {
                // حفظ الخطة في التخزين المحلي
                localStorage.setItem('workoutPlan', JSON.stringify(window.workoutApp.data.workoutPlan));
                ui.showMessage('تم حفظ الخطة بنجاح', 'success');
            });

            // طباعة الخطة
            ui.elements.printPlanBtn.addEventListener('click', () => {
                window.print();
            });

            // البحث عن تمارين
            ui.elements.searchBtn.addEventListener('click', () => {
                this.searchExercises();
            });

            // البحث عند الضغط على Enter
            ui.elements.exerciseSearch.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    this.searchExercises();
                }
            });

            // إغلاق النافذة المنبثقة
            ui.elements.modalClose.addEventListener('click', () => {
                ui.closeExerciseModal();
            });

            ui.elements.modalCloseBtn.addEventListener('click', () => {
                ui.closeExerciseModal();
            });

            // إغلاق النافذة المنبثقة عند النقر خارجها
            ui.elements.exerciseModal.addEventListener('click', (event) => {
                if (event.target === ui.elements.exerciseModal) {
                    ui.closeExerciseModal();
                }
            });
        },

        // إنشاء خطة تمرين
        generateWorkoutPlan: function() {
            const ui = window.workoutApp.ui;

            // التحقق من تحميل بيانات التمارين
            if (!window.workoutApp.data.allExercises || window.workoutApp.data.allExercises.length === 0) {
                console.error('لم يتم تحميل بيانات التمارين بعد');
                ui.showMessage('يرجى الانتظار حتى يتم تحميل بيانات التمارين', 'error');

                // إعادة تحميل بيانات التمارين
                window.workoutApp.data.loadExerciseData().then(success => {
                    if (success) {
                        // إعادة محاولة إنشاء خطة التمرين بعد تحميل البيانات
                        setTimeout(() => this.generateWorkoutPlan(), 1000);
                    }
                });
                return;
            }

            // الحصول على قيم الإعدادات
            const goal = window.workoutApp.data.selectedGoal;
            const level = ui.elements.experienceLevel.value;
            const days = parseInt(ui.elements.daysPerWeek.value);
            const duration = parseInt(ui.elements.workoutDuration.value);

            // الحصول على المعدات المختارة
            const equipment = Array.from(ui.elements.equipmentCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            // التحقق من اختيار معدات واحدة على الأقل
            if (equipment.length === 0) {
                ui.showMessage('يرجى اختيار نوع واحد على الأقل من المعدات المتاحة', 'error');
                return;
            }

            console.log('بدء إنشاء خطة التمرين:');
            console.log('الهدف:', goal);
            console.log('المستوى:', level);
            console.log('عدد الأيام:', days);
            console.log('المدة:', duration);
            console.log('المعدات:', equipment);
            console.log('عدد التمارين المتاحة:', window.workoutApp.data.allExercises.length);

            // إظهار شاشة التحميل
            ui.showLoading();

            // إنشاء خطة التمرين
            setTimeout(() => {
                try {
                    window.workoutApp.data.createWorkoutPlan(goal, level, days, duration, equipment);

                    // التحقق من إنشاء الخطة بنجاح
                    if (!window.workoutApp.data.workoutPlan || !window.workoutApp.data.workoutPlan.schedule) {
                        throw new Error('فشل في إنشاء خطة التمرين');
                    }

                    // التحقق من وجود أيام في الجدول
                    const daysCount = Object.keys(window.workoutApp.data.workoutPlan.schedule).length;
                    if (daysCount === 0) {
                        throw new Error('لم يتم إنشاء أي أيام في جدول التمارين');
                    }

                    console.log('تم إنشاء خطة التمرين بنجاح:');
                    console.log('عدد الأيام:', daysCount);
                    console.log('الخطة:', window.workoutApp.data.workoutPlan);

                    // عرض خطة التمرين
                    ui.displayWorkoutPlan();
                    ui.showPlanSection();

                    // إخفاء شاشة التحميل
                    ui.hideLoading();

                    // التمرير إلى قسم خطة التمرين
                    ui.elements.workoutPlanSection.scrollIntoView({ behavior: 'smooth' });

                    // عرض رسالة نجاح
                    ui.showMessage('تم إنشاء خطة التمرين بنجاح', 'success');
                } catch (error) {
                    console.error('حدث خطأ أثناء إنشاء خطة التمرين:', error);
                    ui.hideLoading();
                    ui.showMessage('حدث خطأ أثناء إنشاء خطة التمرين: ' + error.message, 'error');
                }
            }, 1000); // تأخير لإظهار شاشة التحميل
        },

        // فتح نافذة اختيار التمارين
        openExerciseModal: function(dayName) {
            const ui = window.workoutApp.ui;

            // تحديث اليوم الحالي الذي يتم تعديله
            this.currentDayEditing = dayName;

            // تصفية التمارين حسب المعدات المتاحة
            const equipment = window.workoutApp.data.workoutPlan.equipment;
            const filteredExercises = window.workoutApp.data.allExercises.filter(exercise =>
                equipment.includes(exercise.equipment)
            );

            // عرض التمارين في النافذة
            ui.displayExercisesInModal(filteredExercises);

            // فتح النافذة
            ui.openExerciseModal();
        },

        // البحث عن تمارين
        searchExercises: function() {
            const ui = window.workoutApp.ui;

            const searchTerm = ui.elements.exerciseSearch.value.trim().toLowerCase();
            const muscle = ui.elements.muscleFilter.value;

            // تصفية التمارين
            let filteredExercises = window.workoutApp.data.allExercises.filter(exercise => {
                const matchesSearch = exercise.name.toLowerCase().includes(searchTerm) ||
                                     (exercise.description && exercise.description.toLowerCase().includes(searchTerm));
                const matchesMuscle = muscle === 'all' || exercise.muscle === muscle;
                const matchesEquipment = window.workoutApp.data.workoutPlan.equipment.includes(exercise.equipment);

                return matchesSearch && matchesMuscle && matchesEquipment;
            });

            // عرض التمارين المصفاة
            ui.displayExercisesInModal(filteredExercises);
        },

        // إضافة تمرين إلى الخطة
        addExerciseToPlan: function(exerciseId) {
            const ui = window.workoutApp.ui;

            if (!this.currentDayEditing) {
                ui.showMessage('حدث خطأ: لم يتم تحديد اليوم', 'error');
                return;
            }

            // إضافة التمرين إلى الخطة
            const success = window.workoutApp.data.addExerciseToPlan(exerciseId, this.currentDayEditing);

            if (success) {
                // تحديث العرض
                ui.displayWorkoutPlan();

                // إغلاق النافذة
                ui.closeExerciseModal();

                // عرض رسالة نجاح
                ui.showMessage('تم إضافة التمرين بنجاح', 'success');
            } else {
                ui.showMessage('حدث خطأ أثناء إضافة التمرين', 'error');
            }
        },

        // حذف تمرين من الخطة
        removeExercise: function(exerciseId, dayName) {
            const ui = window.workoutApp.ui;

            // حذف التمرين من الخطة
            const success = window.workoutApp.data.deleteExercise(exerciseId, dayName);

            if (success) {
                // تحديث العرض
                ui.displayWorkoutPlan();

                // عرض رسالة نجاح
                ui.showMessage('تم حذف التمرين بنجاح', 'success');
            } else {
                ui.showMessage('حدث خطأ أثناء حذف التمرين', 'error');
            }
        },

        // عرض تفاصيل التمرين
        viewExerciseDetails: function(exerciseId) {
            const exercise = window.workoutApp.data.allExercises.find(ex => ex.id === exerciseId);

            if (!exercise) {
                window.workoutApp.ui.showMessage('لم يتم العثور على معلومات التمرين', 'error');
                return;
            }

            // هنا يمكن إضافة كود لعرض تفاصيل التمرين في نافذة منبثقة
            alert(`
                اسم التمرين: ${exercise.name}
                العضلة المستهدفة: ${window.workoutApp.utils.getMuscleNameArabic(exercise.muscle)}
                المعدات: ${window.workoutApp.utils.getEquipmentNameArabic(exercise.equipment)}
                المستوى: ${window.workoutApp.utils.getDifficultyNameArabic(exercise.difficulty)}

                ${exercise.description || ''}
            `);
        }
    };

    // تهيئة الإجراءات
    window.workoutApp.actions.init();
});

    // إنشاء أزرار الصفحات
    function createPagination() {
        const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
        
        // إنشاء HTML لأزرار الصفحات
        let paginationHTML = '';
        
        // زر الصفحة السابقة
        paginationHTML += `
            <button class="pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        // أزرار الصفحات
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="pagination-btn page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }
        
        // زر الصفحة التالية
        paginationHTML += `
            <button class="pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // عرض أزرار الصفحات
        pagination.innerHTML = paginationHTML;
        
        // إضافة مستمعي الأحداث لأزرار الصفحات
        const pageButtons = document.querySelectorAll('.page-btn');
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                displayExercisesPage(currentPage);
                updatePaginationActive();
            });
        });
        
        // إضافة مستمعي الأحداث لزر الصفحة السابقة
        const prevButton = document.querySelector('.prev-btn');
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayExercisesPage(currentPage);
                updatePaginationActive();
            }
        });
        
        // إضافة مستمعي الأحداث لزر الصفحة التالية
        const nextButton = document.querySelector('.next-btn');
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                displayExercisesPage(currentPage);
                updatePaginationActive();
            }
        });
    }
    
    // تحديث حالة أزرار الصفحات
    function updatePaginationActive() {
        const pageButtons = document.querySelectorAll('.page-btn');
        pageButtons.forEach(button => {
            const page = parseInt(button.getAttribute('data-page'));
            if (page === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        const prevButton = document.querySelector('.prev-btn');
        const nextButton = document.querySelector('.next-btn');
        const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
        
        prevButton.disabled = currentPage === 1;
        prevButton.classList.toggle('disabled', currentPage === 1);
        
        nextButton.disabled = currentPage === totalPages;
        nextButton.classList.toggle('disabled', currentPage === totalPages);
    }
    
    // عرض تفاصيل التمرين
    function showExerciseDetails(exerciseId) {
        // البحث عن التمرين بواسطة المعرف
        const exercise = allExercises.find(exercise => exercise.id === exerciseId);
        
        if (exercise) {
            // تحديث عناصر النافذة المنبثقة
            document.getElementById('modal-exercise-name').textContent = exercise.name;
            
            // تحديد اسم العضلة بالعربية
            let muscleName = '';
            switch (exercise.muscle) {
                case 'chest':
                    muscleName = 'الصدر';
                    break;
                case 'back':
                    muscleName = 'الظهر';
                    break;
                case 'shoulders':
                    muscleName = 'الأكتاف';
                    break;
                case 'biceps':
                    muscleName = 'البايسبس';
                    break;
                case 'triceps':
                    muscleName = 'الترايسبس';
                    break;
                case 'legs':
                    muscleName = 'الأرجل';
                    break;
                case 'abs':
                    muscleName = 'البطن';
                    break;
                case 'cardio':
                    muscleName = 'القلب';
                    break;
            }
            
            document.getElementById('modal-muscle').textContent = muscleName;
            
            // تحديد اسم المعدات بالعربية
            let equipmentName = '';
            switch (exercise.equipment) {
                case 'barbell':
                    equipmentName = 'بار حديد';
                    break;
                case 'dumbbell':
                    equipmentName = 'دمبل';
                    break;
                case 'machine':
                    equipmentName = 'ماكينة';
                    break;
                case 'cable':
                    equipmentName = 'كيبل';
                    break;
                case 'bodyweight':
                    equipmentName = 'وزن الجسم';
                    break;
                case 'kettlebell':
                    equipmentName = 'كيتل بل';
                    break;
                case 'resistance-band':
                    equipmentName = 'مطاط مقاومة';
                    break;
            }
            
            document.getElementById('modal-equipment').textContent = equipmentName;
            
            // تحديد مستوى الصعوبة بالعربية
            let difficultyName = '';
            switch (exercise.difficulty) {
                case 'beginner':
                    difficultyName = 'مبتدئ';
                    break;
                case 'intermediate':
                    difficultyName = 'متوسط';
                    break;
                case 'advanced':
                    difficultyName = 'متقدم';
                    break;
            }
            
            document.getElementById('modal-difficulty').textContent = difficultyName;
            
            // تحديث وصف التمرين
            const descriptionElement = document.getElementById('modal-description');
            if (exercise.description) {
                descriptionElement.innerHTML = `<p>${exercise.description}</p>`;
                descriptionElement.style.display = 'block';
            } else {
                descriptionElement.style.display = 'none';
            }
            
            // تحديث خطوات التمرين
            const stepsElement = document.getElementById('modal-steps');
            stepsElement.innerHTML = '';
            
            if (exercise.steps && exercise.steps.length > 0) {
                exercise.steps.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    stepsElement.appendChild(li);
                });
            }
            
            // تحديث نصائح التمرين
            const tipsContainer = document.getElementById('modal-tips-container');
            const tipsElement = document.getElementById('modal-tips');
            tipsElement.innerHTML = '';
            
            if (exercise.tips && exercise.tips.length > 0) {
                exercise.tips.forEach(tip => {
                    const li = document.createElement('li');
                    li.textContent = tip;
                    tipsElement.appendChild(li);
                });
                tipsContainer.style.display = 'block';
            } else {
                tipsContainer.style.display = 'none';
            }
            
            // تحديث فيديو التمرين
            const videoElement = document.getElementById('modal-exercise-video');
            if (exercise.videoUrl) {
                // استخراج معرف الفيديو من رابط يوتيوب
                const videoId = getYoutubeVideoId(exercise.videoUrl);
                
                if (videoId) {
                    videoElement.innerHTML = `
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" 
                        title="${exercise.name}" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    `;
                    videoElement.style.display = 'block';
                } else {
                    videoElement.innerHTML = `<p>الفيديو غير متاح</p>`;
                    videoElement.style.display = 'block';
                }
            } else {
                videoElement.style.display = 'none';
            }
            
            // إضافة معرف التمرين إلى زر الإضافة إلى التمرين
            modalAddToWorkout.setAttribute('data-id', exerciseId);
            
            // عرض النافذة المنبثقة
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // استخراج معرف فيديو يوتيوب من الرابط
    function getYoutubeVideoId(url) {
        if (!url) return null;
        
        // محاولة مطابقة الرابط مع أنماط روابط يوتيوب المختلفة
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        
        return (match && match[2].length === 11) ? match[2] : null;
    }
    
    // إضافة مستمعي الأحداث
    
    // البحث
    searchBtn.addEventListener('click', function() {
        filterAndDisplayExercises();
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterAndDisplayExercises();
        }
    });
    
    // تصفية حسب العضلة
    muscleFilter.addEventListener('change', function() {
        filterAndDisplayExercises();
    });
    
    // تصفية حسب المعدات
    equipmentFilter.addEventListener('change', function() {
        filterAndDisplayExercises();
    });
    
    // بطاقات الفئات
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const muscle = this.getAttribute('data-muscle');
            muscleFilter.value = muscle;
            filterAndDisplayExercises();
        });
    });
    
    // إغلاق النافذة المنبثقة
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    modalCloseBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // إضافة إلى التمرين
    modalAddToWorkout.addEventListener('click', function() {
        const exerciseId = this.getAttribute('data-id');
        const exercise = allExercises.find(exercise => exercise.id === exerciseId);
        
        if (exercise) {
            // هنا يمكن إضافة التمرين إلى جدول التمارين
            // في هذا المثال، سنعرض رسالة تأكيد فقط
            alert(`تمت إضافة ${exercise.name} إلى جدول التمارين`);
            
            // إغلاق النافذة المنبثقة
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // تحميل بيانات التمارين عند تحميل الصفحة
    loadExerciseData();
});

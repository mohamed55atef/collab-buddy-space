/**
 * ملف الأدوات المساعدة لصفحة جدول التمارين
 * يحتوي على وظائف مساعدة مثل الترجمة والتحويل
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن الأدوات المساعدة
window.workoutScheduleApp.utils = {
    // الحصول على اسم الهدف بالعربية
    getGoalName: function(goal) {
        switch (goal) {
            case 'strength':
                return 'بناء العضلات';
            case 'weight-loss':
                return 'فقدان الوزن';
            case 'endurance':
                return 'تحسين اللياقة';
            case 'flexibility':
                return 'زيادة المرونة';
            default:
                return goal;
        }
    },
    
    // الحصول على اسم المستوى بالعربية
    getLevelName: function(level) {
        switch (level) {
            case 'beginner':
                return 'مبتدئ';
            case 'intermediate':
                return 'متوسط';
            case 'advanced':
                return 'متقدم';
            default:
                return level;
        }
    },
    
    // الحصول على اسم العضلة بالعربية
    getMuscleNameArabic: function(muscle) {
        switch (muscle) {
            case 'chest':
                return 'الصدر';
            case 'back':
                return 'الظهر';
            case 'shoulders':
                return 'الأكتاف';
            case 'biceps':
                return 'البايسبس';
            case 'triceps':
                return 'الترايسبس';
            case 'legs':
                return 'الأرجل';
            case 'abs':
                return 'البطن';
            case 'cardio':
                return 'القلب';
            default:
                return muscle;
        }
    },
    
    // الحصول على اسم المعدات بالعربية
    getEquipmentNameArabic: function(equipment) {
        switch (equipment) {
            case 'barbell':
                return 'بار حديد';
            case 'dumbbell':
                return 'دمبل';
            case 'machine':
                return 'ماكينة';
            case 'cable':
                return 'كيبل';
            case 'bodyweight':
                return 'وزن الجسم';
            case 'kettlebell':
                return 'كيتل بل';
            case 'resistance-band':
                return 'مطاط مقاومة';
            default:
                return equipment;
        }
    },
    
    // الحصول على اسم مستوى الصعوبة بالعربية
    getDifficultyNameArabic: function(difficulty) {
        switch (difficulty) {
            case 'beginner':
                return 'مبتدئ';
            case 'intermediate':
                return 'متوسط';
            case 'advanced':
                return 'متقدم';
            default:
                return difficulty;
        }
    },
    
    // تنسيق التاريخ بالعربية
    formatDate: function(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('ar-EG', options);
    },
    
    // تحويل عدد الدقائق إلى ساعات ودقائق
    formatDuration: function(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours === 0) {
            return `${mins} دقيقة`;
        } else if (mins === 0) {
            return `${hours} ساعة`;
        } else {
            return `${hours} ساعة و ${mins} دقيقة`;
        }
    },
    
    // إنشاء معرف فريد
    generateUniqueId: function() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    },
    
    // تحويل النص إلى نص آمن للاستخدام في HTML
    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    },
    
    // تحويل النص إلى نص آمن للاستخدام في URL
    slugify: function(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // استبدال المسافات بشرطة
            .replace(/[^\w\-]+/g, '')       // إزالة جميع الأحرف غير الكلمات
            .replace(/\-\-+/g, '-')         // استبدال الشرطات المتعددة بشرطة واحدة
            .replace(/^-+/, '')             // إزالة الشرطات من بداية النص
            .replace(/-+$/, '');            // إزالة الشرطات من نهاية النص
    }
};

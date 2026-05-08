/**
 * قاعدة بيانات الخضروات
 */

// تصدير مصفوفة الخضروات
const vegetables1 = [
    {
        id: "veg-001",
        name: "خيار (نيء)",
        calories: 16,
        protein: 0.7,
        carbs: 3.6,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "خضار مائي منعش، يُستخدم في السلطات أو كوجبة خفيفة بين الوجبات."
    },
    {
        id: "veg-002",
        name: "طماطم (نيئة)",
        calories: 18,
        protein: 0.9,
        carbs: 3.9,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "مصدر غني بفيتامين C والليكوبين، أساس في المطبخ المصري."
    },
    {
        id: "veg-003",
        name: "جزر (نيء)",
        calories: 41,
        protein: 0.9,
        carbs: 10,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "غني ببيتا كاروتين (فيتامين A)، يُؤكل نيئاً أو مطهياً."
    },
    {
        id: "veg-004",
        name: "كوسة (مسلوقة)",
        calories: 17,
        protein: 1.2,
        carbs: 3.1,
        fat: 0.3,
        serving: "100 جرام",
        category: "vegetables",
        description: "خضار خفيف ومنخفض السعرات، يُستخدم في الشوربات والمحاشي."
    },
    {
        id: "veg-005",
        name: "باذنجان (مشوي)",
        calories: 25,
        protein: 1,
        carbs: 6,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في الأطباق المصرية مثل المقلوبة والمسقعة — المشوي أفضل صحياً."
    },
    {
        id: "veg-006",
        name: "فلفل أخضر رومي (نيء)",
        calories: 20,
        protein: 0.9,
        carbs: 4.6,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "غني بفيتامين C، يُستخدم في السلطات والمحاشي والسوتيه."
    },
    {
        id: "veg-007",
        name: "فلفل أحمر رومي (نيء)",
        calories: 31,
        protein: 1,
        carbs: 6,
        fat: 0.3,
        serving: "100 جرام",
        category: "vegetables",
        description: "أعلى في فيتامين C من البرتقال، ممتاز للمناعة والبشرة."
    },
    {
        id: "veg-008",
        name: "بصل (نيء)",
        calories: 40,
        protein: 1.1,
        carbs: 9,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في كل الأطباق تقريباً، له فوائد مضادة للالتهابات."
    },
    {
        id: "veg-009",
        name: "ثوم (نيء)",
        calories: 149,
        protein: 6.4,
        carbs: 33,
        fat: 0.5,
        serving: "100 جرام",
        category: "vegetables",
        description: "مضاد حيوي طبيعي، يُستخدم في الطهي المصري بنكهته القوية وفوائده الصحية."
    },
    {
        id: "veg-010",
        name: "ملفوف (نيء — مفروم للسلطة)",
        calories: 25,
        protein: 1.3,
        carbs: 6,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في السلطات أو كورق محشي، غني بالألياف وفيتامين K."
    },
    {
        id: "veg-011",
        name: "سبانخ (مسلوقة)",
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4,
        serving: "100 جرام",
        category: "vegetables",
        description: "مصدر ممتاز للحديد والفيتامينات، تُطبخ في الشوربات أو مع البيض."
    },
    {
        id: "veg-012",
        name: "جرجير (نيء)",
        calories: 25,
        protein: 2.6,
        carbs: 3.7,
        fat: 0.7,
        serving: "100 جرام",
        category: "vegetables",
        description: "خضار ورقي حار الطعم، غني بالفيتامينات ومضادات الأكسدة."
    },
    {
        id: "veg-013",
        name: "خس (نيء)",
        calories: 15,
        protein: 1.4,
        carbs: 2.9,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "أساس في السلطات، منخفض السعرات ومرطب جداً."
    },
    {
        id: "veg-014",
        name: "بنجر (مسلوق)",
        calories: 44,
        protein: 1.7,
        carbs: 10,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في السلطات أو العصائر، مفيد للضغط والطاقة."
    },
    {
        id: "veg-015",
        name: "قرنبيط (مسلوق)",
        calories: 25,
        protein: 2,
        carbs: 5,
        fat: 0.3,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في الأطباق المسلوقة أو المشوية، بديل صحي للأرز."
    },
    {
        id: "veg-016",
        name: "بروكلي (مسلوق)",
        calories: 34,
        protein: 2.8,
        carbs: 7,
        fat: 0.4,
        serving: "100 جرام",
        category: "vegetables",
        description: "مصدر قوي للبروتين النباتي والألياف، يُستخدم في السوتيه والسلق."
    },
    {
        id: "veg-017",
        name: "فاصوليا خضراء (مسلوقة)",
        calories: 31,
        protein: 1.8,
        carbs: 7,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "تُطبخ مع الطماطم أو في السوتيه، غنية بالألياف وفيتامين K."
    },
    {
        id: "veg-018",
        name: "بامية (مسلوقة بدون صلصة)",
        calories: 33,
        protein: 1.9,
        carbs: 7,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "خضار لزج طبيعي، غني بالألياف القابلة للذوبان والمفيد للهضم."
    },
    {
        id: "veg-019",
        name: "قرع عسلي (مسلوق)",
        calories: 26,
        protein: 1,
        carbs: 6.5,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في الشوربات أو المهروس، غني بفيتامين A."
    },
    {
        id: "veg-020",
        name: "بطاطا حلوة (مسلوقة مع القشر)",
        calories: 86,
        protein: 1.6,
        carbs: 20,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "مصدر كربوهيدرات معقدة وفيتامين A، تُؤكل كوجبة أو حلوى صحية."
    },
    {
        id: "veg-021",
        name: "بطاطس (مسلوقة مع القشر)",
        calories: 77,
        protein: 2,
        carbs: 17,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "مصدر طاقة رئيسي، المسلوقة مع القشر تحافظ على الألياف."
    },
    {
        id: "veg-022",
        name: "فجل (نيء)",
        calories: 16,
        protein: 0.7,
        carbs: 3.4,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في السلطات، له نكهة حريفة ومنشطة للهضم."
    },
    {
        id: "veg-023",
        name: "كرفس (نيء)",
        calories: 16,
        protein: 0.7,
        carbs: 3,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "قليل السعرات، يُستخدم في الشوربات والسلطات، مفيد للضغط."
    },
    {
        id: "veg-024",
        name: "بقدونس (نيء — مفروم)",
        calories: 36,
        protein: 2.9,
        carbs: 6.3,
        fat: 0.8,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم كنوع من التوابل الخضراء، غني بفيتامين K والحديد."
    },
    {
        id: "veg-025",
        name: "كزبرة خضراء (نيئة)",
        calories: 23,
        protein: 2.1,
        carbs: 3.7,
        fat: 0.5,
        serving: "100 جرام",
        category: "vegetables",
        description: "تُستخدم في السلطات والشوربات، لها خصائص مضادة للانتفاخ."
    },
    {
        id: "veg-026",
        name: "نعناع (نيء)",
        calories: 44,
        protein: 3.5,
        carbs: 8,
        fat: 0.7,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في السلطات والمشروبات، مهدئ للمعدة ومنعش."
    },
    {
        id: "veg-027",
        name: "ملوخية (أوراق خضراء مسلوقة)",
        calories: 48,
        protein: 4.5,
        carbs: 8,
        fat: 0.5,
        serving: "100 جرام",
        category: "vegetables",
        description: "أوراق خضراء مغذية جداً، غنية بالحديد والألياف — أساس طبق الملوخية."
    },
    {
        id: "veg-028",
        name: "قلقاس (مسلوق)",
        calories: 112,
        protein: 1.5,
        carbs: 26,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في الأطباق الشعبية مثل القلقاس بالصلصة — مصدر طاقة نباتي."
    },
    {
        id: "veg-029",
        name: "خرشوف (مسلوق)",
        calories: 47,
        protein: 3.3,
        carbs: 10.5,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في السلطات أو كطبق جانبي، ممتاز لصحة الكبد."
    },
    {
        id: "veg-030",
        name: "لفت (مسلوق)",
        calories: 28,
        protein: 0.9,
        carbs: 6.4,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في المخللات أو الأطباق المسلوقة، غني بفيتامين C."
    },
    {
        id: "veg-031",
        name: "شمندر أوراق (مسلوقة — ورق البنجر)",
        calories: 22,
        protein: 2.2,
        carbs: 4.3,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "أوراق البنجر المسلوقة — غنية بالحديد والكالسيوم أكثر من الجذر!"
    },
    {
        id: "veg-032",
        name: "زهرة (قرنبيط) — نيئة",
        calories: 25,
        protein: 1.9,
        carbs: 5,
        fat: 0.3,
        serving: "100 جرام",
        category: "vegetables",
        description: "تؤكل نيئة كوجبة خفيفة أو مسلوقة — منخفضة الكربوهيدرات."
    },
    {
        id: "veg-033",
        name: "فول أخضر (حبوب طازجة مسلوقة)",
        calories: 110,
        protein: 7.5,
        carbs: 18,
        fat: 0.4,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُؤكل كوجبة أو في السلطات — مصدر بروتين نباتي وألياف."
    },
    {
        id: "veg-034",
        name: "ذرة حلوة (مسلوقة)",
        calories: 96,
        protein: 3.4,
        carbs: 21,
        fat: 1.5,
        serving: "100 جرام",
        category: "vegetables",
        description: "تُؤكل كوجبة خفيفة أو في السلطات — مصدر طاقة سريع."
    },
    {
        id: "veg-035",
        name: "فلفل أصفر رومي (نيء)",
        calories: 27,
        protein: 1,
        carbs: 6.3,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "غني بفيتامين C، يُستخدم في السلطات والمحاشي."
    },
    {
        id: "veg-036",
        name: "فلفل حار (أخضر — نيء)",
        calories: 40,
        protein: 2,
        carbs: 8.8,
        fat: 0.4,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم للنكهة والحرق — يساعد على تسريع الأيض."
    },
    {
        id: "veg-037",
        name: "كمون أخضر (أوراق — مسلوقة)",
        calories: 30,
        protein: 2.5,
        carbs: 5,
        fat: 0.5,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في الأطباق الشعبية أو كشاي — مهدئ للمعدة."
    },
    {
        id: "veg-038",
        name: "ملوخية ناشفة (مسلوقة)",
        calories: 52,
        protein: 4,
        carbs: 9,
        fat: 0.6,
        serving: "100 جرام",
        category: "vegetables",
        description: "تُستخدم في المناطق الريفية — غنية بالألياف والمعادن."
    },
    {
        id: "veg-039",
        name: "ورق عنب (نيء — للاستخدام في الدوالي)",
        calories: 80,
        protein: 6,
        carbs: 15,
        fat: 0.8,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم محشياً بالأرز أو اللحم — غني بالألياف والبروتين النباتي."
    },
    {
        id: "veg-040",
        name: "قرع صغير (كوسا) — نيء",
        calories: 17,
        protein: 1.2,
        carbs: 3.1,
        fat: 0.3,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم نيئاً في السلطات أو مطهياً — منخفض السعرات."
    },
    {
        id: "veg-041",
        name: "فجل أحمر (نيء)",
        calories: 16,
        protein: 0.7,
        carbs: 3.4,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في السلطات — له خصائص مضادة للأكسدة."
    },
    {
        id: "veg-042",
        name: "جزر أحمر (نيء)",
        calories: 41,
        protein: 0.9,
        carbs: 10,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "غني بالبيتا كاروتين — مفيد للنظر والبشرة."
    },
    {
        id: "veg-043",
        name: "بامية مجففة (مسلوقة)",
        calories: 35,
        protein: 2,
        carbs: 7.5,
        fat: 0.3,
        serving: "100 جرام",
        category: "vegetables",
        description: "تُستخدم في المناطق الريفية — غنية بالألياف القابلة للذوبان."
    },
    {
        id: "veg-044",
        name: "كرنب أحمر (نيء — مفروم)",
        calories: 31,
        protein: 1.4,
        carbs: 7,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في السلطات — غني بمضادات الأكسدة."
    },
    {
        id: "veg-045",
        name: "ملفوف صيني (نيء)",
        calories: 13,
        protein: 1.5,
        carbs: 2,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في السلطات أو الشوربات — منخفض السعرات ومرطب."
    },
    {
        id: "veg-046",
        name: "فطر (عيش الغراب — مسلوق)",
        calories: 22,
        protein: 3.1,
        carbs: 3.3,
        fat: 0.3,
        serving: "100 جرام",
        category: "vegetables",
        description: "مصدر نباتي للبروتين — يُستخدم في السوتيه أو الشوربات."
    },
    {
        id: "veg-047",
        name: "فول سوداني أخضر (نيء — حبوب)",
        calories: 120,
        protein: 9,
        carbs: 10,
        fat: 5,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُؤكل نيئاً أو مسلوقاً — مصدر بروتين ودهون صحية."
    },
    {
        id: "veg-048",
        name: "قرع العسل (نيء — مبشور)",
        calories: 26,
        protein: 1,
        carbs: 6.5,
        fat: 0.1,
        serving: "100 جرام",
        category: "vegetables",
        description: "يُستخدم في الحلويات أو الشوربات — غني بفيتامين A."
    },
    {
        id: "veg-049",
        name: "فاصوليا بيضاء (مسلوقة بدون ملح)",
        calories: 110,
        protein: 7,
        carbs: 20,
        fat: 0.5,
        serving: "100 جرام",
        category: "vegetables",
        description: "تُستخدم في السلطات أو الأطباق — مصدر بروتين نباتي وألياف."
    },
    {
        id: "veg-050",
        name: "لوبيا خضراء (مسلوقة)",
        calories: 35,
        protein: 2.5,
        carbs: 7,
        fat: 0.2,
        serving: "100 جرام",
        category: "vegetables",
        description: "تُستخدم في الأطباق أو السلطات — غنية بالحديد والألياف."
    }

];

// تصدير البيانات
if (typeof window !== 'undefined') {
    window.vegetables1 = vegetables1;
}
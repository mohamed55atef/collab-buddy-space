/**
 * قاعدة بيانات النشويات والكربوهيدرات
 */

// تصدير مصفوفة النشويات
const carbs1 = [
    {
        id: "carb-001",
        name: "أرز أبيض مطبوخ",
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fat: 0.3,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "أرز أبيض مطبوخ، مصدر أساسي للكربوهيدرات في النظام الغذائي المصري."
    },
    {
        id: "carb-002",
        name: "أرز بني مطبوخ",
        calories: 110,
        protein: 2.5,
        carbs: 23,
        fat: 0.9,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "أرز بني كامل الحبة مطبوخ، غني بالألياف والعناصر الغذائية."
    },
    {
        id: "carb-003",
        name: "خبز بلدي",
        calories: 80,
        protein: 3,
        carbs: 15,
        fat: 1,
        serving: "رغيف واحد (50 جرام)",
        category: "carbs",
        description: "خبز مصري تقليدي مصنوع من دقيق القمح، يخبز في فرن طيني."
    },
    {
        id: "carb-004",
        name: "خبز أبيض",
        calories: 75,
        protein: 2.5,
        carbs: 14,
        fat: 1,
        serving: "شريحة واحدة (30 جرام)",
        category: "carbs",
        description: "خبز أبيض مصنوع من الدقيق المكرر."
    },
    {
        id: "carb-005",
        name: "خبز أسمر",
        calories: 70,
        protein: 3.5,
        carbs: 12,
        fat: 1,
        serving: "شريحة واحدة (30 جرام)",
        category: "carbs",
        description: "خبز مصنوع من دقيق القمح الكامل، غني بالألياف."
    },
    {
        id: "carb-006",
        name: "مكرونة مطبوخة",
        calories: 220,
        protein: 8,
        carbs: 43,
        fat: 1.3,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "مكرونة مطبوخة، مصدر جيد للكربوهيدرات والطاقة."
    },
    {
        id: "carb-007",
        name: "بطاطس مسلوقة",
        calories: 130,
        protein: 3,
        carbs: 30,
        fat: 0,
        serving: "حبة متوسطة (150 جرام)",
        category: "carbs",
        description: "بطاطس مسلوقة، غنية بالبوتاسيوم وفيتامين C."
    },
    {
        id: "carb-008",
        name: "بطاطا حلوة مشوية",
        calories: 115,
        protein: 2,
        carbs: 27,
        fat: 0,
        serving: "حبة متوسطة (150 جرام)",
        category: "carbs",
        description: "بطاطا حلوة مشوية، غنية بفيتامين A والألياف."
    },
    {
        id: "carb-009",
        name: "شوفان",
        calories: 150,
        protein: 5,
        carbs: 27,
        fat: 3,
        serving: "نصف كوب جاف (40 جرام)",
        category: "carbs",
        description: "حبوب الشوفان الكاملة، غنية بالألياف والبروتين."
    },
    {
        id: "carb-010",
        name: "كينوا مطبوخة",
        calories: 120,
        protein: 4,
        carbs: 21,
        fat: 2,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "حبوب الكينوا المطبوخة، غنية بالبروتين والألياف والمعادن."
    },
    {
        id: "carb-011",
        name: "فريك مصري مطبوخ",
        calories: 125,
        protein: 5,
        carbs: 25,
        fat: 0.7,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "طبق شعبي مصري من القمح الأخضر المسلوق والمكسّر، غني بالألياف والحديد."
    },
    {
        id: "carb-012",
        name: "عدس بجبة (بالشعرية)",
        calories: 140,
        protein: 8,
        carbs: 22,
        fat: 2,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "عدس مصري مطهو مع شعرية قمح كامل، مصدر ممتاز للبروتين والنشويات."
    },
    {
        id: "carb-013",
        name: "فول مدمس (بدون زيت)",
        calories: 120,
        protein: 8,
        carbs: 20,
        fat: 0.5,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "طبق الإفطار المصري الأشهر، غني بالألياف والحديد، يُقدّم بدون زيت للصحة."
    },
    {
        id: "carb-014",
        name: "بليلة (قمح حلو)",
        calories: 150,
        protein: 4,
        carbs: 32,
        fat: 1,
        serving: "كوب صغير (150 جرام)",
        category: "carbs",
        description: "طبق مصري تقليدي من القمح المسلوق بالحليب أو الماء، يُحلى بعسل أو تمر."
    },
    {
        id: "carb-015",
        name: "رقاق مصري (بدون دهن)",
        calories: 90,
        protein: 3,
        carbs: 18,
        fat: 0.5,
        serving: "قطعة متوسطة (30 جرام)",
        category: "carbs",
        description: "خبز رقيق مصري تقليدي، يُستخدم في المحشي أو الفطير، النسخة الصحية بدون دهن."
    },
    {
        id: "carb-016",
        name: "فطير مشلتت صحي (بدون سمن)",
        calories: 220,
        protein: 6,
        carbs: 35,
        fat: 6,
        serving: "قطعة صغيرة (80 جرام)",
        category: "carbs",
        description: "فطير مصري مقلّب، النسخة الصحية تُحضّر بزيت زيتون بدل السمن."
    },
    {
        id: "carb-017",
        name: "عيش فينو صحي (بدون سكر)",
        calories: 95,
        protein: 3.5,
        carbs: 18,
        fat: 1,
        serving: "قطعة (40 جرام)",
        category: "carbs",
        description: "نسخة منزلية من العيش الفينو بدون سكر أو دهون متحولة، مصنوع من دقيق كامل."
    },
    {
        id: "carb-018",
        name: "كسكسي مصري (مع الخضار)",
        calories: 170,
        protein: 5,
        carbs: 35,
        fat: 1.5,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "طبق مصري شعبي من البرغل الناعم، يُقدّم مع الخضار المسلوقة."
    },
    {
        id: "carb-019",
        name: "شوربة شعيرية (شعرية قمح كامل)",
        calories: 110,
        protein: 3,
        carbs: 22,
        fat: 1,
        serving: "كوب واحد (200 مل)",
        category: "carbs",
        description: "شوربة خفيفة تُقدّم في مصر، مصنوعة من شعرية قمح كامل وخضار."
    },
    {
        id: "carb-020",
        name: "أرز مع عدس (كشري نباتي بدون صلصة)",
        calories: 160,
        protein: 7,
        carbs: 30,
        fat: 1,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "مزيج صحي من الأرز والعدس — جوهرة الكشري بدون صلصة أو بصل مقلي."
    },
    {
        id: "carb-021",
        name: "مكرونة قمح كامل مسلوقة",
        calories: 170,
        protein: 7,
        carbs: 35,
        fat: 1,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "مكرونة مصرية مصنوعة من القمح الكامل، غنية بالألياف والبروتين."
    },
    {
        id: "carb-022",
        name: "عيش شمس (بدون دهن)",
        calories: 100,
        protein: 3,
        carbs: 20,
        fat: 0.8,
        serving: "قطعة (40 جرام)",
        category: "carbs",
        description: "خبز مصري مفرود يُخبز في الشمس أو الفرن، النسخة الصحية بدون دهن."
    },
    {
        id: "carb-023",
        name: "بليلة بالتمر (بدون سكر)",
        calories: 160,
        protein: 4,
        carbs: 34,
        fat: 1,
        serving: "كوب صغير (150 جرام)",
        category: "carbs",
        description: "بليلة مغذية محلاة بالتمر الطبيعي، مناسبة للفطور أو ما بعد التمرين."
    },
    {
        id: "carb-024",
        name: "فول بالليمون والكمون (بدون زيت)",
        calories: 115,
        protein: 8,
        carbs: 19,
        fat: 0.5,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "فول مدمس مصري مهروس، يُتبل بالليمون والكمون — خيار صحي للإفطار."
    },
    {
        id: "carb-025",
        name: "أرز مع شعيرية (طبق مصري)",
        calories: 140,
        protein: 3,
        carbs: 29,
        fat: 1,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "أرز مصري مع شعيرية محمصة خفيفة، طبق يومي في البيوت المصرية."
    },
    {
        id: "carb-026",
        name: "عيش تورتيلا مصري (من دقيق قمح كامل)",
        calories: 90,
        protein: 3,
        carbs: 17,
        fat: 1,
        serving: "قطعة (40 جرام)",
        category: "carbs",
        description: "نسخة مصرية من التورتيلا، تُستخدم في الساندويتشات الصحية."
    },
    {
        id: "carb-027",
        name: "شوربة فريك (بالخضار)",
        calories: 130,
        protein: 5,
        carbs: 25,
        fat: 1,
        serving: "كوب واحد (200 مل)",
        category: "carbs",
        description: "شوربة دافئة من الفريك والجزر والكرفس، شائعة في الشتاء المصري."
    },
    {
        id: "carb-028",
        name: "عيش سن مصري (دقيق أسمر)",
        calories: 85,
        protein: 4,
        carbs: 18,
        fat: 0.7,
        serving: "شريحة (40 جرام)",
        category: "carbs",
        description: "خبز مصري من دقيق القمح الأسمر، غني بالألياف ويُهضم ببطء."
    },
    {
        id: "carb-029",
        name: "مكرونة بشاميل صحي (بدون جبنة دسمة)",
        calories: 180,
        protein: 8,
        carbs: 28,
        fat: 4,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "نسخة خفيفة من المكرونة بالبشاميل باستخدام حليب قليل الدسم وجبنة قريش."
    },
    {
        id: "carb-030",
        name: "أرز بالخضار (محشي خضار)",
        calories: 150,
        protein: 4,
        carbs: 30,
        fat: 1.5,
        serving: "كوب واحد (150 جرام)",
        category: "carbs",
        description: "أرز مصري مع خضار مقطعة (جزر، بازلاء، فاصوليا)، طبق نباتي صحي."
    },
    {
        id: "carb-031",
        name: "عيش حواوشي صحي (بدون لحمة دهنية)",
        calories: 200,
        protein: 10,
        carbs: 25,
        fat: 6,
        serving: "ساندويتش صغير (100 جرام)",
        category: "carbs",
        description: "نسخة صحية من الحواوشي باستخدام لحم مفروم قليل الدهن وخضار."
    },
    {
        id: "carb-032",
        name: "شوربة شعير (بالخضار)",
        calories: 110,
        protein: 3,
        carbs: 24,
        fat: 0.5,
        serving: "كوب واحد (200 مل)",
        category: "carbs",
        description: "شوربة دافئة من الشعير والجزر والكرفس، غنية بالألياف ومهدئة للهضم."
    },
    {
        id: "carb-033",
        name: "عيش صاج مصري (بدون دهن)",
        calories: 95,
        protein: 3,
        carbs: 19,
        fat: 0.8,
        serving: "قطعة (40 جرام)",
        category: "carbs",
        description: "خبز مصري يُخبز على الصاج، خفيف وهش، النسخة الصحية بدون دهن أثناء الخبز."
    }
];

// تصدير البيانات
if (typeof window !== 'undefined') {
    window.carbs1 = carbs1;
}
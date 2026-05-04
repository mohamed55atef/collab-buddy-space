/**
 * قاعدة بيانات البروتينات
 */

// تصدير مصفوفة البروتينات
const proteins1 = [
    {
        id: "prot-001",
        name: "فراخ مشوية (صدر بدون جلد)",
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        serving: "قطعة 100 جرام",
        category: "protein",
        description: "صدر فراخ مشوي بدون جلد، مصدر بروتين نقي قليل الدهون."
    },
    {
        id: "prot-002",
        name: "كبدة مشوية (بقري)",
        calories: 190,
        protein: 27,
        carbs: 2,
        fat: 8,
        serving: "100 جرام",
        category: "protein",
        description: "كبدة بقري مشوية، غنية بالحديد وفيتامين A والبروتين."
    },
    {
        id: "prot-003",
        name: "فول مدمس (بدون زيت)",
        calories: 120,
        protein: 8,
        carbs: 20,
        fat: 0.5,
        serving: "كوب واحد (150 جرام)",
        category: "protein",
        description: "طبق الإفطار المصري الأشهر، بروتين نباتي ممتاز مع ألياف."
    },
    {
        id: "prot-004",
        name: "بيض مسلوق",
        calories: 78,
        protein: 6.5,
        carbs: 0.6,
        fat: 5.3,
        serving: "حبة واحدة كبيرة",
        category: "protein",
        description: "مصدر بروتين كامل، يحتوي على جميع الأحماض الأمينية الأساسية."
    },
    {
        id: "prot-005",
        name: "بيض مقلي بزيت زيتون (حبة)",
        calories: 90,
        protein: 6,
        carbs: 0.6,
        fat: 6.5,
        serving: "حبة واحدة",
        category: "protein",
        description: "نسخة صحية من البيض المقلي باستخدام زيت زيتون بدل الدهون المهدرجة."
    },
    {
        id: "prot-006",
        name: "لحمة مفرومة مشوية (بقري خالي الدهن)",
        calories: 200,
        protein: 26,
        carbs: 0,
        fat: 10,
        serving: "100 جرام",
        category: "protein",
        description: "لحم بقري مفروم قليل الدهن، مشوي للحفاظ على قيمته الغذائية."
    },
    {
        id: "prot-007",
        name: "سمك بلطي مشوي",
        calories: 120,
        protein: 24,
        carbs: 0,
        fat: 2.5,
        serving: "فيليه 100 جرام",
        category: "protein",
        description: "سمك بلطي مصري مشوي، خفيف وغني بأوميغا 3 والبروتين."
    },
    {
        id: "prot-008",
        name: "سمك بوري مشوي",
        calories: 130,
        protein: 26,
        carbs: 0,
        fat: 3,
        serving: "فيليه 100 جرام",
        category: "protein",
        description: "من الأسماك الشعبية في مصر، غني بالبروتين وأوميغا 3."
    },
    {
        id: "prot-009",
        name: "جمبري مشوي",
        calories: 90,
        protein: 20,
        carbs: 0.2,
        fat: 1,
        serving: "100 جرام",
        category: "protein",
        description: "جمبري مشوي بدون زيت، مصدر بروتين خفيف ومنخفض السعرات."
    },
    {
        id: "prot-010",
        name: "كفتة مشوية (لحم بقري خالي الدهن)",
        calories: 180,
        protein: 22,
        carbs: 3,
        fat: 9,
        serving: "قطعة متوسطة (80 جرام)",
        category: "protein",
        description: "كفتة منزلية مشوية، مصنوعة من لحم قليل الدهن وبصل وبهارات."
    },
    {
        id: "prot-011",
        name: "عدس بجبة (بالشعرية)",
        calories: 140,
        protein: 9,
        carbs: 22,
        fat: 2,
        serving: "كوب واحد (150 جرام)",
        category: "protein",
        description: "عدس مصري مع شعرية، يُعد من أفضل مصادر البروتين النباتي."
    },
    {
        id: "prot-012",
        name: "زبادي يوناني خالي الدسم",
        calories: 60,
        protein: 10,
        carbs: 4,
        fat: 0,
        serving: "علبة صغيرة (100 جرام)",
        category: "protein",
        description: "زبادي مركز غني بالبروتين، مثالي للدايت أو بعد التمرين."
    },
    {
        id: "prot-013",
        name: "زبادي بلدي كامل الدسم",
        calories: 65,
        protein: 4,
        carbs: 5,
        fat: 3.5,
        serving: "كوب صغير (100 جرام)",
        category: "protein",
        description: "زبادي مصري تقليدي، مصدر بروتين وكالسيوم طبيعي."
    },
    {
        id: "prot-014",
        name: "جبنة قريش خالية الدسم",
        calories: 70,
        protein: 12,
        carbs: 3,
        fat: 0.5,
        serving: "نصف كوب (100 جرام)",
        category: "protein",
        description: "أفضل جبنة للدايت، غنية بالبروتين وقليلة السعرات."
    },
    {
        id: "prot-015",
        name: "جبنة رومي قليلة الدسم",
        calories: 120,
        protein: 10,
        carbs: 1,
        fat: 8,
        serving: "شريحة (30 جرام)",
        category: "protein",
        description: "جبنة صلبة مصرية، تُستخدم في الساندويتشات الصحية."
    },
    {
        id: "prot-016",
        name: "موزاريلا قليلة الدسم",
        calories: 85,
        protein: 7,
        carbs: 1,
        fat: 5,
        serving: "30 جرام",
        category: "protein",
        description: "جبن موزاريلا خفيف، يُستخدم في الأطباق المشوية أو الساندويتشات."
    },
    {
        id: "prot-017",
        name: "فراخ رانش (صدر مشوي)",
        calories: 170,
        protein: 32,
        carbs: 0,
        fat: 4,
        serving: "100 جرام",
        category: "protein",
        description: "صدر فراخ مشوي بنكهة الرانش الخفيفة، عالي البروتين."
    },
    {
        id: "prot-018",
        name: "وراك فراخ مشوية (بدون جلد)",
        calories: 190,
        protein: 28,
        carbs: 0,
        fat: 8,
        serving: "قطعة 100 جرام",
        category: "protein",
        description: "وراك فراخ مشوية بدون جلد، أكثر نكهة من الصدر مع بروتين عالي."
    },
    {
        id: "prot-019",
        name: "حمام محشي بالأرز (صدر)",
        calories: 220,
        protein: 25,
        carbs: 10,
        fat: 10,
        serving: "نصف حمامة (120 جرام)",
        category: "protein",
        description: "طبق مصري فاخر، الحمام غني بالبروتين والحديد."
    },
    {
        id: "prot-020",
        name: "سجق بلدي مشوي (بقري)",
        calories: 250,
        protein: 16,
        carbs: 2,
        fat: 18,
        serving: "قطعتين صغير (80 جرام)",
        category: "protein",
        description: "نسخة مشوية من السجق البلدي، أقل دهوناً من المقلي."
    },
    {
        id: "prot-021",
        name: "رنجة مشوية (بدون زيت)",
        calories: 210,
        protein: 20,
        carbs: 0,
        fat: 14,
        serving: "قطعة متوسطة (80 جرام)",
        category: "protein",
        description: "رنجة مدخنة ثم مشوية، غنية بأوميغا 3 والبروتين."
    },
    {
        id: "prot-022",
        name: "سردين مشوي",
        calories: 180,
        protein: 25,
        carbs: 0,
        fat: 8,
        serving: "قطعتين (100 جرام)",
        category: "protein",
        description: "سمك السردين المصري المشوي، مصدر ممتاز لأوميغا 3 والكالسيوم."
    },
    {
        id: "prot-023",
        name: "أومليت بالخضار (بيضتين)",
        calories: 180,
        protein: 14,
        carbs: 5,
        fat: 11,
        serving: "طبق صغير",
        category: "protein",
        description: "بيض مع طماطم وفلفل وبصل، وجبة بروتينية متكاملة."
    },
    {
        id: "prot-024",
        name: "فول صويا مطهو (توfu)",
        calories: 80,
        protein: 10,
        carbs: 2,
        fat: 4,
        serving: "100 جرام",
        category: "protein",
        description: "بديل نباتي ممتاز للحوم، يُستخدم في الأطباق الصحية."
    },
    {
        id: "prot-025",
        name: "حمص بالطحينة (بدون خبز)",
        calories: 150,
        protein: 6,
        carbs: 15,
        fat: 8,
        serving: "نصف كوب (100 جرام)",
        category: "protein",
        description: "حمص مسلوق مع طحينة وليمون، بروتين نباتي مع دهون صحية."
    },
    {
        id: "prot-026",
        name: "كشري نباتي (أرز وعدس)",
        calories: 160,
        protein: 8,
        carbs: 30,
        fat: 1,
        serving: "كوب واحد (150 جرام)",
        category: "protein",
        description: "مزيج نباتي من الأرز والعدس — مصدر بروتين نباتي متكامل."
    },
    {
        id: "prot-027",
        name: "لسان عصفور باللحم المفروم",
        calories: 220,
        protein: 15,
        carbs: 25,
        fat: 8,
        serving: "كوب واحد (150 جرام)",
        category: "protein",
        description: "طبق مصري دافئ، يجمع بين البروتين والنشويات بطريقة متوازنة."
    },
    {
        id: "prot-028",
        name: "شوربة كرات اللحم (لحم بقري)",
        calories: 150,
        protein: 12,
        carbs: 8,
        fat: 7,
        serving: "كوب (250 مل)",
        category: "protein",
        description: "شوربة خفيفة مع كرات لحم صغيرة، مغذية وسهلة الهضم."
    },
    {
        id: "prot-029",
        name: "لحمة ضأن مشوية (بدون دهن)",
        calories: 220,
        protein: 28,
        carbs: 0,
        fat: 12,
        serving: "100 جرام",
        category: "protein",
        description: "لحم ضأن خالي من الدهون الخارجية، مشوي للحفاظ على البروتين."
    },
    {
        id: "prot-030",
        name: "كوارع (شوربة) — بدون دهون",
        calories: 120,
        protein: 18,
        carbs: 0,
        fat: 4,
        serving: "كوب (200 مل)",
        category: "protein",
        description: "شوربة كوارع مصفّاة من الدهون، غنية بالكولاجين والبروتين."
    },
    {
        id: "prot-031",
        name: "مكرونة بالبشاميل واللحم (نسخة خفيفة)",
        calories: 250,
        protein: 14,
        carbs: 30,
        fat: 8,
        serving: "كوب واحد (150 جرام)",
        category: "protein",
        description: "نسخة صحية باستخدام حليب قليل الدسم ولحم مفروم خالي الدهن."
    },
    {
        id: "prot-032",
        name: "عيش بوريا بالبيض (سندوتش صحي)",
        calories: 200,
        protein: 12,
        carbs: 25,
        fat: 6,
        serving: "ساندويتش واحد",
        category: "protein",
        description: "خبز سن مع بيضة وقليل من الطماطم — وجبة بروتينية سريعة."
    },
    {
        id: "prot-033",
        name: "كبدة دجاج مشوية",
        calories: 170,
        protein: 24,
        carbs: 2,
        fat: 7,
        serving: "100 جرام",
        category: "protein",
        description: "كبدة دجاج مشوية، غنية بالبروتين والحديد وفيتامين B12."
    },
    {
        id: "prot-034",
        name: "فراخ تكا (صدر مشوي بالبهارات)",
        calories: 160,
        protein: 30,
        carbs: 2,
        fat: 4,
        serving: "100 جرام",
        category: "protein",
        description: "صدر فراخ متبل بالزبادي والبهارات الهندية ثم مشوي."
    },
    {
        id: "prot-035",
        name: "موزة لحم مشوية",
        calories: 210,
        protein: 26,
        carbs: 0,
        fat: 11,
        serving: "100 جرام",
        category: "protein",
        description: "جزء من لحم العجل، غني بالبروتين ويُطبخ ببطء حتى النعومة."
    },
    {
        id: "prot-036",
        name: "بيض بالبسطرمة (شرحتين)",
        calories: 150,
        protein: 12,
        carbs: 1,
        fat: 10,
        serving: "طبق صغير",
        category: "protein",
        description: "بيض مقلي مع بسطرمة قليلة الملح — وجبة إفطار دسمة وسريعة."
    },
    {
        id: "prot-037",
        name: "فول الصويا المسلوق (إدمامي)",
        calories: 120,
        protein: 11,
        carbs: 9,
        fat: 5,
        serving: "كوب صغير (100 جرام)",
        category: "protein",
        description: "فول صويا أخضر مسلوق، وجبة خفيفة غنية بالبروتين النباتي."
    },
    {
        id: "prot-038",
        name: "مخيضة (لبن رائب بالملح)",
        calories: 60,
        protein: 4,
        carbs: 5,
        fat: 2,
        serving: "كوب (200 مل)",
        category: "protein",
        description: "مشروب لبن مصري تقليدي، منعش وغني بالبروتين والبروبيوتيك."
    },
    {
        id: "prot-039",
        name: "مكسرات مشكلة (غير مملحة)",
        calories: 170,
        protein: 6,
        carbs: 6,
        fat: 15,
        serving: "30 جرام (حفنة صغيرة)",
        category: "protein",
        description: "لوز، جوز، فستق — مصدر بروتين ودهون صحية للوجبات الخفيفة."
    },
    {
        id: "prot-040",
        name: "فول الصويا المخمر (تمبيه)",
        calories: 190,
        protein: 20,
        carbs: 9,
        fat: 10,
        serving: "100 جرام",
        category: "protein",
        description: "منتج نباتي مخمر من فول الصويا، بروتين كامل وسهل الهضم."
    },
    {
        id: "prot-041",
        name: "سمك قاروص مشوي",
        calories: 110,
        protein: 23,
        carbs: 0,
        fat: 2,
        serving: "فيليه 100 جرام",
        category: "protein",
        description: "سمك أبيض ناعم الطعم، منخفض الدهون وعالي البروتين."
    },
    {
        id: "prot-042",
        name: "دجاج بالكاري (صدر بدون جلد)",
        calories: 180,
        protein: 28,
        carbs: 5,
        fat: 6,
        serving: "100 جرام",
        category: "protein",
        description: "صدر دجاج مطهو بالكاري والخضار — نكهة قوية وبروتين عالي."
    },
    {
        id: "prot-043",
        name: "لحمة برجر مشوية (بدون خبز)",
        calories: 200,
        protein: 25,
        carbs: 2,
        fat: 10,
        serving: "قطعة 100 جرام",
        category: "protein",
        description: "برجر لحم بقري خالي الدهن، مشوي بدون زيت أو خبز."
    },
    {
        id: "prot-044",
        name: "بيض بالخضار (مقلي بزيت زيتون)",
        calories: 160,
        protein: 10,
        carbs: 6,
        fat: 10,
        serving: "طبق صغير",
        category: "protein",
        description: "بيض مع فلفل وطماطم وبصل، مطهو بزيت زيتون صحي."
    },
    {
        id: "prot-045",
        name: "سمك ماكريل مشوي",
        calories: 200,
        protein: 22,
        carbs: 0,
        fat: 12,
        serving: "فيليه 100 جرام",
        category: "protein",
        description: "غني بأوميغا 3، مثالي لصحة القلب والعضلات."
    },
    {
        id: "prot-046",
        name: "فول بالبيض (طبق مصري)",
        calories: 200,
        protein: 14,
        carbs: 20,
        fat: 6,
        serving: "طبق صغير",
        category: "protein",
        description: "مزيج مثالي من البروتين الحيواني والنباتي — شائع في الإفطار المصري."
    },
    {
        id: "prot-047",
        name: "مكرونة بالجمبري (نسخة خفيفة)",
        calories: 220,
        protein: 18,
        carbs: 25,
        fat: 6,
        serving: "كوب واحد",
        category: "protein",
        description: "مكرونة مع جمبري وثوم وزيت زيتون — طبق بروتيني بحري خفيف."
    },
    {
        id: "prot-048",
        name: "كشدة (لحمة مفرومة مع طماطم)",
        calories: 180,
        protein: 20,
        carbs: 8,
        fat: 8,
        serving: "كوب واحد",
        category: "protein",
        description: "طبق مصري سريع من اللحم المفروم مع صلصة الطماطم."
    },
    {
        id: "prot-049",
        name: "زبادي بالخيار (سلطة)",
        calories: 80,
        protein: 6,
        carbs: 5,
        fat: 3,
        serving: "كوب صغير",
        category: "protein",
        description: "زبادي مع خيار ونعناع وثوم — بروتين منعش ومناسب للدايت."
    },
    {
        id: "prot-050",
        name: "كبدة دجاج بالبصل (مشوية)",
        calories: 160,
        protein: 22,
        carbs: 5,
        fat: 7,
        serving: "100 جرام",
        category: "protein",
        description: "كبدة دجاج مع بصل مشوح بقليل من الزيت — طبق شعبي عالي البروتين."
    }
];

// تصدير البيانات
if (typeof window !== 'undefined') {
    window.proteins1 = proteins1;
}
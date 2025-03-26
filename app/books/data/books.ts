import { Book } from "@/types/book";

export const books: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/books/atomic-habits.jpg",
    description:
      "James Clear's groundbreaking book reveals how tiny changes can lead to remarkable results. Learn the science behind habit formation and practical strategies to transform your daily routines.",
    readDate: "2024-03-15",
    rating: 5,
    amazonLink:
      "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    category: "Self-Improvement",
    tags: ["habits", "productivity"],
  },
  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "/books/deep-work.jpg",
    description:
      "Cal Newport makes a compelling case for cultivating deep focus in an age of constant distraction. Discover how to produce valuable work by mastering the art of concentration.",
    readDate: "2024-02-10",
    rating: 4,
    amazonLink:
      "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692",
    category: "Productivity",
    tags: ["focus", "work"],
  },
  {
    id: "4",
    title: "Mind Control Marketing",
    author: "Drew Eric Whitman",
    coverImage: "/books/mind-control-marketing.jpg",
    description:
      "Drew Eric Whitman reveals the psychological triggers that drive consumer behavior. Learn ethical persuasion techniques rooted in human psychology to create effective marketing campaigns.",
    readDate: "2024-03-20",
    rating: 4,
    amazonLink:
      "https://www.amazon.com/Mind-Control-Marketing-What-Buy-ebook/dp/B00BQ5QJ5G",
    category: "Marketing",
    tags: ["psychology", "persuasion"],
  },
  {
    id: "8",
    title: "مزرعة الحيوانات",
    author: "جورج أورويل (George Orwell), ترجمة: شامل أباظة",
    coverImage: "/books/animal-farm.jpg",
    description:
      "رواية رمزية عن مجموعة من حيوانات المزرعة التي تثور ضد مالكها البشري، على أمل إنشاء مجتمع متساوٍ، لكن الثورة تنتهي بالخيانة وديكتاتورية خنزير يدعى نابليون. نقد قوي للأنظمة الشمولية.",
    readDate: "2024-07-15",
    rating: 4,
    amazonLink:
      "https://www.amazon.com/Animal-Farm-George-Orwell/dp/0451526341/",
    category: "Fiction",
    tags: ["classic", "allegory", "politics"],
  },
  {
    id: "9",
    title: "وادي الذئاب المنسية",
    author: "عمرو عبدالحميد",
    coverImage: "/books/valley-of-forgotten-wolves.jpg",
    description:
      "في أرضٍ يحكمها شاهد السماء عاش البشر والذئاب والملديون في سلمٍ امتد آلاف السنين قبل أن يجتاز ذئبٌ رهيب إحدى العابرات الست، ويلتقي «موسى» الباحث عن أقرب فرصة للخروج من بلدته، ليتبدل كل شيء.",
    readDate: "2024-08-01",
    rating: 4,
    amazonLink: "https://www.amazon.com/dp/B08HLQR4GK/",
    category: "Fiction",
    tags: ["fantasy", "arabic-literature", "wolves"],
  },
  // New books extracted from the CSV file
  {
    id: "10",
    title: "أرض زيكولا",
    author: "عمرو عبدالحميد",
    coverImage: "/books/land-of-zekola.jpg",
    description:
      "رواية خيالية عن عالم موازٍ حيث تتحكم قوى خفية في مصائر البشر، تتبع قصة بطل يكتشف حقيقة أرض زيكولا الغامضة ويواجه تحديات تغير حياته للأبد.",
    readDate: "2024-03-25",
    rating: 3,
    amazonLink: "https://www.amazon.com/dp/B0009753375",
    category: "Fiction",
    tags: ["untagged"],
  },
  {
    id: "11",
    title: "أرض السافلين",
    author: "أحمد خالد مصطفى",
    coverImage: "/books/land-of-the-lowly.jpg",
    description:
      "رواية فلسفية عميقة تطرح أسئلة وجودية حول الخير والشر عبر قصة صراع بين عالمين متوازيين، حيث تختلط المفاهيم الأخلاقية وتتحدى القارئ لإعادة التفكير في ثوابته.",
    readDate: "2024-03-25",
    rating: 4,
    amazonLink: "https://www.amazon.com/dp/9776541291",
    category: "Fiction",
    tags: ["favorite"],
  },
  {
    id: "12",
    title: "أنتيخريستوس",
    author: "أحمد خالد مصطفى",
    coverImage: "/books/antichristos.jpg",
    description:
      "ملحمة تاريخية دينية مثيرة تتبع مسار التاريخ البشري من منظور مختلف، تطرح أسئلة جوهرية عن الإيمان والقدر والصراع الأبدي بين الخير والشر عبر العصور.",
    readDate: "2024-03-25",
    rating: 5,
    amazonLink: "https://www.amazon.com/dp/B0023935182",
    category: "Fiction",
    tags: ["favorite"],
  },
  {
    id: "13",
    title: "حرب المستضعفين",
    author: "Robert Taber",
    coverImage: "/books/war-of-the-weak.jpg",
    description:
      "دراسة استراتيجية وعملية لفنون المقاومة والحرب غير التقليدية، تقدم تحليلاً عميقاً لكيفية تحويل نقاط الضعف إلى قوة في الصراعات غير المتكافئة.",
    readDate: "2017-02-08",
    rating: 4,
    amazonLink: "https://www.amazon.com/dp/B0018181689",
    category: "Fiction",
    tags: ["favorite"],
  },
  {
    id: "14",
    title: "معركة الأحرار",
    author: "أحمد سمير",
    coverImage: "/books/battle-of-the-free.jpg",
    description:
      "رواية تاريخية ملحمية تصور كفاح شعب من أجل الحرية، تبرز قيم التضحية والإرادة في مواجهة القمع والاستبداد عبر شخصيات متعددة الأبعاد.",
    readDate: "2017-01-31",
    rating: 3,
    amazonLink: "https://www.amazon.com/dp/B0020629259",
    category: "Fiction",
    tags: ["untagged"],
  },
  {
    id: "15",
    title: "حقيقة الخديعة",
    author: "Dan Brown",
    coverImage: "/books/deception-point.jpg",
    description:
      "رواية تشويقية مليئة بالمغامرات والألغاز، تتبع عالم رموز في رحلة محفوفة بالمخاطر لكشف مؤامرة عالمية تهدد أسس المعرفة البشرية.",
    readDate: "2015-03-01",
    rating: 4,
    amazonLink: "https://www.amazon.com/dp/B0006925551",
    category: "Fiction",
    tags: ["favorite"],
  },
  {
    id: "16",
    title:
      "إذا كان الحب لعبة فهذه هي قوانينها: عشرة قوانين للتوصل إلى الحب وتوطيد علاقات صادقة تدوم إلى الأبد",
    author: "Cherie Carter-Scott",
    coverImage: "/books/if-love-is-a-game.jpg",
    description:
      "دليل عملي لفهم ديناميكيات العلاقات الإنسانية، يقدم رؤى نفسية عميقة وعشر قوانين أساسية لبناء علاقات حب صحية ومستدامة في الحياة.",
    readDate: "2016-02-07",
    rating: 4,
    amazonLink: "https://www.amazon.com/dp/B0007992994",
    category: "Self-Improvement",
    tags: ["favorite"],
  },
  {
    id: "17",
    title:
      "Fluent in 3 Months: How Anyone at Any Age Can Learn to Speak Any Language from Anywhere in the World",
    author: "Benny Lewis",
    coverImage: "/books/fluent-in-3-months.jpg",
    description:
      "نهج ثوري في تعلم اللغات يعتمد على الغمر الثقافي والتواصل الفوري، يقدم استراتيجيات عملية لإتقان أي لغة في وقت قياسي بغض النظر عن العمر أو الموقع.",
    readDate: "2016-01-24",
    rating: 3,
    amazonLink: "https://www.amazon.com/dp/0062282697",
    category: "Self-Improvement",
    tags: ["untagged"],
  },
  {
    id: "18",
    title: "The Social Animal: A Story of How Success Happens",
    author: "David Brooks",
    coverImage: "/books/the-social-animal.jpg",
    description:
      "استكشاف عميق للعوامل الخفية التي تشكل النجاح البشري، يدمج بين أحدث الأبحاث في علم النفس العصبي ودراسات الحالة في قصة سردية جذابة.",
    readDate: "2015-04-26",
    rating: 4,
    amazonLink: "https://www.amazon.com/dp/1780720378",
    category: "Psychology",
    tags: ["psychology", "favorite"],
  },
  {
    id: "19",
    title:
      "Mindcontrolmarketing.Com: How Everyday People Are Using Forbidden Mind Control Psychology and Ruthless Military Tactics to Make Millions Online",
    author: "Mark Joyner",
    coverImage: "/books/mindcontrolmarketing.jpg",
    description:
      "كشف للتقنيات النفسية والتكتيكات التسويقية المستوحاة من علوم التأثير والاستراتيجيات العسكرية، يقدم رؤى غير تقليدية للإقناع والنجاح التجاري.",
    readDate: "2015-01-17",
    rating: 4,
    amazonLink: "https://www.amazon.com/dp/0971932506",
    category: "Business",
    tags: ["marketing", "business", "psychology", "favorite"],
  },
];

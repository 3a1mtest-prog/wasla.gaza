/* ===========================================================================
   وصلة ميديا — ملف المحتوى
   Wasla Media — content file

   هذا هو الملف الوحيد اللي بتحتاج تعدّله لإضافة أعمال أو تغيير المعلومات.
   This is the only file you need to edit to add work or change info.
   =========================================================================== */

window.WASLA = {};

/* ---------------------------------------------------------------------------
   1) معلومات التواصل — ⚠️ عدّلها قبل النشر
      Contact details — ⚠️ EDIT THESE BEFORE GOING LIVE
   --------------------------------------------------------------------------- */
WASLA.site = {
  // رقم الواتساب بصيغة دولية بدون + وبدون مسافات. مثال: 970599123456
  // WhatsApp in international format, no + and no spaces.
  // ما دام فاضي أو placeholder، كل أزرار التواصل بتحوّل على الإنستغرام.
  whatsapp: '972595071614',

  // بريد حقيقي فقط. اتركه فاضي لحد ما يصير عندك واحد شغّال.
  email: '',

  location: { ar: 'غزة، فلسطين', en: 'Gaza, Palestine' },

  // اترك القيمة فاضية '' لإخفاء الرابط من الموقع
  // Leave '' to hide a link from the site
  social: {
    instagram: 'https://www.instagram.com/wasla_media1',
    facebook: '',
    tiktok: '',
    linkedin: '',
    youtube: '',
  },
};

/* ---------------------------------------------------------------------------
   2) الخدمات — Services
      icon: مفتاح من ICONS في main.js
   --------------------------------------------------------------------------- */
WASLA.services = [
  {
    id: 'branding',
    icon: 'branding',
    title: { ar: 'إنشاء وإدارة العلامات التجارية', en: 'Brand Identity & Management' },
    desc: {
      ar: 'نبني هوية بصرية متكاملة تبدأ من الاسم والشعار ودليل الاستخدام، وتكمل معك على المدى الطويل بنبرة صوت وقواعد واضحة لكل من يشتغل على العلامة.',
      en: 'A complete visual identity — name, logo, and brand guidelines — plus the tone of voice and rules that keep the brand consistent long after launch.',
    },
    items: {
      ar: ['تسمية العلامة', 'تصميم الشعار', 'دليل الهوية', 'نبرة الصوت'],
      en: ['Naming', 'Logo design', 'Brand guidelines', 'Tone of voice'],
    },
  },
  {
    id: 'web',
    icon: 'web',
    title: { ar: 'إنشاء وتصميم مواقع الويب', en: 'Web Design & Development' },
    desc: {
      ar: 'مواقع سريعة ومتجاوبة مبنية حول هدف واضح: تعريف بالشركة، بيع منتج، أو استقبال طلبات. بتشتغل على الموبايل قبل الديسكتوب.',
      en: 'Fast, responsive sites built around one clear goal — introduce the company, sell a product, or capture leads. Mobile-first, always.',
    },
    items: {
      ar: ['مواقع الشركات', 'متاجر إلكترونية', 'صفحات هبوط', 'لوحات تحكم'],
      en: ['Corporate sites', 'E-commerce', 'Landing pages', 'Dashboards'],
    },
  },
  {
    id: 'apps',
    icon: 'apps',
    title: { ar: 'إنشاء وتطوير البرامج والتطبيقات', en: 'Software & App Development' },
    desc: {
      ar: 'تطبيقات موبايل وأنظمة إدارة مخصّصة لشغلك — من دراسة المتطلبات وتصميم الواجهات إلى الإطلاق والدعم بعده.',
      en: 'Mobile apps and custom management systems — from requirements and UI design through launch and ongoing support.',
    },
    items: {
      ar: ['تطبيقات أندرويد و iOS', 'أنظمة إدارة', 'تصميم واجهات UI/UX', 'دعم وصيانة'],
      en: ['Android & iOS apps', 'Management systems', 'UI/UX design', 'Support & maintenance'],
    },
  },
  {
    id: 'social',
    icon: 'social',
    title: { ar: 'إدارة صفحات السوشيال ميديا', en: 'Social Media Management' },
    desc: {
      ar: 'خطة محتوى شهرية، تصميم وكتابة، جدولة نشر، ورد على الجمهور — مع تقرير أداء بالأرقام آخر كل شهر.',
      en: 'A monthly content plan, design and copy, scheduling, and community replies — with a numbers-based performance report each month.',
    },
    items: {
      ar: ['خطة محتوى شهرية', 'تصميم وكتابة', 'جدولة ونشر', 'تقارير أداء'],
      en: ['Monthly content plan', 'Design & copywriting', 'Scheduling', 'Performance reports'],
    },
  },
  {
    id: 'graphic',
    icon: 'graphic',
    title: { ar: 'تصميم الجرافيك', en: 'Graphic Design' },
    desc: {
      ar: 'بوستات، بروشورات، مطبوعات، تغليف، وعروض تقديمية. تصميم بيخدم الرسالة مش بس بيزيّنها.',
      en: 'Social posts, brochures, print, packaging, and presentations. Design that serves the message, not just decorates it.',
    },
    items: {
      ar: ['بوستات سوشيال', 'مطبوعات وبروشورات', 'تغليف ومنتجات', 'عروض تقديمية'],
      en: ['Social posts', 'Print & brochures', 'Packaging', 'Presentations'],
    },
  },
  {
    id: 'video',
    icon: 'video',
    title: { ar: 'إنتاج الفيديوهات الإعلانية والعادية', en: 'Video Production' },
    desc: {
      ar: 'من السيناريو والتصوير إلى المونتاج والموشن جرافيك — إعلانات، ريلز، وفيديوهات تعريفية جاهزة للنشر.',
      en: 'Script, shoot, edit, and motion graphics — ads, reels, and corporate videos ready to publish.',
    },
    items: {
      ar: ['إعلانات مصوّرة', 'ريلز وفيديوهات قصيرة', 'موشن جرافيك', 'مونتاج احترافي'],
      en: ['Video ads', 'Reels & shorts', 'Motion graphics', 'Professional editing'],
    },
  },
  {
    id: 'ads',
    icon: 'ads',
    title: { ar: 'إنشاء وإدارة الحملات الإعلانية والدعائية', en: 'Advertising Campaigns' },
    desc: {
      ar: 'حملات ممولة على ميتا وجوجل وتيك توك، باستهداف دقيق واختبارات مستمرة وتقرير واضح بيقول لك وين راحت كل ليرة.',
      en: 'Paid campaigns on Meta, Google, and TikTok — precise targeting, continuous testing, and a report that shows exactly where every shekel went.',
    },
    items: {
      ar: ['إعلانات ميتا', 'إعلانات جوجل', 'إعلانات تيك توك', 'تحليل وتحسين'],
      en: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Analysis & optimisation'],
    },
  },
  {
    id: 'subs',
    icon: 'subs',
    title: { ar: 'اشتراك تطبيقات', en: 'App Subscriptions' },
    desc: {
      ar: 'اشتراكات أصلية للتطبيقات والخدمات الرقمية بأسعار مناسبة، تفعيل سريع، ودعم بيضل معك طول مدة الاشتراك.',
      en: 'Genuine subscriptions for apps and digital services — fair pricing, fast activation, and support for the whole term.',
    },
    items: {
      ar: ['تفعيل سريع', 'اشتراكات أصلية', 'أسعار مناسبة', 'دعم مستمر'],
      en: ['Fast activation', 'Genuine accounts', 'Fair pricing', 'Ongoing support'],
    },
  },
];

/* ---------------------------------------------------------------------------
   3) نتائج إدارة الصفحات — قبل / بعد
      Page management results — before / after

      الأرقام مأخوذة من لقطات حسابات العملاء. عدّلها لما تتحدّث.
      Figures taken from client account screenshots. Update as they change.
   --------------------------------------------------------------------------- */
WASLA.results = [
  {
    handle: 'rowan_gaza22',
    url: 'https://www.instagram.com/rowan_gaza22',
    field: { ar: 'عمل إنساني وإغاثة', en: 'Humanitarian & relief' },
    note: {
      ar: 'حساب توثيق وتبرعات — بنينا خطة نشر يومية وهوية بصرية موحّدة للستوري والبوست.',
      en: 'A documentation and donations account — daily publishing plan and a unified visual identity for stories and posts.',
    },
    before: { followers: 5685, posts: 52 },
    after: { followers: 604000, posts: 372 },
  },
  {
    handle: 'gialahham',
    url: 'https://www.instagram.com/gialahham',
    field: { ar: 'خبيرة تجميل ومحتوى', en: 'Makeup artist & creator' },
    note: {
      ar: 'حساب مهني من الصفر تقريبًا — بنينا المحتوى والريلز حتى وصل لتوثيق المنصة وتعاونات مع علامات عالمية.',
      en: 'A professional account built from near-zero — content and reels until platform verification and global brand collaborations.',
    },
    before: { followers: 97, posts: 15 },
    after: { followers: 17400, posts: 117 },
  },
];

/* ---------------------------------------------------------------------------
   4) معرض الأعمال — Portfolio
      category: branding | web | apps | social | graphic | video | ads | subs
      cover / images[].file: اسم الملف بدون امتداد داخل assets/img/projects/
   --------------------------------------------------------------------------- */
WASLA.projects = [
  {
    id: 'smiledental',
    client: 'SmileDental',
    title: { ar: 'حملة محتوى لعيادة أسنان', en: 'Dental Clinic Content Campaign' },
    category: ['graphic', 'social'],
    cover: 'smiledental-01-bulb',
    summary: {
      ar: 'سلسلة بوستات بأسلوب بصري موحّد لعيادة أسنان: فكرة واحدة بكل تصميم، عنوان قصير بالعامية، ومعالجة ثلاثية الأبعاد للسن كبطل الصورة.',
      en: 'A series of posts with one consistent visual system for a dental clinic: one idea per design, a short colloquial headline, and a 3D tooth as the hero of every frame.',
    },
    tags: { ar: ['تصميم بوستات', 'اتجاه فني', 'كتابة إعلانية'], en: ['Post design', 'Art direction', 'Copywriting'] },
    images: [
      { file: 'smiledental-01-bulb',    caption: { ar: 'مهمتنا نخليها تنوّر تاني', en: 'Our job: making it shine again' } },
      { file: 'smiledental-02-implant', caption: { ar: 'تركيبات خارقة', en: 'Super implants' } },
      { file: 'smiledental-03-coffee',  caption: { ar: 'اشرب قهوتك ومتقلقش، حتفضل بيضا', en: 'Drink your coffee — they will stay white' } },
      { file: 'smiledental-04-pharaoh', caption: { ar: 'ضرس يعيش لسنين طويلة', en: 'A tooth that lasts for years' } },
      { file: 'smiledental-05-puzzle',  caption: { ar: 'التصليح لعبتنا', en: 'Repair is our game' } },
      { file: 'smiledental-06-smoking', caption: { ar: 'ضرس يعيش لسنين طويلة — التدخين', en: 'A tooth that lasts — smoking' } },
    ],
  },
  {
    id: 'react',
    client: 'React — For Creative Solutions',
    title: { ar: 'بوستات ترويجية لشركة حلول تقنية', en: 'Promo Posts for a Tech Solutions Company' },
    category: ['graphic', 'social', 'ads'],
    cover: 'react-01-sonoff',
    summary: {
      ar: 'تصاميم ترويجية لشركة حلول تقنية: إطلاق منتج سمارت هوم بعرض خصم، إعلان مشاركة في معرض، وبوست تعريفي بحلول RFID.',
      en: 'Promotional designs for a tech solutions company: a smart-home product launch with a discount offer, an expo participation announcement, and an explainer post for RFID solutions.',
    },
    tags: { ar: ['بوست منتج', 'إعلان فعالية', 'محتوى تقني'], en: ['Product post', 'Event ad', 'Tech content'] },
    images: [
      { file: 'react-01-sonoff', caption: { ar: 'Sonoff T2 US 3C — تحكم كامل بإضاءة منزلك', en: 'Sonoff T2 US 3C — full control of your home lighting' } },
      { file: 'react-02-homex',  caption: { ar: 'معرض Homex — لو معاك 4000 جنيه هتعمل بيهم إيه؟', en: 'Homex expo — what would you do with 4,000 EGP?' } },
      { file: 'react-03-rfid',   caption: { ar: 'كيف وفّرت شركة 70% من وقتها باستخدام RFID', en: 'How a company saved 70% of its time with RFID' } },
    ],
  },
  {
    id: 'matcha',
    client: 'Luckin Coffee',
    title: { ar: 'بوستر منتج — ماتشا', en: 'Product Poster — Matcha' },
    category: ['graphic'],
    cover: 'luckin-01-matcha',
    summary: {
      ar: 'بوستر منتج بلوحة ألوان أحادية مبنية على لون الماتشا نفسه، مع طباعة عربية عريضة ومنظور أرضي بيسحب العين على الكوب.',
      en: 'A product poster built on a monochrome palette drawn from the matcha itself, with heavy Arabic type and a ground-level perspective that pulls the eye to the cup.',
    },
    tags: { ar: ['تصميم بوستر', 'تصوير منتج', 'طباعة عربية'], en: ['Poster design', 'Product visual', 'Arabic typography'] },
    images: [
      { file: 'luckin-01-matcha', caption: { ar: 'ماتشا', en: 'Matcha' } },
    ],
  },
];

/* ---------------------------------------------------------------------------
   5) طريقة الشغل — How we work
   --------------------------------------------------------------------------- */
WASLA.process = [
  {
    title: { ar: 'نسمع منك', en: 'We listen' },
    desc: { ar: 'جلسة نفهم فيها شغلك، جمهورك، ومنافسينك — وشو النتيجة اللي بتقيس عليها النجاح.', en: 'A session to understand your business, audience, and competitors — and the result you measure success by.' },
  },
  {
    title: { ar: 'نحطّ الخطة', en: 'We plan' },
    desc: { ar: 'رسالة واضحة، قنوات محدّدة، جدول زمني، وسعر مكتوب قبل ما نبلش.', en: 'A clear message, chosen channels, a timeline, and a written price before anything starts.' },
  },
  {
    title: { ar: 'ننفّذ', en: 'We build' },
    desc: { ar: 'تصميم وتطوير وإنتاج، مع مراجعة معك آخر كل مرحلة — بدون مفاجآت.', en: 'Design, development, and production, with a review with you at the end of every stage — no surprises.' },
  },
  {
    title: { ar: 'نطلق ونقيس', en: 'We launch & measure' },
    desc: { ar: 'نطلق، نتابع الأرقام، ونحسّن بناءً عليها. التقرير بيوصلك مش لازم تطلبه.', en: 'We launch, watch the numbers, and improve from them. The report reaches you without asking.' },
  },
];

/* ---------------------------------------------------------------------------
   6) ليش وصلة — Why us
   --------------------------------------------------------------------------- */
WASLA.why = [
  {
    icon: 'layers',
    title: { ar: 'فريق واحد لكل شي', en: 'One team for everything' },
    desc: { ar: 'من الشعار للموقع للحملة الإعلانية — بدون ما تلاحق على أكثر من جهة وتشرح القصة من الأول كل مرة.', en: 'From logo to website to ad campaign — no chasing multiple vendors and re-explaining the story each time.' },
  },
  {
    icon: 'chart',
    title: { ar: 'بنشتغل بالأرقام', en: 'We work by the numbers' },
    desc: { ar: 'كل قرار مبني على بيانات، وكل شهر بيوصلك تقرير بيقول شو صار وليش.', en: 'Every decision comes from data, and every month you get a report saying what happened and why.' },
  },
  {
    icon: 'clock',
    title: { ar: 'مواعيد بنلتزم فيها', en: 'Deadlines we keep' },
    desc: { ar: 'جدول زمني مكتوب من أول يوم، وتحديث دوري على وين واصل الشغل.', en: 'A written timeline from day one, and regular updates on where the work stands.' },
  },
  {
    icon: 'shield',
    title: { ar: 'دعم بعد التسليم', en: 'Support after delivery' },
    desc: { ar: 'التسليم مش نهاية الشغل — بنضل معك بالتعديلات والصيانة والأسئلة.', en: 'Delivery is not the end — we stay on for edits, maintenance, and questions.' },
  },
];

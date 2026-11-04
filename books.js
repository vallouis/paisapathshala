/* All content for the hub lives in this one file.
   To add a book: copy the first entry, change the slug, text and status to "live",
   put images in books/<slug>/img/ named page-0.png (cover) to page-4.png. */

window.SITE = {
  name: { en: "Paisa Pathshala", hi: "पैसा पाठशाला", mr: "पैसा पाठशाळा" }
};

window.UI = {
  en: {
    tagline: "Money lessons where you are the hero. Free for everyone.",
    heroTitle: "Who is the hero of this story?",
    heroSub: "That's you! Type your name and pick your look.",
    nameLabel: "Your name",
    boy: "Boy",
    girl: "Girl",
    start: "Start the story",
    needName: "Please type your name.",
    change: "Change hero",
    trail: "Your journey",
    starring: "Starring",
    promise: "My Money Promise",
    sign: "Signed",
    date: "Date",
    library: "Our books",
    read: "Read",
    soon: "Coming soon",
    level: "Grades 6 to 10",
    pages: "10 pages",
    print: "Save as PDF / Print",
    share: "Share on WhatsApp",
    back: "All books",
    cover: "Cover",
    remember: "Remember this",
    quiz: "Quiz time",
    answer: "Show answer",
    page: "Page",
    art: "Picture",
    disclaimer: "These books teach basic money ideas. They are not investment advice.",
    notfound: "Book not found.",
    lang: "Language"
  },
  hi: {
    tagline: "पैसों के सबक, जिनमें हीरो तुम हो। सबके लिए मुफ़्त।",
    heroTitle: "इस कहानी का हीरो कौन है?",
    heroSub: "वो तुम हो! अपना नाम लिखो और अपना रूप चुनो।",
    nameLabel: "तुम्हारा नाम",
    boy: "लड़का",
    girl: "लड़की",
    start: "कहानी शुरू करें",
    needName: "कृपया अपना नाम लिखें।",
    change: "हीरो बदलें",
    trail: "तुम्हारा सफ़र",
    starring: "मुख्य किरदार",
    promise: "मेरा पैसों का वादा",
    sign: "हस्ताक्षर",
    date: "तारीख",
    library: "हमारी किताबें",
    read: "पढ़ें",
    soon: "जल्द आ रही है",
    level: "कक्षा 6 से 10",
    pages: "10 पेज",
    print: "PDF सहेजें / प्रिंट करें",
    share: "WhatsApp पर भेजें",
    back: "सभी किताबें",
    cover: "कवर",
    remember: "याद रखें",
    quiz: "क्विज़ का समय",
    answer: "उत्तर देखें",
    page: "पेज",
    art: "चित्र",
    disclaimer: "ये किताबें पैसों की बुनियादी बातें सिखाती हैं। यह निवेश की सलाह नहीं है।",
    notfound: "किताब नहीं मिली।",
    lang: "भाषा"
  },
  mr: {
    tagline: "पैशांचे धडे, ज्यात हिरो तू आहेस. सर्वांसाठी मोफत.",
    heroTitle: "या गोष्टीचा हिरो कोण आहे?",
    heroSub: "तो तू आहेस! तुझं नाव लिही आणि तुझा लूक निवड.",
    nameLabel: "तुझं नाव",
    boy: "मुलगा",
    girl: "मुलगी",
    start: "गोष्ट सुरू करा",
    needName: "तुझं नाव लिही.",
    change: "हिरो बदला",
    trail: "तुझा प्रवास",
    starring: "मुख्य पात्र",
    promise: "माझं पैशांचं वचन",
    sign: "स्वाक्षरी",
    date: "तारीख",
    library: "आमची पुस्तके",
    read: "वाचा",
    soon: "लवकरच येत आहे",
    level: "इयत्ता ६ ते १०",
    pages: "१० पाने",
    print: "PDF जतन करा / प्रिंट करा",
    share: "WhatsApp वर पाठवा",
    back: "सर्व पुस्तके",
    cover: "मुखपृष्ठ",
    remember: "लक्षात ठेवा",
    quiz: "प्रश्नमंजुषा",
    answer: "उत्तर पाहा",
    page: "पान",
    art: "चित्र",
    disclaimer: "ही पुस्तके पैशांच्या मूलभूत गोष्टी शिकवतात. हा गुंतवणुकीचा सल्ला नाही.",
    notfound: "पुस्तक सापडले नाही.",
    lang: "भाषा"
  }
};

window.BOOKS = [
  {
    slug: "needs-vs-wants",
    status: "live",
    color: "#ffd166",
    /* Text templates: {name} is the reader's name. [[a|b]] picks a (boy) or b (girl) for gendered Hindi/Marathi endings. */
    title: { en: "{name} and the Treasure Trail", hi: "{name} और खज़ाने की राह", mr: "{name} आणि खजिन्याची वाट" },
    subtitle: { en: "Needs and Wants", hi: "ज़रूरत और चाहत", mr: "गरज आणि इच्छा" },
    topic: { en: "Spending", hi: "खर्च", mr: "खर्च" },
    stops: {
      en: ["Home", "The Fair", "Kaka's Shop", "The Treasure"],
      hi: ["घर", "मेला", "काका की दुकान", "खज़ाना"],
      mr: ["घर", "जत्रा", "काकांचं दुकान", "खजिना"]
    },
    scenes: [
      "Aaji gives you a 100 rupee note while Gullu the piggy jar wobbles and talks.",
      "At the fair you see toys, jalebis and balloons. Gullu peeks out of your bag and reminds you about your notebook and pencil.",
      "Kaka shows you the Needs basket and the Wants basket.",
      "You drop the last 50 rupees into Gullu and share a jalebi with Aaji."
    ],
    story: {
      en: [
        "Fair week had begun in your village! Aaji smiled and gave you a crisp 100 rupee note. \"This is for the whole week, {name}. Use it wisely.\" You tucked it into your bag. Then something amazing happened. Your clay piggy jar wobbled and said, \"Hello, {name}! I am Gullu. Let's go on a treasure trail together!\"",
        "At the fair, your eyes grew big. A shiny toy car! Golden jalebis! A rainbow balloon! \"I want them all!\" you cried. Gullu peeked out of your bag. \"Wait, {name},\" he whispered. \"Look at your things. Your notebook is full and your pencil is tiny. What will you use at school?\" You stopped and thought.",
        "Kaka the shopkeeper saw you thinking. He held up two baskets. \"This one is for NEEDS, things you must have, like food, a notebook, medicine. This one is for WANTS, things that are nice to have, like toys and sweets. Both are okay, {name}. But remember the treasure rule: needs first, then a little fun, then save.\" Gullu giggled. \"That is the map to the treasure!\"",
        "You bought a notebook for 30 rupees and a pencil for 10. Then you bought one jalebi for 10 rupees and shared it with Aaji. Back home, you dropped the last 50 rupees into Gullu. Clink! \"We found the treasure, {name}!\" said Gullu. \"A wise mind and a little saving.\""
      ],
      hi: [
        "तुम्हारे गाँव में मेले का हफ़्ता शुरू हो गया था! दादी ने मुस्कुराकर तुम्हें सौ रुपये का नया नोट दिया। \"यह पूरे हफ़्ते के लिए है, {name}। समझदारी से खर्च करना।\" तुमने नोट अपने बस्ते में रख लिया। तभी एक कमाल हो गया। ताक पर रखा तुम्हारा मिट्टी का गुल्लक हिला और बोला, \"नमस्ते, {name}! मैं गुल्लू हूँ। चलो, साथ मिलकर खज़ाने की राह पर चलें!\"",
        "मेले में तुम्हारी आँखें फैल गईं। चमकती खिलौना कार! सुनहरी जलेबियाँ! इंद्रधनुषी गुब्बारा! \"मुझे सब चाहिए!\" तुम चिल्ला उठ[[े|ीं]]। गुल्लू बस्ते से झाँका। \"रुको, {name},\" उसने फुसफुसाकर कहा। \"अपना सामान देखो। तुम्हारी कॉपी भर चुकी है और पेंसिल बहुत छोटी रह गई है। स्कूल में क्या इस्तेमाल करोग[[े|ी]]?\" तुम रुक ग[[ए|ईं]] और सोचने लग[[े|ीं]]।",
        "काका दुकानदार ने तुम्हें सोचते देखा। उन्होंने दो टोकरियाँ उठाईं। \"यह ज़रूरत की टोकरी है: जो चीज़ें चाहिए ही चाहिए, जैसे खाना, कॉपी, दवा। यह चाहत की टोकरी है: जो चीज़ें अच्छी लगती हैं, जैसे खिलौने और मिठाई। दोनों ठीक हैं, {name}। पर खज़ाने का नियम याद रखना: पहले ज़रूरत, फिर थोड़ी मौज, फिर बचत।\" गुल्लू खिलखिलाया। \"यही तो खज़ाने का नक्शा है!\"",
        "तुमने तीस रुपये की कॉपी और दस रुपये की पेंसिल खरीदी। फिर दस रुपये की एक जलेबी ली और दादी के साथ बाँटकर खाई। घर लौटकर तुमने बचे हुए पचास रुपये गुल्लू में डाल दिए। खन! \"हमें खज़ाना मिल गया, {name}!\" गुल्लू ने कहा। \"समझदार सोच और थोड़ी-सी बचत।\""
      ],
      mr: [
        "तुझ्या गावात जत्रेचा आठवडा सुरू झाला होता! आजीने हसून तुला शंभर रुपयांची कोरी नोट दिली. \"हे पूर्ण आठवड्यासाठी आहे, {name}. हुशारीने खर्च कर.\" तू ती नोट आपल्या दप्तरात ठेवलीस. तेवढ्यात एक गंमत झाली. फडताळावर ठेवलेला तुझा मातीचा गल्ला हलला आणि म्हणाला, \"नमस्कार, {name}! मी गल्लू. चल, आपण दोघे मिळून खजिन्याच्या वाटेवर जाऊ!\"",
        "जत्रेत तुझे डोळे विस्फारले. चमचमती खेळण्यातली गाडी! सोनेरी जिलब्या! इंद्रधनुषी रंगाचा फुगा! \"मला सगळं हवं!\" तू ओरडल[[ास|ीस]]. गल्लू दप्तरातून डोकावला. \"थांब, {name},\" तो कुजबुजला. \"तुझ्या वस्तू बघ. तुझी वही भरली आहे आणि पेन्सिल खूप लहान झाली आहे. शाळेत काय वापरशील?\" तू थांबल[[ास|ीस]] आणि विचारात पडल[[ास|ीस]].",
        "काका दुकानदाराने तुला विचार करताना पाहिलं. त्यांनी दोन टोपल्या उचलल्या. \"ही गरजेची टोपली: जी गोष्ट हवीच, जसं जेवण, वही, औषध. ही इच्छेची टोपली: जी गोष्ट छान वाटते, जसं खेळणी आणि मिठाई. दोन्ही ठीक आहेत, {name}. पण खजिन्याचा नियम लक्षात ठेव: आधी गरज, मग थोडी मजा, मग बचत.\" गल्लू खुदकन हसला. \"हाच तर खजिन्याचा नकाशा आहे!\"",
        "तू तीस रुपयांची वही आणि दहा रुपयांची पेन्सिल घेतलीस. मग दहा रुपयांची एक जिलबी घेऊन आजीसोबत वाटून खाल्लीस. घरी आल्यावर उरलेले पन्नास रुपये तू गल्लूमध्ये टाकलेस. खळ्ळ! \"आपल्याला खजिना सापडला, {name}!\" गल्लू म्हणाला. \"हुशार विचार आणि थोडी बचत.\""
      ]
    },
    recap: {
      en: {
        remember: ["A need is something you must have.", "A want is something nice to have.", "Needs first, then a little fun, then save.", "Gullu says: always save a little."],
        quiz: [
          { q: "Which one is a need: a toy car or a notebook?", a: "A notebook." },
          { q: "Is it wrong to buy something you want?", a: "No. Just take care of your needs first." },
          { q: "You have 100 rupees and spend 40 on a notebook and pencil. How much is left?", a: "60 rupees." }
        ],
        promise: "I, {name}, promise to think of needs first, then a little fun, and then to save."
      },
      hi: {
        remember: ["ज़रूरत वह है जो चाहिए ही चाहिए।", "चाहत वह है जो अच्छी लगती है।", "पहले ज़रूरत, फिर थोड़ी मौज, फिर बचत।", "गुल्लू कहता है: थोड़ा ज़रूर बचाओ।"],
        quiz: [
          { q: "कौन सी चीज़ ज़रूरत है: खिलौना कार या कॉपी?", a: "कॉपी।" },
          { q: "क्या अपनी पसंद की चीज़ खरीदना गलत है?", a: "नहीं। बस पहले अपनी ज़रूरतें पूरी करें।" },
          { q: "तुम्हारे पास सौ रुपये हैं और चालीस रुपये कॉपी और पेंसिल पर खर्च किए। कितने बचे?", a: "साठ रुपये।" }
        ],
        promise: "मैं, {name}, वादा करत[[ा|ी]] हूँ कि पहले ज़रूरत, फिर थोड़ी मौज, और फिर बचत के बारे में सोचूँग[[ा|ी]]।"
      },
      mr: {
        remember: ["गरज म्हणजे जी गोष्ट हवीच.", "इच्छा म्हणजे जी गोष्ट छान वाटते.", "आधी गरज, मग थोडी मजा, मग बचत.", "गल्लू म्हणतो: थोडी बचत नक्की कर."],
        quiz: [
          { q: "खेळण्यातली गाडी की वही, यापैकी गरज कोणती?", a: "वही." },
          { q: "आपल्याला हवी ती गोष्ट घेणं चुकीचं आहे का?", a: "नाही. फक्त आधी आपल्या गरजा पूर्ण करा." },
          { q: "तुझ्याकडे शंभर रुपये आहेत आणि चाळीस रुपये वही आणि पेन्सिलवर खर्च केले. किती उरले?", a: "साठ रुपये." }
        ],
        promise: "मी, {name}, वचन देत[[ो|े]] की आधी गरज, मग थोडी मजा, आणि मग बचत, असा विचार करीन."
      }
    }
  },

  /* Coming soon entries: only title and topic needed. */
  { slug: "piggy-jar", status: "soon", color: "#ef8354",
    title: { en: "The Piggy Jar: Why We Save", hi: "गुल्लक: हम बचत क्यों करते हैं", mr: "गल्ला: आपण बचत का करतो" },
    topic: { en: "Saving", hi: "बचत", mr: "बचत" } },
  { slug: "inside-a-bank", status: "soon", color: "#7bdff2",
    title: { en: "Inside a Bank", hi: "बैंक के अंदर क्या होता है", mr: "बँकेच्या आत काय असतं" },
    topic: { en: "Banking", hi: "बैंकिंग", mr: "बँकिंग" } },
  { slug: "family-budget", status: "soon", color: "#b2f7ef",
    title: { en: "The Family Budget", hi: "घर का बजट", mr: "घरचं बजेट" },
    topic: { en: "Budgeting", hi: "बजट", mr: "बजेट" } },
  { slug: "what-is-interest", status: "soon", color: "#f7d6e0",
    title: { en: "What is Interest?", hi: "ब्याज क्या होता है", mr: "व्याज म्हणजे काय" },
    topic: { en: "Interest", hi: "ब्याज", mr: "व्याज" } },
  { slug: "why-prices-rise", status: "soon", color: "#f2b5d4",
    title: { en: "Why Prices Go Up", hi: "चीज़ें महँगी क्यों होती हैं (महँगाई)", mr: "वस्तू महाग का होतात (महागाई)" },
    topic: { en: "Inflation", hi: "महँगाई", mr: "महागाई" } },
  { slug: "phone-scams", status: "soon", color: "#ffb4a2",
    title: { en: "Fraud Alert: UPI and Phone Scams", hi: "सावधान: UPI और फ़ोन ठगी", mr: "सावधान: UPI आणि फोन फसवणूक" },
    topic: { en: "Safety", hi: "सुरक्षा", mr: "सुरक्षा" } },
  { slug: "moneylender-or-bank", status: "soon", color: "#cdb4db",
    title: { en: "Moneylender or Bank?", hi: "साहूकार या बैंक?", mr: "सावकार की बँक?" },
    topic: { en: "Borrowing", hi: "कर्ज़", mr: "कर्ज" } },
  { slug: "insurance", status: "soon", color: "#a2d2ff",
    title: { en: "Insurance: An Umbrella for Rainy Days", hi: "बीमा: बरसात में छतरी जैसा", mr: "विमा: पावसातल्या छत्रीसारखा" },
    topic: { en: "Protection", hi: "सुरक्षा कवच", mr: "सुरक्षा कवच" } },
  { slug: "emergency-fund", status: "soon", color: "#caffbf",
    title: { en: "The Emergency Fund", hi: "आपातकालीन बचत", mr: "आणीबाणीसाठीची बचत" },
    topic: { en: "Saving", hi: "बचत", mr: "बचत" } }
];

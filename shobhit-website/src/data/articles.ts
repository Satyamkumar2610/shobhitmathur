export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  year: number;
  publication: string;
  publicationUrl?: string;
  category:
    | "Education & Pedagogy"
    | "Public Policy & Governance"
    | "Technology & Innovation"
    | "Academic Research";
  subcategory: string;
  coAuthors?: string[];
  externalUrl: string;
  featured: boolean;
  readingTime?: number; // minutes
  tags?: string[];
  thumbnail?: string; // path relative to /public, e.g. "/images/articles/my-article.jpg"
}

export const ARTICLES: Article[] = [
  {
    id: "SM-035",
    slug: "let-experience-into-the-classroom",
    title: "Let experience into the classroom",
    excerpt:
      "With faculty vacancies exceeding 28% across major institutions, India's rigid caps on Professors of Practice are holding higher education back. As AI reshapes what's worth teaching, universities need accomplished practitioners in permanent roles — not token four-year appointments.",
    date: "2026-10-06",
    year: 2026,
    publication: "The Pioneer",
    publicationUrl: "https://dailypioneer.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: ["Yashowardhan Tiwari"],
    externalUrl:
      "https://dailypioneer.com/news/slug-lite/let-experience-into--the-classroom?year=2026",
    featured: true,
    readingTime: 5,
    tags: ["Professors of Practice", "Faculty Reform", "Higher Education"],
  },
  {
    id: "SM-036",
    slug: "india-uae-partnership-transform-indian-universities",
    title: "Why the India-UAE partnership must now transform Indian universities",
    excerpt:
      "India and the UAE share a deep history of trade, energy, and migration ties. The next phase of this partnership will be judged by whether it can help India build the universities and research ecosystems the country needs for the age of artificial intelligence.",
    date: "2026-10-01",
    year: 2026,
    publication: "Education World",
    publicationUrl: "https://educationworld.in",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: [],
    externalUrl:
      "https://educationworld.in/why-the-india-uae-partnership-must-now-transform-indian-universities/",
    featured: false,
    readingTime: 6,
    tags: ["India-UAE", "Higher Education", "Internationalisation"],
  },
  {
    id: "SM-033",
    slug: "can-indian-universities-close-the-ai-ethics-gap",
    title: "Can Indian universities close the AI ethics gap?",
    excerpt:
      "As artificial intelligence reshapes industry and governance, Indian universities face a critical challenge: building the ethical frameworks and institutional capacity needed to lead responsibly in the AI era.",
    date: "2026-09-15",
    year: 2026,
    publication: "The Hindu",
    publicationUrl: "https://www.thehindu.com",
    category: "Technology & Innovation",
    subcategory: "AI Implications",
    coAuthors: [],
    externalUrl:
      "https://www.thehindu.com/education/can-indian-universities-close-the-ai-ethics-gap/article71459281.ece",
    featured: false,
    readingTime: 5,
    tags: ["AI Ethics", "Higher Education", "Technology Policy"],
  },
  {
    id: "SM-034",
    slug: "self-contained-civilisation-shenzhen-lesson-for-india",
    title:
      "Self-contained civilisation: Indian co-founder visits Shenzhen, returns with a lesson for India",
    excerpt:
      "A visit to Shenzhen's vertically integrated manufacturing ecosystem reveals what India must build to compete — not just supply chain efficiency, but civilisational self-sufficiency in technology and production.",
    date: "2026-09-24",
    year: 2026,
    publication: "Business Today",
    publicationUrl: "https://www.businesstoday.in",
    category: "Technology & Innovation",
    subcategory: "Frugal Innovation",
    coAuthors: [],
    externalUrl:
      "https://www.businesstoday.in/latest/trends/story/self-contained-civilisation-indian-co-founder-visits-shenzhen-returns-with-a-lesson-for-india-557571-2026-09-24",
    featured: false,
    readingTime: 6,
    tags: ["Manufacturing", "China", "India", "Technology Policy"],
  },
  {
    id: "SM-RP-001",
    slug: "judicial-resistance-efficiency-reforms-indian-courts",
    title:
      "A qualitative study of judicial resistance to efficiency reforms in Indian courts",
    excerpt:
      "As a cornerstone of the world's largest democracy, the Indian judicial system, currently grappling with approximately 50 million cases, struggles with implementing court efficiency reforms. This pioneering qualitative study examines the experiences and perspectives of district court judges to comprehend these difficulties.",
    date: "2026-08-06",
    year: 2026,
    publication:
      "International Journal of Public Sector Performance Management",
    publicationUrl: "https://www.inderscienceonline.com",
    category: "Academic Research",
    subcategory: "Public Policy & Governance",
    coAuthors: [],
    externalUrl:
      "https://www.inderscienceonline.com/doi/abs/10.1504/IJPSPM.2026.155593",
    featured: false,
    tags: ["Judicial Experience", "Efficiency Reforms", "Indian Courts"],
  },
  {
    id: "SM-RP-002",
    slug: "community-justice-systems-in-india",
    title:
      "Community Justice Systems in India – The Urgent Need to Revive Them",
    excerpt:
      "An exploration of community justice systems in India and the urgent need to revive them for restorative justice and better civic governance.",
    date: "2024-05-19",
    year: 2024,
    publication: "Internet Journal of Restorative Justice",
    publicationUrl: "https://www.rj4allpublications.com",
    category: "Academic Research",
    subcategory: "Public Policy & Governance",
    coAuthors: [],
    externalUrl:
      "https://www.rj4allpublications.com/product/community-justice-systems-india/",
    featured: false,
    tags: ["Restorative Justice", "Community Justice", "India"],
  },
  {
    id: "SM-001",
    slug: "neet-restructured-end-question-paper-leaks",
    title: "How the NEET can be restructured to end question paper leaks",
    excerpt:
      "Examination leaks erode student morale and damage institutional credibility. Rebuilding faith in national entrance tests like NEET requires integrating modern computerized testing infrastructure with accountable state governance.",
    date: "2026-08-05",
    year: 2026,
    publication: "The Hindu",
    publicationUrl: "https://www.thehindu.com",
    category: "Education & Pedagogy",
    subcategory: "Systemic Reform",
    coAuthors: [],
    externalUrl:
      "https://www.thehindu.com/education/how-the-neet-can-be-restructured-to-end-question-paper-leaks/article71279765.ece",
    featured: true,
    readingTime: 5,
    tags: ["NEET", "Exam Reform", "Education Policy"],
    thumbnail: "/images/articles/neet-restructured-end-question-paper-leaks.jpg",
  },
  {
    id: "SM-002",
    slug: "gen-z-rules-workplace-universities-out-of-touch",
    title:
      "Gen Z rules the workplace — but Indian universities are out of touch",
    excerpt:
      "A generational transition is underway in workplaces across India. Universities must urgently rethink how they prepare students for a world defined by adaptability, purpose, and multidisciplinary thinking.",
    date: "2026-09-01",
    year: 2026,
    publication: "ThePrint",
    publicationUrl: "https://theprint.in",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: [],
    externalUrl:
      "https://theprint.in/opinion/gen-z-rules-workplace-authority-generational-transition/3026109/",
    featured: true,
    readingTime: 6,
    tags: ["Gen Z", "Higher Education", "Universities", "NEP 2020"],
    thumbnail: "/images/articles/gen-z-rules-workplace-universities-out-of-touch.jpg",
  },
  {
    id: "SM-003",
    slug: "india-physics-olympiad-schools-built-for-exceptional-minds",
    title:
      "India topped the Physics Olympiad. Now it needs schools built for minds like these",
    excerpt:
      "India's triumphant performance at the International Physics Olympiad demonstrates the immense raw intellect of our students. Yet our standard classrooms fail to nurture exceptional talent. We need specialized institutions designed for extraordinary minds.",
    date: "2026-07-29",
    year: 2026,
    publication: "ThePrint",
    publicationUrl: "https://theprint.in",
    category: "Education & Pedagogy",
    subcategory: "Pedagogy",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://theprint.in/opinion/india-topped-the-physics-olympiad-now-it-needs-schools-built-for-minds-like-these/2999476/",
    featured: true,
    readingTime: 5,
    tags: ["Physics Olympiad", "Talent", "Gifted Education"],
    thumbnail: "/images/articles/india-physics-olympiad-schools-built-for-exceptional-minds.jpg",
  },
  {
    id: "SM-004",
    slug: "what-india-can-learn-from-america-at-250",
    title: "What India can learn from America at 250",
    excerpt:
      "As the United States marks 250 years of its founding, India should reflect on constitutional resilience, institutional balance, and state capacity. Building robust civic systems and transparent laws is foundational for sustainable nation-building.",
    date: "2026-07-07",
    year: 2026,
    publication: "ThePrint",
    publicationUrl: "https://theprint.in",
    category: "Public Policy & Governance",
    subcategory: "Nation-Building",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://theprint.in/opinion/india-can-learn-from-america-at-250/2979197/",
    featured: false,
    readingTime: 6,
    tags: ["Governance", "Nation-Building", "Constitutional Resilience"],
    thumbnail: "/images/articles/what-india-can-learn-from-america-at-250.jpg",
  },
  {
    id: "SM-005",
    slug: "india-digital-sovereignty-data-localisation-traffic-system",
    title:
      "India is mistaking data localisation for digital sovereignty. It must control the traffic system",
    excerpt:
      "True digital sovereignty cannot be achieved merely by storing bits within national borders. We must master the digital traffic architecture, core algorithms, and communication layers to secure our tech rise and strategic independence.",
    date: "2026-06-19",
    year: 2026,
    publication: "ThePrint",
    publicationUrl: "https://theprint.in",
    category: "Technology & Innovation",
    subcategory: "Digital Sovereignty",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://theprint.in/opinion/digital-sovereignty-india-data-localisation-ai/2963941/",
    featured: false,
    readingTime: 7,
    tags: ["Digital Sovereignty", "Data Localisation", "Technology Policy"],
    thumbnail: "/images/articles/india-digital-sovereignty-data-localisation-traffic-system.jpg",
  },
  {
    id: "SM-006",
    slug: "indias-development-ladder-after-ai",
    title: "India's development ladder after AI: What comes next?",
    excerpt:
      "The traditional pathway of climbing the developmental ladder through low-cost services and manual labor is rapidly shifting due to artificial intelligence. How India navigates AI implications will determine our economic future.",
    date: "2026-06-12",
    year: 2026,
    publication: "The Economic Times",
    publicationUrl: "https://economictimes.indiatimes.com",
    category: "Technology & Innovation",
    subcategory: "AI Implications",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://economictimes.indiatimes.com/opinion/et-commentary/indias-development-ladder-after-ai-what-comes-next/",
    featured: false,
    readingTime: 6,
    tags: ["AI", "Economic Development", "Future of Work"],
  },
  {
    id: "SM-007",
    slug: "india-new-economics-of-constraint",
    title: "India and the new economics of constraint",
    excerpt:
      "In an era of fractured supply chains and shifting global alliances, India faces a new economics of constraint. We must rethink our regulatory frameworks and strategic domestic capacity to build economic resilience.",
    date: "2026-05-28",
    year: 2026,
    publication: "The Economic Times",
    publicationUrl: "https://economictimes.indiatimes.com",
    category: "Public Policy & Governance",
    subcategory: "Regulatory Frameworks",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://economictimes.indiatimes.com/opinion/et-commentary/india-and-the-new-economics-of-constraint/",
    featured: false,
    readingTime: 5,
    tags: ["Economics", "Regulatory Reform", "Supply Chains"],
  },
  {
    id: "SM-008",
    slug: "why-education-must-teach-systems-thinking",
    title: "Why education must teach systems thinking",
    excerpt:
      "For over a century, modern education has been organised around disciplines. The defining challenges of our time emerge at intersections. What is missing is ways of thinking that enable individuals to operate in a world of deeply interconnected systems.",
    date: "2026-06-15",
    year: 2026,
    publication: "LinkedIn / ThePrint",
    category: "Education & Pedagogy",
    subcategory: "Pedagogy",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://www.linkedin.com/in/shobhitmathur/recent-activity/shares/",
    featured: false,
    readingTime: 5,
    tags: ["Systems Thinking", "Interdisciplinary", "Pedagogy"],
  },
  {
    id: "SM-009",
    slug: "university-townships-india-america",
    title:
      "University townships — India's chance to build its own version of what America got right",
    excerpt:
      "Vibrant university towns serve as powerful engines of innovation, research, and local economic development. Developing integrated higher education campuses in India can transform regional growth.",
    date: "2026-04-21",
    year: 2026,
    publication: "ThePrint",
    publicationUrl: "https://theprint.in",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://theprint.in/opinion/university-townships-indias-chance-to-build-its-own-version-of-what-america-got-right/2909965/",
    featured: false,
    readingTime: 6,
    tags: ["University Towns", "Higher Education", "Innovation"],
    thumbnail: "/images/articles/university-townships-india-america.jpg",
  },
  {
    id: "SM-010",
    slug: "for-profit-medical-colleges-education-defined-by-outcomes",
    title:
      "For-profit medical colleges are a step forward. Education is defined by outcomes, not ownership",
    excerpt:
      "Expanding access to healthcare training requires enabling responsible private capital. Allowing for-profit medical colleges will bridge massive capacity shortages while regulatory frameworks ensure educational quality.",
    date: "2026-02-11",
    year: 2026,
    publication: "ThePrint",
    publicationUrl: "https://theprint.in",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://theprint.in/opinion/for-profit-medical-colleges-education-ownership/2851299/",
    featured: false,
    readingTime: 5,
    tags: ["Medical Education", "Private Universities", "Healthcare"],
    thumbnail: "/images/articles/for-profit-medical-colleges-education-defined-by-outcomes.jpg",
  },
  {
    id: "SM-011",
    slug: "technology-education-key-to-indias-sovereignty",
    title: "Technology education key to India's sovereignty",
    excerpt:
      "Critical tech infrastructure demands homegrown talent and strategic educational programs. Fostering indigenous engineering and frugal innovation in our universities is essential to safeguard national digital security.",
    date: "2025-06-18",
    year: 2025,
    publication: "The Economic Times",
    publicationUrl: "https://economictimes.indiatimes.com",
    category: "Technology & Innovation",
    subcategory: "Frugal Innovation",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://economictimes.indiatimes.com/opinion/et-commentary/technology-education-key-to-indias-sovereignty/",
    featured: false,
    readingTime: 5,
    tags: ["Technology Education", "Sovereignty", "Innovation"],
  },
  {
    id: "SM-012",
    slug: "fit-to-learn-fit-to-lead-physical-education",
    title:
      "Fit to learn, fit to lead: Why India must rescue physical education now",
    excerpt:
      "Declining physical engagement and sedentary academic environments hinder cognitive growth. Re-integrating sports and movement into our classrooms and curriculum is vital for student leadership.",
    date: "2025-06-10",
    year: 2025,
    publication: "The Economic Times",
    publicationUrl: "https://economictimes.indiatimes.com",
    category: "Education & Pedagogy",
    subcategory: "Pedagogy",
    coAuthors: [],
    externalUrl:
      "https://economictimes.indiatimes.com/opinion/et-commentary/fit-to-learn-fit-to-lead-why-india-must-rescue-physical-education-now/",
    featured: false,
    readingTime: 4,
    tags: ["Physical Education", "Student Wellbeing", "Curriculum"],
  },
  {
    id: "SM-013",
    slug: "book-review-yuk-hui-technology-china",
    title:
      "Book Review: Yuk Hui's The Question Concerning Technology in China (2016)",
    excerpt:
      "What if technology is not universal — but civilizational? Yuk Hui's groundbreaking book challenges one of modernity's deepest assumptions: that technology is a neutral, universal force. A profound exploration of digital cosmotechnics and sovereignty.",
    date: "2025-06-04",
    year: 2025,
    publication: "LinkedIn Pulse",
    category: "Technology & Innovation",
    subcategory: "Digital Sovereignty",
    coAuthors: [],
    externalUrl:
      "https://www.linkedin.com/pulse/book-review-yuk-huis-question-concerning-technology-china-shobhit-mathur/",
    featured: false,
    readingTime: 7,
    tags: ["Book Review", "Technology Philosophy", "Digital Sovereignty"],
    thumbnail: "/images/articles/book-review-yuk-hui-technology-china.jpg",
  },
  {
    id: "SM-014",
    slug: "outdated-laws-stifling-private-universities",
    title: "Outdated Laws Are Stifling India's Private Universities",
    excerpt:
      "Regulatory rigidity and outdated governance laws are stifling private universities in India, preventing academic innovation, flexible student intake, and multidisciplinary education models essential for global competitiveness.",
    date: "2025-02-03",
    year: 2025,
    publication: "NDTV",
    publicationUrl: "https://www.ndtv.com",
    category: "Education & Pedagogy",
    subcategory: "Systemic Reform",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://www.ndtv.com/opinion/how-outdated-laws-are-stifling-indias-private-universities-7623703",
    featured: false,
    readingTime: 5,
    tags: ["Private Universities", "Regulatory Reform", "Higher Education"],
  },
  {
    id: "SM-015",
    slug: "emerging-trends-public-policy-education-india",
    title: "Emerging trends in Public Policy Education in India",
    excerpt:
      "India's rapid socioeconomic evolution demands specialized public policy education that bridges grassroots realities with rigorous institutional governance and evidence-based policymaking.",
    date: "2024-11-15",
    year: 2024,
    publication: "The Hindu",
    publicationUrl: "https://www.thehindu.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: ["Kankana Trivedi"],
    externalUrl:
      "https://www.thehindu.com/education/emerging-trends-in-public-policy-education-in-india/article68828680.ece",
    featured: false,
    readingTime: 6,
    tags: ["Public Policy Education", "Governance", "Higher Education"],
    thumbnail: "/images/articles/emerging-trends-public-policy-education-india.jpg",
  },
  {
    id: "SM-016",
    slug: "integrating-indian-knowledge-systems-nep-2020-gen-z",
    title:
      "Integrating Indian Knowledge Systems with NEP 2020: Building Leadership for Gen Z",
    excerpt:
      "Integrating Indian Knowledge Systems into modern university curricula enables students to develop holistic leadership, cultural grounding, and multidimensional problem-solving.",
    date: "2024-08-20",
    year: 2024,
    publication: "Financial Express",
    publicationUrl: "https://www.financialexpress.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: [],
    externalUrl:
      "https://www.financialexpress.com/jobs-career/education/integrating-indian-knowledge-systems-with-nep-2020-building-leadership-for-gen-z/3588921/",
    featured: false,
    readingTime: 5,
    tags: ["NEP 2020", "Indian Knowledge Systems", "Gen Z", "Leadership"],
  },
  {
    id: "SM-017",
    slug: "annual-cycle-leaks-stress-india-needs-new-exam-design",
    title:
      "To escape annual cycle of leaks and stress, India needs a new exam design",
    excerpt:
      "High-stakes, single-day competitive exams create immense pressure on students and foster corrupt coaching cartels. We propose a computerized, multi-stage assessment system to drive genuine systemic reform in education policy.",
    date: "2024-06-25",
    year: 2024,
    publication: "The Indian Express",
    publicationUrl: "https://indianexpress.com",
    category: "Education & Pedagogy",
    subcategory: "Systemic Reform",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://indianexpress.com/article/opinion/columns/escape-annual-cycle-leaks-stress-india-exam-design-9409735/",
    featured: false,
    readingTime: 7,
    tags: ["Exam Reform", "JEE", "NEET", "Assessment"],
    thumbnail: "/images/articles/annual-cycle-leaks-stress-india-needs-new-exam-design.jpg",
  },
  {
    id: "SM-018",
    slug: "educators-leverage-ai-educational-transformation",
    title: "Educators should leverage AI for an educational transformation",
    excerpt:
      "Artificial intelligence gives us an unprecedented opportunity to provide personalized tutoring at scale. Educational institutions and teachers must embrace EdTech and GenAI tools to personalize classroom pedagogy.",
    date: "2024-06-19",
    year: 2024,
    publication: "Livemint",
    publicationUrl: "https://www.livemint.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://www.livemint.com/opinion/online-views/educators-should-leverage-ai-for-an-educational-transformation-11718798993204.html",
    featured: false,
    readingTime: 5,
    tags: ["AI in Education", "EdTech", "Personalized Learning"],
  },
  {
    id: "SM-019",
    slug: "india-policy-support-entrepreneurial-universities",
    title: "India needs policy support for entrepreneurial universities",
    excerpt:
      "Transitioning Indian higher education from degree factories to entrepreneurship hubs requires responsive regulatory frameworks and government policies that support student startups and venture creation.",
    date: "2024-05-14",
    year: 2024,
    publication: "Hindustan Times",
    publicationUrl: "https://www.hindustantimes.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: [],
    externalUrl:
      "https://www.hindustantimes.com/ht-insight/knowledge/india-needs-policy-support-for-entrepreneurial-universities-101784099782572.html",
    featured: false,
    readingTime: 5,
    tags: ["Entrepreneurship", "Startup Ecosystem", "University Policy"],
    thumbnail: "/images/articles/india-policy-support-entrepreneurial-universities.jpg",
  },
  {
    id: "SM-020",
    slug: "india-needs-high-performing-private-universities-public-purpose",
    title:
      "Why India needs high-performing private universities with public purpose",
    excerpt:
      "Private universities must step up to meet global standards while grounding education in civic responsibility and nation-building values. Regulatory bodies should incentivize institutional autonomy.",
    date: "2024-03-08",
    year: 2024,
    publication: "NDTV",
    publicationUrl: "https://www.ndtv.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: [],
    externalUrl:
      "https://www.ndtv.com/opinion/why-india-needs-high-performing-private-universities-with-public-purpose-5198234",
    featured: false,
    readingTime: 6,
    tags: ["Private Universities", "Public Purpose", "Higher Education"],
  },
  {
    id: "SM-021",
    slug: "reimagining-permanent-government-reforming-civil-service",
    title:
      "Reimagining the permanent government: Reforming India's civil service architecture",
    excerpt:
      "The permanent government and civil bureaucracy must transition from administrative gatekeepers to mission-driven enablers. Strengthening institutional accountability and regulatory capacity is critical for civic governance.",
    date: "2023-11-20",
    year: 2023,
    publication: "Swarajya",
    publicationUrl: "https://swarajyamag.com",
    category: "Public Policy & Governance",
    subcategory: "Civic Systems",
    coAuthors: [],
    externalUrl:
      "https://swarajyamag.com/governance/reimagining-the-permanent-government-reforming-indias-civil-service-architecture/",
    featured: false,
    readingTime: 8,
    tags: ["Civil Service Reform", "Bureaucracy", "Governance"],
  },
  {
    id: "SM-022",
    slug: "india-opportunity-lead-fourth-industrial-revolution",
    title: "India has an opportunity to lead the fourth industrial revolution",
    excerpt:
      "India stands at a pivotal juncture where technological rise, digital adoption, and frugal innovation can position our industries at the forefront of the Fourth Industrial Revolution.",
    date: "2023-08-23",
    year: 2023,
    publication: "Livemint",
    publicationUrl: "https://www.livemint.com",
    category: "Technology & Innovation",
    subcategory: "Frugal Innovation",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://www.livemint.com/opinion/online-views/india-has-an-opportunity-to-lead-the-fourth-industrial-revolution-11692795493821.html",
    featured: false,
    readingTime: 6,
    tags: ["Industry 4.0", "Innovation", "Technology"],
  },
  {
    id: "SM-023",
    slug: "universities-lead-way-future-of-work",
    title: "Universities should lead the way as we adapt to the future of work",
    excerpt:
      "As artificial intelligence and automation reshape industry demands, universities must overhaul curricula to prioritize critical thinking, adaptability, and multidisciplinary skills for the future of work.",
    date: "2023-07-26",
    year: 2023,
    publication: "Livemint",
    publicationUrl: "https://www.livemint.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://www.livemint.com/opinion/online-views/universities-should-lead-the-way-as-we-adapt-to-the-future-of-work-11690374182903.html",
    featured: false,
    readingTime: 5,
    tags: ["Future of Work", "Curriculum", "AI Disruption"],
  },
  {
    id: "SM-024",
    slug: "on-academic-disciplines-india-take-leaf-from-us",
    title: "On academic disciplines, India could take a leaf out of US' book",
    excerpt:
      "Compartmentalizing education into rigid silos limits holistic thinking. Interdisciplinary learning and modern pedagogy are essential for equipping students with problem-solving skills for complex global challenges.",
    date: "2023-06-15",
    year: 2023,
    publication: "The Economic Times",
    publicationUrl: "https://economictimes.indiatimes.com",
    category: "Education & Pedagogy",
    subcategory: "Pedagogy",
    coAuthors: [],
    externalUrl:
      "https://economictimes.indiatimes.com/opinion/et-commentary/on-academic-disciplines-india-could-take-a-leaf-out-of-us-book/",
    featured: false,
    readingTime: 5,
    tags: ["Interdisciplinary", "Liberal Arts", "Pedagogy"],
  },
  {
    id: "SM-025",
    slug: "biographies-great-academic-institutions",
    title: "We need biographies written of our great academic institutions",
    excerpt:
      "Academic institutions carry deep institutional memory and cultural values. Documenting their biographies and historical milestones inspires upcoming generations and reinforces institutional excellence.",
    date: "2023-01-04",
    year: 2023,
    publication: "Livemint",
    publicationUrl: "https://www.livemint.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://www.livemint.com/opinion/online-views/we-need-biographies-written-of-our-great-academic-institutions-11672837492819.html",
    featured: false,
    readingTime: 5,
    tags: ["Institutional History", "Academic Culture", "Higher Education"],
  },
  {
    id: "SM-026",
    slug: "indian-universities-prepare-foreign-competition-at-home",
    title: "Indian universities must prepare for foreign competition at home",
    excerpt:
      "The entry of foreign universities into India presents both opportunities and challenges. Domestic higher education institutions must elevate research quality and pedagogical rigor to thrive in an open ecosystem.",
    date: "2022-12-01",
    year: 2022,
    publication: "Livemint",
    publicationUrl: "https://www.livemint.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: ["Suresh Prabhu"],
    externalUrl:
      "https://www.livemint.com/opinion/online-views/indian-universities-must-prepare-for-foreign-competition-at-home-11669829099722.html",
    featured: false,
    readingTime: 5,
    tags: ["Foreign Universities", "Competition", "Higher Education"],
    thumbnail: "/images/articles/indian-universities-prepare-foreign-competition-at-home.jpg",
  },
  {
    id: "SM-027",
    slug: "state-capacity-civil-society-ngo-government-partnerships",
    title:
      "State capacity and civil society: Redefining NGO-government partnerships",
    excerpt:
      "Civil society organizations and NGOs play an indispensable role in community-level governance and bridging policy delivery gaps. A collaborative model between the state and social innovators strengthens civic systems.",
    date: "2022-09-12",
    year: 2022,
    publication: "Swarajya",
    publicationUrl: "https://swarajyamag.com",
    category: "Public Policy & Governance",
    subcategory: "Civic Systems",
    coAuthors: [],
    externalUrl:
      "https://swarajyamag.com/ideas/state-capacity-and-civil-society-redefining-ngo-government-partnerships",
    featured: false,
    readingTime: 7,
    tags: ["Civil Society", "NGOs", "State Capacity"],
  },
  {
    id: "SM-028",
    slug: "idea-of-rashtram-advanced-leadership-india",
    title:
      "The Idea of Rashtram Stems From the Urgent Need to Generate Advanced Leadership in India",
    excerpt:
      "India requires visionary leaders grounded in the civilizational ethos of Bharat and capable of navigating modern public policy complexities. Rashtram aims to institutionalize nation-building leadership education.",
    date: "2020-03-09",
    year: 2020,
    publication: "Swarajya",
    publicationUrl: "https://swarajyamag.com",
    category: "Education & Pedagogy",
    subcategory: "Higher Education",
    coAuthors: [],
    externalUrl:
      "https://swarajyamag.com/interviews/the-idea-of-rashtram-stems-from-the-urgent-need-to-generate-advanced-leadership-in-india-shobhit-mathur",
    featured: false,
    readingTime: 8,
    tags: ["Leadership", "Nation-Building", "Rashtram"],
  },
  {
    id: "SM-029",
    slug: "haphazard-appointment-judges-high-court-delays",
    title:
      "Haphazard Appointment of Judges Worsening High Court Judicial Delays",
    excerpt:
      "Empirical analysis of Department of Justice data shows ad-hoc judge allocations exacerbate pendency. Systematic judicial appointments and caseload rationalization are urgent for civic justice delivery.",
    date: "2018-02-11",
    year: 2018,
    publication: "IndiaSpend",
    publicationUrl: "https://www.indiaspend.com",
    category: "Public Policy & Governance",
    subcategory: "Civic Systems",
    coAuthors: ["Pallabi Mandal"],
    externalUrl:
      "https://thewire.in/223263/haphazard-appointment-judges-worsening-delays-high-courts/",
    featured: false,
    readingTime: 9,
    tags: ["Judiciary", "Judicial Reform", "Court Delays"],
    thumbnail: "/images/articles/haphazard-appointment-judges-high-court-delays.jpg",
  },
  {
    id: "SM-030",
    slug: "why-judicial-reform-should-start-lower-courts",
    title: "Why Judicial Reform Should Start With Lower Courts",
    excerpt:
      "Immediate improvements in the judicial system could be achieved by focusing on lower courts, collecting standardized case data, and horizontally replicating procedural innovations.",
    date: "2017-03-31",
    year: 2017,
    publication: "The Quint",
    publicationUrl: "https://www.thequint.com",
    category: "Public Policy & Governance",
    subcategory: "Civic Systems",
    coAuthors: [],
    externalUrl:
      "https://scroll.in/article/833357/judicial-reform-in-india-should-start-with-lower-courts-and-should-look-beyond-filling-vacancies",
    featured: false,
    readingTime: 6,
    tags: ["Judiciary", "Lower Courts", "Judicial Reform"],
    thumbnail: "/images/articles/why-judicial-reform-should-start-lower-courts.jpg",
  },
  {
    id: "SM-031",
    slug: "mgnrega-index-assessing-implementation-states",
    title: "The MGNREGA Index: Assessing Implementation Across States",
    excerpt:
      "Empirical evaluation of rural employment schemes reveals critical disparities in wage payment delays and project completion. Developing robust civic indices is essential to evaluate state delivery mechanisms.",
    date: "2016-05-18",
    year: 2016,
    publication: "The Hindu",
    publicationUrl: "https://www.thehindu.com",
    category: "Public Policy & Governance",
    subcategory: "Regulatory Frameworks",
    coAuthors: ["Nomesh Bolia"],
    externalUrl:
      "https://www.thehindu.com/opinion/op-ed/The-MGNREGA-index/article62118778.ece",
    featured: false,
    readingTime: 8,
    tags: ["MGNREGA", "Rural Policy", "Employment"],
    thumbnail: "/images/articles/mgnrega-index-assessing-implementation-states.jpg",
  },
  {
    id: "SM-032",
    slug: "more-ngos-india-work-with-government",
    title:
      "More NGOs in India Need to Work With the Government Instead of Opposing It",
    excerpt:
      "Constructive civic development occurs when non-governmental organizations partner directly with state administrative machinery rather than engaging in reflexive antagonism.",
    date: "2016-01-21",
    year: 2016,
    publication: "Swarajya",
    publicationUrl: "https://swarajyamag.com",
    category: "Public Policy & Governance",
    subcategory: "Civic Systems",
    coAuthors: [],
    externalUrl:
      "https://swarajyamag.com/politics/more-ngos-in-india-need-to-work-with-the-government-instead-of-opposing-it",
    featured: false,
    readingTime: 5,
    tags: ["NGOs", "Civil Society", "Government"],
    thumbnail: "/images/articles/more-ngos-india-work-with-government.jpg",
  },
];

// Helper functions
export const CATEGORIES = [
  "All",
  "Education & Pedagogy",
  "Public Policy & Governance",
  "Technology & Innovation",
  "Academic Research",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const PUBLICATIONS = [
  ...new Set(ARTICLES.map((a) => a.publication)),
].sort();

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticles(count = 3): Article[] {
  return ARTICLES.filter((a) => a.featured).slice(0, count);
}

export function getRecentArticles(count = 6): Article[] {
  return [...ARTICLES]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === "All") return ARTICLES;
  return ARTICLES.filter((a) => a.category === category);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAdjacentArticles(slug: string): {
  prev: Article | null;
  next: Article | null;
} {
  const sorted = [...ARTICLES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const index = sorted.findIndex((a) => a.slug === slug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

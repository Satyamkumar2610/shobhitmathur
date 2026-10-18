export interface JourneyImage {
  src: string;
  alt: string;
}

export interface JourneyStop {
  id: string;
  part: "Technology" | "Service" | "Institutions";
  short: string;
  title: string;
  years?: string;
  role: string;
  place?: string;
  text: string;
  quote?: { text: string; source?: string };
  facts?: string;
  image: JourneyImage & { contain?: boolean; position?: string };
  thumbs?: JourneyImage[];
}

const J = "/images/journey";

export const JOURNEY: JourneyStop[] = [
  {
    id: "iit-bombay",
    part: "Technology",
    short: "IIT Bombay",
    title: "IIT Bombay",
    years: "2000 – 2004",
    role: "B.Tech, Computer Science",
    place: "Mumbai",
    text: "Raised in Hyderabad, I placed in the top hundred of the IIT entrance examination and went on to study computer science at IIT Bombay.",
    image: { src: `${J}/iitb-jee-clipping.jpg`, alt: "Newspaper clipping reporting the IIT entrance result", contain: true },
  },
  {
    id: "uw",
    part: "Technology",
    short: "UW",
    title: "University of Washington",
    years: "2004 – 2006",
    role: "M.S.",
    place: "Seattle",
    text: "Graduate school in Seattle brought my first experience of volunteering: raising funds for Hurricane Katrina relief through SEVA in 2005.",
    image: { src: `${J}/uw-allen-school.jpg`, alt: "At the Paul G. Allen School, University of Washington", position: "center 30%" },
  },
  {
    id: "amazon",
    part: "Technology",
    short: "Amazon",
    title: "Amazon",
    years: "From 2006",
    role: "Contributor",
    place: "Seattle",
    text: "I joined Amazon as it was evolving from an e-commerce business into a technology company, and saw how technology can transform systems at scale. The pull to return to India kept growing.",
    image: { src: `${J}/amazon-seattle.jpg`, alt: "With a group at Amazon in Seattle" },
  },
  {
    id: "suriname",
    part: "Service",
    short: "Suriname",
    title: "Suriname",
    years: "2006",
    role: "Volunteer",
    place: "Paramaribo",
    text: "Before starting at Amazon, I asked SEVA to send me somewhere I had never heard of. In Suriname, which had no computer science department, I taught IT and computer science at the university in Paramaribo and helped set one up.",
    quote: { text: "Send me to some place which I have not heard of.", source: "To SEVA’s national team, 2006" },
    image: { src: `${J}/isb-et-story.jpg`, alt: "The Economic Times Magazine, Epiphany in Suriname, October 2014", contain: true },
  },
  {
    id: "youth-for-seva",
    part: "Service",
    short: "Youth for Seva",
    title: "Youth for Seva",
    role: "Co-founder",
    place: "Hyderabad",
    text: "After leaving Amazon, I met NGOs across India and co-founded Youth for Seva to bring young people into volunteering — from school programmes to Uttarakhand flood relief and the Ekta Yatra to Kargil.",
    facts: "16 chapters · 5 years full-time",
    image: { src: `${J}/yfs-ekta-yatra.jpg`, alt: "Youth for Seva Ekta Yatra banner with volunteers and army officers" },
    thumbs: [
      { src: `${J}/yfs-gangotri.jpg`, alt: "Beside a Gangotri milestone in Uttarakhand" },
      { src: `${J}/yfs-kargil.jpg`, alt: "Volunteers with soldiers at the Kargil war memorial" },
      { src: `${J}/yfs-school-kits.jpg`, alt: "Handing a Youth for Seva school bag to a student" },
    ],
  },
  {
    id: "isb",
    part: "Institutions",
    short: "ISB",
    title: "Indian School of Business",
    years: "2014 – 2015",
    role: "PGP, Class of 2015",
    place: "Hyderabad",
    text: "Building Youth for Seva meant constant decisions with little formal framework. I went to ISB for structured thinking — a path The Economic Times Magazine featured in its October 2014 cover story.",
    image: { src: `${J}/isb-graduation.jpg`, alt: "ISB graduation ceremony, PGP 2015" },
    thumbs: [
      { src: `${J}/isb-classroom.jpg`, alt: "Presenting in an ISB classroom" },
      { src: `${J}/isb-et-cover.jpg`, alt: "The Economic Times Magazine cover, October 2014" },
    ],
  },
  {
    id: "vif",
    part: "Institutions",
    short: "Vision India",
    title: "Vision India Foundation",
    role: "Executive Director",
    text: "I worked with young Indians committed to public policy and governance. Policy Bootcamp, “Deepening Democracy and Gearing-up Governance,” put them in direct conversation with policymakers.",
    image: { src: `${J}/vif-bootcamp-speaking.jpg`, alt: "Speaking at the Vision India Foundation Policy Bootcamp" },
    thumbs: [
      { src: `${J}/vif-bootcamp-panel.jpg`, alt: "In conversation on stage at Policy Bootcamp" },
      { src: `${J}/vif-welcome.jpg`, alt: "Welcoming a guest at Policy Bootcamp" },
      { src: `${J}/vif-five-years.jpg`, alt: "Presenting five years of Vision India Foundation" },
    ],
  },
  {
    id: "rashtram",
    part: "Institutions",
    short: "Rashtram",
    title: "Rashtram School of Public Leadership",
    role: "Founding Dean",
    text: "An initiative of Vision India Foundation. As founding dean, I built a school to develop leaders grounded in India’s civilisational ethos and equipped for modern public policy.",
    quote: {
      text: "The idea of Rashtram stems from the urgent need to generate advanced leadership in India.",
      source: "Interview with Swarajya, 2020",
    },
    image: { src: `${J}/rashtram-speaking.jpg`, alt: "Speaking at a Rashtram School of Public Leadership event", position: "left center" },
    thumbs: [
      { src: `${J}/rashtram-cohort.jpg`, alt: "Rashtram cohort group photo" },
      { src: `${J}/rashtram-launch.jpg`, alt: "Rashtram launch event with guests" },
    ],
  },
  {
    id: "rishihood",
    part: "Institutions",
    short: "Rishihood",
    title: "Rishihood University",
    years: "Present",
    role: "Co-Founder & Vice Chancellor",
    place: "Sonipat",
    text: "I co-founded Rishihood University on a simple conviction: India needs universities that do more than prepare young people for jobs — institutions that teach them to understand society, build enterprises and shape the nation’s future.",
    image: { src: `${J}/rishihood-vc.jpg`, alt: "Shobhit Mathur, Vice Chancellor, speaking at a Rishihood University podium", position: "center 15%" },
    thumbs: [
      { src: "/images/about-portrait-2026.jpg", alt: "Addressing students at Rishihood University" },
      { src: "/images/gallery/thumb/g08-arambh-class-of-2030.jpg", alt: "Arambh, welcoming the Class of 2030" },
      { src: "/images/gallery/thumb/g12-universities-report-launch.jpg", alt: "Launch of the universities report" },
    ],
  },
];

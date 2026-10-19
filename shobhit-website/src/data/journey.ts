export interface JourneyImage {
  src: string;
  alt: string;
  contain?: boolean;
  position?: string;
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
  image: JourneyImage;
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
    text: "Raised in Hyderabad, I was placed in the top hundred of the IIT entrance examination and went on to study computer science at IIT Bombay.",
    image: { src: `${J}/iitb-jee-clipping.jpg`, alt: "Newspaper clipping reporting the IIT entrance result", contain: true },
  },
  {
    id: "uw",
    part: "Technology",
    short: "UW",
    title: "University of Washington",
    years: "2004 – 2006",
    role: "M.S., Computer Science",
    text: "While pursuing my postgraduate degree in Computer Science at the University of Washington in Seattle, I had my first experience of volunteering, raising funds for Hurricane Katrina relief through SEWA International in 2005.",
    image: { src: `${J}/uw-allen-school.jpg`, alt: "At the Paul G. Allen School, University of Washington", position: "center 30%" },
  },
  {
    id: "amazon",
    part: "Technology",
    short: "Amazon",
    title: "Amazon.com",
    years: "From 2006",
    role: "Database Administrator",
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
    text: "Before starting at Amazon, I asked SEWA International to send me somewhere I had never heard of, and eventually landed in Suriname. There was no Computer Science programme there, so I taught IT and Computer Science and helped set one up at the University in Paramaribo.",
    image: { src: `${J}/isb-et-story.jpg`, alt: "The Economic Times Magazine, Epiphany in Suriname, October 2014", contain: true },
  },
  {
    id: "youth-for-seva",
    part: "Service",
    short: "Youth For Seva",
    title: "Youth For Seva",
    role: "National Organizing Secretary",
    text: "After leaving Amazon, I helped scale Youth For Seva into a national volunteering movement that enabled young people to contribute to society — from school programmes to Uttarakhand flood relief and the Ekta Yatra to Kargil.",
    image: { src: `${J}/yfs-ekta-yatra.jpg`, alt: "Youth For Seva Ekta Yatra banner with volunteers and army officers" },
    thumbs: [
      { src: `${J}/yfs-gangotri.jpg`, alt: "Beside a Gangotri milestone in Uttarakhand" },
      { src: `${J}/yfs-kargil.jpg`, alt: "Volunteers with soldiers at the Kargil war memorial" },
      { src: `${J}/yfs-school-kits.jpg`, alt: "Handing a Youth For Seva school bag to a student" },
    ],
  },
  {
    id: "isb",
    part: "Institutions",
    short: "ISB",
    title: "Indian School of Business",
    years: "2014 – 2015",
    role: "PGP, Class of 2015",
    text: "Building Youth For Seva meant constant decision-making with very little formal framework. I eventually joined ISB for structured thinking, a path The Economic Times Magazine featured in its October 2014 cover story. At ISB, I helped set up the Public Policy Club and led iDiya, India's largest social venture competition. For my work, I received the Young Leader Award for all-round excellence and was named to the Merit List and the Dean's List for top academic performance.",
    image: { src: `${J}/isb-graduation.jpg`, alt: "ISB graduation ceremony, PGP 2015" },
    thumbs: [
      { src: `${J}/isb-classroom.jpg`, alt: "Presenting in an ISB classroom" },
      { src: `${J}/isb-et-cover.jpg`, alt: "The Economic Times Magazine cover, October 2014", contain: true },
    ],
  },
  {
    id: "vif",
    part: "Institutions",
    short: "Vision India",
    title: "Vision India Foundation",
    role: "Co-Founder & Executive Director",
    text: "I helped set up Vision India Foundation, committed to training talented young Indians who wanted to engage more deeply with public policy and governance. Through VIF, I curated policy training programmes that prepare young Indians to join various facets of public life.",
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
    text: "I co-founded Rishihood University on a simple conviction: India needs universities that do more than prepare young people for jobs — institutions that teach them to understand society, build enterprises and shape the nation’s future.",
    image: { src: `${J}/rishihood-vc.jpg`, alt: "Shobhit Mathur, Vice Chancellor, speaking at a Rishihood University podium", position: "center 15%" },
    thumbs: [
      { src: "/images/about-portrait-2026.jpg", alt: "Addressing students at Rishihood University" },
      { src: "/images/gallery/full/g08-arambh-class-of-2030.jpg", alt: "Arambh, welcoming the Class of 2030" },
      { src: "/images/gallery/full/g12-universities-report-launch.jpg", alt: "Launch of the universities report" },
    ],
  },
];

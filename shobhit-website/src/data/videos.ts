export type VideoCategory = "Talks & Panels" | "Podcast" | "Short Clips";

export interface Video {
  id: string;
  title: string;
  duration: string;
  channel: string;
  views?: number;
  date?: string;
  category?: VideoCategory;
}

export const VIDEOS: Video[] = [
  {
    id: "7KwWti8H-84",
    title:
      "Shri Shobhit Mathur - Co-Founder and Vice Chancellor, Rishihood University | Convocation 2022",
    duration: "9:08",
    channel: "Rishihood University",
    views: 422,
    date: "2023-01-21",
    category: "Short Clips",
  },
  {
    id: "Hfmqltw3JX8",
    title:
      "Shri Shobhit Mathur | ICAADCE 2023 | Rishihood University | School of Creativity",
    duration: "8:10",
    channel: "Rishihood University",
    views: 70,
    date: "2023-05-22",
    category: "Short Clips",
  },
  {
    id: "BtfeMuBjYzo",
    title:
      "What does Rishihood mean for Students, Teachers and Society? | Shobhit Mathur, Co-Founder & VC",
    duration: "1:13",
    channel: "Rishihood University",
    views: 591,
    date: "2023-06-20",
    category: "Short Clips",
  },
  {
    id: "If2cHXEh3Ps",
    title:
      "India's pioneering impact-driven institution | Shobhit Mathur | Rishihood University",
    duration: "3:34",
    channel: "Rishihood University",
    views: 106,
    date: "2023-09-26",
    category: "Short Clips",
  },
  {
    id: "n11OO7yQRbc",
    title:
      "Reinventing Higher Education In India | Shobhit Mathur | Rishihood University",
    duration: "24:00",
    channel: "Rishihood University",
    views: 279,
    date: "2022-05-17",
    category: "Talks & Panels",
  },
  {
    id: "2UnVG0oZANY",
    title: "How To Think 10 Years Ahead Of Everyone Else | FT. Shobhit Mathur",
    duration: "2:05:40",
    channel: "Him-eesh Madaan",
    views: 56718,
    date: "2026-06-30",
    category: "Talks & Panels",
  },
  {
    id: "cFncr3jFaUI",
    title:
      "Ep 7 | Connecting with roots, a University for impact, and future of education ft. Shobhit Mathur",
    duration: "47:15",
    channel: "I See India",
    views: 299,
    date: "2024-06-07",
    category: "Talks & Panels",
  },
  {
    id: "y3eLq8bEuCI",
    title:
      "The Career Decision Everyone Ignores | ft. Shobhit Mathur || Him eesh Madaan Clips",
    duration: "5:49",
    channel: "Him-eesh Madaan Clips",
    views: 67,
    date: "2026-07-04",
    category: "Short Clips",
  },
  {
    id: "ET6vNPl5OCA",
    title:
      "IIT Hostel Life: What They Don’t Show! | ft. Shobhit Mathur || Him eesh Madaan Clips",
    duration: "3:20",
    channel: "Him-eesh Madaan Clips",
    views: 27,
    date: "2026-07-02",
    category: "Short Clips",
  },
  {
    id: "aGHFdnNTa4Y",
    title:
      "School Never Told This! | ft. Shobhit Mathur || Him eesh Madaan Clips",
    duration: "7:20",
    channel: "Him-eesh Madaan Clips",
    views: 50,
    date: "2026-07-12",
    category: "Short Clips",
  },
  {
    id: "8tjiSwazaSE",
    title:
      "The Comfort Trap That Destroys Ambition  | ft. Shobhit Mathur || Him eesh Madaan Clips",
    duration: "6:31",
    channel: "Him-eesh Madaan Clips",
    views: 388,
    date: "2026-07-12",
    category: "Short Clips",
  },

  {
    id: "7JLHt_pkfyQ",
    title:
      "Thoughtful Leaders- Shobhit Mathur, Dean at Rashtram School of Public Leadership",
    duration: "29:32",
    channel: "Collegedunia",
    views: 164,
    date: "2020-05-27",
    category: "Talks & Panels",
  },

  {
    id: "ifAtfPRJnq0",
    title:
      "What do we mean By Indic yet Global? | Shobhit Mathur, Co-Founder & VC",
    duration: "1:31",
    channel: "Rishihood University",
    views: 100,
    date: "2023-08-07",
    category: "Short Clips",
  },
  {
    id: "OQ03NQjzcR4",
    title:
      "Enhancing Leadership Skills | SHOBHIT MATHUR | Indic Teen Fest | Gateway Education",
    duration: "18:42",
    channel: "Gateway Education",
    views: 295,
    date: "2018-10-24",
    category: "Talks & Panels",
  },
  {
    id: "ghOPNvQ7jSg",
    title:
      "New Directions in University Education: Building India's Next Generation of Institutions",
    duration: "26:23",
    channel: "Sangam Talks",
    views: 1271,
    date: "2023-09-24",
    category: "Talks & Panels",
  },
  {
    id: "vVnS_H6I9xA",
    title: "Choosing unconventional career paths | Shobhit Mathur",
    duration: "1:18:50",
    channel: "Rashtram School",
    views: 396,
    date: "2020-08-24",
    category: "Talks & Panels",
  },
  {
    id: "bBe4UHLkMp4",
    title:
      '"The decolonisation of Indian education has indeed begun, but.." Shobhit Mathur ji explains',
    duration: "1:55",
    channel: "The Festival of Bharat",
    views: 4196,
    date: "2021-10-09",
    category: "Short Clips",
  },
  {
    id: "dQZm4DhEQGI",
    title:
      "Shobhit Mathur on how Rashtram is helping nurture Bharatiya leaders of tomorrow",
    duration: "57:38",
    channel: "Citti Media",
    views: 556,
    date: "2022-12-09",
    category: "Talks & Panels",
  },
  {
    id: "0Glw6iQvB-g",
    title:
      "Aadhaar & Beyond: Transforming Public Service with Technology - Shri Guru Malladi | Rashtram Podcast",
    duration: "29:56",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "2CWwFWxrXm4",
    title:
      "Accelerating India's Development: Transforming Governance with Prof. Karthik Muralidharan",
    duration: "17:17",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "ao2xehY-B5U",
    title:
      "UN Reforms & India's Role: Insights from Dr. Augusto Lopez-Claros | Rashtram Podcast",
    duration: "16:32",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "X5LgsqxRtqM",
    title:
      "Careers in Public Policy: Insights with Prof. Sridhar Pabbisetty | Rashtram Podcast",
    duration: "25:29",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "VZdsYbHF7m0",
    title:
      "How to Start a Career in Public Policy? | Shri Yash Agarwal | Rashtram Podcast",
    duration: "7:46",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "-n0ycZJ6SIo",
    title:
      "Rashtram Podcast with NIA's Shri Yogesh Chander Modi | Principles for a Purposeful Life",
    duration: "11:59",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "-6253uTaqFo",
    title:
      "Digital India: Revolution or Ruin? | Dr. Santosh K Misra | Rashtram Podcast",
    duration: "21:22",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "AktRzmJsnLE",
    title:
      "The Big Agricultural Debate: Reform & Solutions | Prof. (Dr.) Ashok Gulati | Rashtram Podcast",
    duration: "19:58",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "EsP3HkZgzE4",
    title:
      "Young & Bold: India’s Future in Global Affairs! | Professor Harsh V. Pant | Rashtram Podcast",
    duration: "15:36",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "YIRb5f7kLjs",
    title:
      "Public Policy Careers: Consultancy vs. Government! | Shri Prasanna Karthik | Rashtram Podcast",
    duration: "21:55",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "GnM6z9DSaK8",
    title:
      "The Secret Behind Jamsetji Tata’s Success! | Shri Ramabadran Gopalakrishnan | Rashtram Podcast",
    duration: "23:26",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "QdJyp68qCxY",
    title:
      "The Harsh Realities of Indian Politics | Dr. Vinay Sahasrabuddhe | Rashtram Podcast",
    duration: "15:57",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "BLXa1oPITzQ",
    title:
      "Shaping Global Policy: Diplomacy & India's Soft Power | Shri Asoke Kumar Mukerji | Rashtram Podcast",
    duration: "15:55",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "h7LGvgk_O3o",
    title:
      "Unveiling the Truth: Is the Indian Dream at Risk? | Prof. (Dr.) Hindol Sengupta | Rashtram Podcast",
    duration: "21:52",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "K4xCKNamCPs",
    title:
      "The Untold Story of NITI Aayog | Dr. Rajiv Kumar | Rashtram Podcast",
    duration: "18:02",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "gVlaJCcN810",
    title:
      "Transforming India: Decentralization & Local Governance  | Shri Amarjeet Sinha | Rashtram Podcast",
    duration: "11:24",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "8gn5mxX8mYM",
    title:
      "Yogi Adityanath's UP Transformation | Shri Shantanu Gupta | Rashtram Podcast",
    duration: "16:06",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "PmMyjNRI-po",
    title:
      "Pathway to Public Policy Careers | Shri Ajay Khanna | Rashtram Podcast",
    duration: "11:51",
    channel: "Rashtram School",
    category: "Podcast",
  },
  {
    id: "oPu5L_hBHkQ",
    title:
      "Life Lessons from the Indian Armed Forces | Air Marshal Anil Chopra (Retd.) | Rashtram Podcast",
    duration: "12:11",
    channel: "Rashtram School",
    category: "Podcast",
  },
];

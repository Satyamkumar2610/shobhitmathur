export interface GalleryImage {
  file: string;
  caption: string;
  /** width / height of the source file — drives the justified row layout */
  ratio: number;
  /** shown in the six-up teaser on the About page */
  featured?: boolean;
}

/** Ordered newest first. */
export const GALLERY: GalleryImage[] = [
  { file: "g01-panel-discussion", caption: "Panel discussion with students", ratio: 1.5 },
  { file: "g02-study-visit-china", caption: "On a study visit to China", ratio: 1.683, featured: true },
  { file: "g03-with-students", caption: "With students at the university", ratio: 1.559 },
  { file: "g04-policy-consultation", caption: "At a policy consultation", ratio: 1.5 },
  { file: "g05-book-presentation", caption: "Presenting a volume on Indian Knowledge Systems", ratio: 0.753 },
  { file: "g06-in-conversation", caption: "In conversation", ratio: 0.659 },
  { file: "g07-entrepreneurship-bootcamp", caption: "Summer Entrepreneurship Bootcamp 2026", ratio: 1.5 },
  { file: "g08-arambh-class-of-2030", caption: "ARAMBH '26 — welcoming the Class of 2030", ratio: 1.5, featured: true },
  { file: "g09-fireside-chief-economic-adviser", caption: "In conversation with the Chief Economic Adviser to the Government of India", ratio: 1.5, featured: true },
  { file: "g10-bharat-digital-samvad", caption: "Bharat Digital Samvad 2026 — on digital sovereignty", ratio: 1.501, featured: true },
  { file: "g11-delegation-visit", caption: "A delegation visit in the United States", ratio: 0.75 },
  { file: "g12-universities-report-launch", caption: "Launch — Universities as Strategic National Institutions", ratio: 1.501 },
  { file: "g13-receiving-an-honour", caption: "Receiving an honour", ratio: 0.667 },
  { file: "g14-institutional-visit", caption: "An institutional visit", ratio: 1.778 },
  { file: "g15-welcoming-the-chief-guest", caption: "Welcoming the chief guest", ratio: 1.5, featured: true },
  { file: "g16-with-colleagues", caption: "#ApproachingRishihood — with colleagues", ratio: 1.463, featured: true },
  { file: "g17-signing-a-partnership", caption: "Signing an institutional partnership", ratio: 1.5 },
  { file: "g18-report-presentation", caption: "Presenting a report", ratio: 1.501 },
];

export const FEATURED = GALLERY.filter((g) => g.featured);

export const thumbSrc = (file: string) => `/images/gallery/thumb/${file}.jpg`;
export const fullSrc = (file: string) => `/images/gallery/full/${file}.jpg`;

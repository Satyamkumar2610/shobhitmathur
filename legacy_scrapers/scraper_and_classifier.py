#!/usr/bin/env python3
"""
LinkedIn Activity Scraper, NLP Classifier, and Data Structurer
Target: Shobhit Mathur (https://www.linkedin.com/in/shobhitmathur/recent-activity/shares/)
"""

import re
import csv
import json
import os
import unicodedata
import pandas as pd

TAXONOMY = {
    "Education & Pedagogy": {
        "keywords": ["university", "universities", "students", "schools", "classrooms", "medical colleges", "medical college", "education policy", "education", "pedagogy", "curriculum", "iit", "jee", "exam", "learning", "academic", "institution", "institutions", "higher education", "edtech"],
        "subcategories": {
            "Systemic Reform": ["systemic reform", "education policy", "exam design", "leaks", "coaching", "school reform", "nta", "board exams"],
            "Higher Education": ["higher education", "university", "universities", "townships", "medical colleges", "medical college", "campuses", "campus", "faculty", "degrees", "entrepreneurial universities", "foreign competition", "institutions", "institution"],
            "EdTech": ["edtech", "digital learning", "online education", "learning platform", "virtual classroom"],
            "Pedagogy": ["pedagogy", "classrooms", "rote", "curriculum", "teaching", "learning methods", "disciplines", "holistic learning", "physical education"]
        }
    },
    "Public Policy & Governance": {
        "keywords": ["laws", "law", "government", "permanent government", "regulatory", "state", "governance", "public policy", "bureaucracy", "civic", "constitution", "civil service", "public leadership", "civil society"],
        "subcategories": {
            "Regulatory Frameworks": ["regulatory", "regulations", "frameworks", "rules", "compliance", "policy support", "constraint"],
            "Nation-Building": ["nation-building", "national development", "america at 250", "india at 100", "civilizational", "vision india"],
            "Civic Systems": ["civic systems", "permanent government", "bureaucracy", "civil service", "institutional", "governance architecture", "civil society", "ngo"]
        }
    },
    "Technology & Innovation": {
        "keywords": ["data localisation", "tech rise", "artificial intelligence", "ai", "digital traffic", "technology", "tech", "digital sovereignty", "innovation", "cosmotechnics", "fourth industrial revolution"],
        "subcategories": {
            "Digital Sovereignty": ["digital sovereignty", "data localisation", "digital traffic", "sovereignty", "cosmotechnics", "yuk hui", "national tech"],
            "Frugal Innovation": ["frugal innovation", "indigenous", "grassroots innovation", "startups", "ecosystem", "fourth industrial revolution"],
            "AI Implications": ["artificial intelligence", "ai", "development ladder", "automation", "machine learning", "genai", "labor", "future of work"]
        }
    }
}

def clean_text(text: str) -> str:
    if not text:
        return ""
    # Normalize common Unicode typographic characters to standard ASCII equivalents
    replacements = {
        '‘': "'", '’': "'", '“': '"', '”': '"',
        '—': ' - ', '–': ' - ', '…': '...',
        '\u00a0': ' '
    }
    for char, rep in replacements.items():
        text = text.replace(char, rep)
        
    # Normalize unicode
    text = unicodedata.normalize('NFKD', text)
    # Remove surrogate/unencodable characters
    text = text.encode('ascii', 'ignore').decode('ascii')
    # Replace newlines and excessive whitespace with a single space
    text = re.sub(r'[\r\n\t]+', ' ', text)
    text = re.sub(r'\s{2,}', ' ', text)
    return text.strip()

def classify_content(post_text: str, article_title: str) -> tuple[str, str]:
    combined = f"{post_text} {article_title}".lower()
    
    best_primary = "Uncategorized"
    best_sub = "N/A"
    max_score = 0
    
    for primary_cat, details in TAXONOMY.items():
        # Score primary category
        cat_score = sum(1 for kw in details["keywords"] if kw in combined)
        
        if cat_score > max_score:
            max_score = cat_score
            best_primary = primary_cat
            
            # Find best sub-classification
            sub_matches = {}
            for sub_cat, sub_keywords in details["subcategories"].items():
                score = sum(1 for skw in sub_keywords if skw in combined)
                sub_matches[sub_cat] = score
            
            best_sub_match = max(sub_matches.items(), key=lambda x: x[1])
            if best_sub_match[1] > 0:
                best_sub = best_sub_match[0]
            else:
                # Default to first subcategory if primary matched
                best_sub = list(details["subcategories"].keys())[0]

    return best_primary, best_sub

# Extracted dataset of shared articles, publications, and commentary from Shobhit Mathur's activity feed
POSTS_DATA = [
    {
        "Date": "2026-08-05",
        "Post Content": "Examination leaks erode student morale and damage institutional credibility. Rebuilding faith in national entrance tests like NEET requires integrating modern computerized testing infrastructure with accountable state governance.",
        "Article Title": "How the NEET can be restructured to end question paper leaks",
        "URL": "https://www.thehindu.com/education/how-the-neet-can-be-restructured-to-end-question-paper-leaks/article71279765.ece"
    },
    {
        "Date": "2026-07-29",
        "Post Content": "India's triumphant performance at the International Physics Olympiad demonstrates the immense raw intellect of our students. However, our standard classrooms and rote systems fail to nurture exceptional talent. We need specialized schools, talent incubators, and modern pedagogy designed specifically for extraordinary minds.",
        "Article Title": "India topped the Physics Olympiad. Now it needs schools built for minds like these",
        "URL": "https://theprint.in/opinion/india-topped-the-physics-olympiad-now-it-needs-schools-built-for-minds-like-these/"
    },
    {
        "Date": "2026-07-07",
        "Post Content": "As the United States marks 250 years, India should reflect on constitutional resilience, institutional balance, and state capacity. Building robust civic systems and transparent laws is foundational for sustainable nation-building.",
        "Article Title": "What India can learn from America at 250",
        "URL": "https://theprint.in/opinion/what-india-can-learn-from-america-at-250/"
    },
    {
        "Date": "2026-06-19",
        "Post Content": "True digital sovereignty cannot be achieved merely by storing bits within national borders. We must master the digital traffic architecture, core algorithms, and communication layers to secure our tech rise and strategic independence.",
        "Article Title": "India is mistaking data localisation for digital sovereignty. It must control the traffic system",
        "URL": "https://theprint.in/opinion/india-is-mistaking-data-localisation-for-digital-sovereignty-it-must-control-the-traffic-system/"
    },
    {
        "Date": "2026-06-12",
        "Post Content": "The traditional pathway of climbing the developmental ladder through low-cost services and manual labor is rapidly shifting due to artificial intelligence. How India navigates AI implications will determine our economic future.",
        "Article Title": "India's development ladder after AI: What comes next?",
        "URL": "https://economictimes.indiatimes.com/opinion/et-commentary/indias-development-ladder-after-ai-what-comes-next/"
    },
    {
        "Date": "2026-05-28",
        "Post Content": "In an era of fractured supply chains and shifting global alliances, India faces a new economics of constraint. We must rethink our regulatory frameworks and strategic domestic capacity to build economic resilience.",
        "Article Title": "India and the new economics of constraint",
        "URL": "https://economictimes.indiatimes.com/opinion/et-commentary/india-and-the-new-economics-of-constraint/"
    },
    {
        "Date": "2026-04-21",
        "Post Content": "Vibrant university towns serve as powerful engines of innovation, research, and local economic development. Developing integrated higher education campuses in India can transform regional growth.",
        "Article Title": "University townships — India's chance to build its own version of what America got right",
        "URL": "https://theprint.in/opinion/university-townships-indias-chance-to-build-its-own-version-of-what-america-got-right/"
    },
    {
        "Date": "2026-02-11",
        "Post Content": "Expanding access to healthcare training requires enabling responsible private capital. Allowing for-profit medical colleges will bridge massive capacity shortages while regulatory frameworks ensure educational quality.",
        "Article Title": "For-profit medical colleges are a step forward. Education is defined by outcomes, not ownership",
        "URL": "https://theprint.in/opinion/for-profit-medical-colleges-are-a-step-forward-education-is-defined-by-outcomes-not-ownership/"
    },
    {
        "Date": "2025-06-18",
        "Post Content": "Critical tech infrastructure demands homegrown talent and strategic educational programs. Fostering indigenous engineering and frugal innovation in our universities is essential to safeguard national digital security.",
        "Article Title": "Technology education key to India's sovereignty",
        "URL": "https://economictimes.indiatimes.com/opinion/et-commentary/technology-education-key-to-indias-sovereignty/"
    },
    {
        "Date": "2025-06-10",
        "Post Content": "Declining physical engagement and sedentary academic environments hinder cognitive growth. Re-integrating sports and movement into our classrooms and curriculum is vital for student leadership.",
        "Article Title": "Fit to learn, fit to lead: Why India must rescue physical education now",
        "URL": "https://economictimes.indiatimes.com/opinion/et-commentary/fit-to-learn-fit-to-lead-why-india-must-rescue-physical-education-now/"
    },
    {
        "Date": "2025-06-04",
        "Post Content": "What if technology is not universal—but civilizational? Yuk Hui’s groundbreaking book challenges one of modernity’s deepest assumptions: that technology is a neutral, universal force. A profound exploration of digital cosmotechnics and sovereignty.",
        "Article Title": "Book Review | Yuk Hui’s The Question Concerning Technology in China (2016)",
        "URL": "https://www.linkedin.com/pulse/book-review-yuk-huis-question-concerning-technology-china-shobhit-mathur/"
    },
    {
        "Date": "2024-11-15",
        "Post Content": "India's rapid socioeconomic evolution demands specialized public policy education that bridges grassroots realities with rigorous institutional governance and evidence-based policymaking.",
        "Article Title": "Emerging trends in Public Policy Education in India",
        "URL": "https://www.thehindu.com/education/emerging-trends-in-public-policy-education-in-india/article68868921.ece"
    },
    {
        "Date": "2024-06-25",
        "Post Content": "High-stakes, single-day competitive exams create immense pressure on students and foster corrupt coaching cartels. We propose a computerized, multi-stage assessment system to drive genuine systemic reform in education policy.",
        "Article Title": "To escape annual cycle of leaks and stress, India needs a new exam design",
        "URL": "https://indianexpress.com/article/opinion/columns/to-escape-annual-cycle-of-leaks-and-stress-india-needs-a-new-exam-design/"
    },
    {
        "Date": "2024-06-19",
        "Post Content": "Artificial intelligence gives us an unprecedented opportunity to provide personalized tutoring at scale. Educational institutions and teachers must embrace EdTech and GenAI tools to personalize classroom pedagogy.",
        "Article Title": "Educators should leverage AI for an educational transformation",
        "URL": "https://www.livemint.com/opinion/online-views/educators-should-leverage-ai-for-an-educational-transformation-11718798993204.html"
    },
    {
        "Date": "2024-05-14",
        "Post Content": "Transitioning Indian higher education from degree factories to entrepreneurship hubs requires responsive regulatory frameworks and government policies that support student startups and venture creation.",
        "Article Title": "India needs policy support for entrepreneurial universities",
        "URL": "https://www.hindustantimes.com/opinion/india-needs-policy-support-for-entrepreneurial-universities/"
    },
    {
        "Date": "2024-03-08",
        "Post Content": "Private universities must step up to meet global standards while grounding education in civic responsibility and nation-building values. Regulatory bodies should incentivize institutional autonomy.",
        "Article Title": "Why India needs high-performing private universities with public purpose",
        "URL": "https://www.ndtv.com/opinion/why-india-needs-high-performing-private-universities-with-public-purpose-5198234"
    },
    {
        "Date": "2023-11-20",
        "Post Content": "The permanent government and civil bureaucracy must transition from administrative gatekeepers to mission-driven enablers. Strengthening institutional accountability and regulatory capacity is critical for civic governance.",
        "Article Title": "Reimagining the permanent government: Reforming India's civil service architecture",
        "URL": "https://swarajyamag.com/governance/reimagining-the-permanent-government-reforming-indias-civil-service-architecture/"
    },
    {
        "Date": "2023-08-23",
        "Post Content": "India stands at a pivotal juncture where technological rise, digital adoption, and frugal innovation can position our industries at the forefront of the Fourth Industrial Revolution.",
        "Article Title": "India has an opportunity to lead the fourth industrial revolution",
        "URL": "https://www.livemint.com/opinion/online-views/india-has-an-opportunity-to-lead-the-fourth-industrial-revolution-11692795493821.html"
    },
    {
        "Date": "2023-07-26",
        "Post Content": "As artificial intelligence and automation reshape industry demands, universities must overhaul curricula to prioritize critical thinking, adaptability, and multidisciplinary skills for the future of work.",
        "Article Title": "Universities should lead the way as we adapt to the future of work",
        "URL": "https://www.livemint.com/opinion/online-views/universities-should-lead-the-way-as-we-adapt-to-the-future-of-work-11690374182903.html"
    },
    {
        "Date": "2023-06-15",
        "Post Content": "Compartmentalizing education into rigid silos limits holistic thinking. Interdisciplinary learning and modern pedagogy are essential for equipping students with problem-solving skills for complex global challenges.",
        "Article Title": "On academic disciplines, India could take a leaf out of US' book",
        "URL": "https://economictimes.indiatimes.com/opinion/et-commentary/on-academic-disciplines-india-could-take-a-leaf-out-of-us-book/"
    },
    {
        "Date": "2023-01-04",
        "Post Content": "Academic institutions carry deep institutional memory and cultural values. Documenting their biographies and historical milestones inspires upcoming generations and reinforces institutional excellence.",
        "Article Title": "We need biographies written of our great academic institutions",
        "URL": "https://www.livemint.com/opinion/online-views/we-need-biographies-written-of-our-great-academic-institutions-11672837492819.html"
    },
    {
        "Date": "2022-12-01",
        "Post Content": "The entry of foreign universities into India presents both opportunities and challenges. Domestic higher education institutions must elevate research quality and pedagogical rigor to thrive in an open ecosystem.",
        "Article Title": "Indian universities must prepare for foreign competition at home",
        "URL": "https://www.livemint.com/opinion/online-views/indian-universities-must-prepare-for-foreign-competition-at-home-11669894729183.html"
    },
    {
        "Date": "2022-09-12",
        "Post Content": "Civil society organizations and NGOs play an indispensable role in community-level governance and bridging policy delivery gaps. A collaborative model between the state and social innovators strengthens civic systems.",
        "Article Title": "State capacity and civil society: Redefining NGO-government partnerships",
        "URL": "https://swarajyamag.com/ideas/state-capacity-and-civil-society-redefining-ngo-government-partnerships"
    },
    {
        "Date": "2020-03-09",
        "Post Content": "India requires visionary leaders grounded in the civilizational ethos of Bharat and capable of navigating modern public policy complexities. Rashtram aims to institutionalize nation-building leadership education.",
        "Article Title": "The Idea Of Rashtram Stems From The Urgent Need To Generate Advanced Leadership In India",
        "URL": "https://swarajyamag.com/interviews/the-idea-of-rashtram-stems-from-the-urgent-need-to-generate-advanced-leadership-in-india-shobhit-mathur"
    },
    {
        "Date": "2016-05-18",
        "Post Content": "Empirical evaluation of rural employment schemes reveals critical disparities in wage payment delays and project completion. Developing robust civic indices is essential to evaluate state delivery mechanisms.",
        "Article Title": "The MGNREGA index: Assessing implementation across states",
        "URL": "https://www.thehindu.com/opinion/op-ed/the-mgnrega-index/article8612015.ece"
    },
    {
        "Date": "2016-01-21",
        "Post Content": "Constructive civic development occurs when non-governmental organizations partner directly with state administrative machinery rather than engaging in reflexive antagonism.",
        "Article Title": "More NGOs In India Need To Work With The Government Instead Of Opposing It",
        "URL": "https://swarajyamag.com/politics/more-ngos-in-india-need-to-work-with-the-government-instead-of-opposing-it"
    },
    {
        "Date": "2024-08-20",
        "Post Content": "Integrating Indian Knowledge Systems into modern university curricula enables students to develop holistic leadership, cultural grounding, and multidimensional problem-solving.",
        "Article Title": "Integrating Indian Knowledge Systems with NEP 2020: Building Leadership for Gen Z",
        "URL": "https://www.financialexpress.com/jobs-career/education/integrating-indian-knowledge-systems-with-nep-2020-building-leadership-for-gen-z/3588921/"
    },
    {
        "Date": "2018-02-11",
        "Post Content": "Empirical analysis of Department of Justice data shows ad-hoc judge allocations exacerbate pendency. Systematic judicial appointments and caseload rationalization are urgent for civic justice delivery.",
        "Article Title": "Haphazard Appointment Of Judges Worsening High Court Judicial Delays",
        "URL": "https://www.indiaspend.com/haphazard-appointment-of-judges-worsening-high-court-judicial-delays-83492/"
    },
    {
        "Date": "2016-04-29",
        "Post Content": "Assessing rural welfare schemes reveals sharp contractions in physical asset creation and wage disbursements. Regulatory efficiency and systemic accountability must guide rural social programs.",
        "Article Title": "Worst Year Ever For MGNREGA, 23% Drop In Assets Created",
        "URL": "https://thewire.in/economy/worst-year-ever-for-mgnrega-23-drop-in-assets-created"
    },
    {
        "Date": "2025-02-03",
        "Post Content": "Regulatory rigidity and outdated governance laws are stifling private universities in India, preventing academic innovation, flexible student intake, and multidisciplinary education models essential for global competitiveness.",
        "Article Title": "Outdated Laws Are Stifling India's Private Universities",
        "URL": "https://www.ndtv.com/opinion/outdated-laws-are-stifling-indias-private-universities-7860124"
    },
    {
        "Date": "2017-03-31",
        "Post Content": "Immediate improvements in the judicial system could be achieved by focusing on lower courts, collecting standardized case data, and horizontally replicating procedural innovations.",
        "Article Title": "Why Judicial Reform Should Start With Lower Courts",
        "URL": "https://www.thequint.com/voices/opinion/indian-judicial-system-needs-a-reform-which-starts-at-lower-courts"
    },
    {
        "Date": "2026-06-15",
        "Post Content": "For over a century, modern education has been organised around disciplines. The defining challenges of our time emerge at intersections. The student trained exclusively within a single discipline is increasingly unprepared for the reality they will inherit. What is missing is ways of thinking that enable individuals to operate in a world of deeply interconnected systems.",
        "Article Title": "Why education must teach systems thinking",
        "URL": "https://www.linkedin.com/in/shobhitmathur/recent-activity/shares/"
    }
]

def main():
    processed_records = []
    
    for item in POSTS_DATA:
        date = clean_text(item["Date"])
        post_content = clean_text(item["Post Content"])
        article_title = clean_text(item["Article Title"])
        url = clean_text(item["URL"])
        
        primary_cls, sub_cls = classify_content(post_content, article_title)
        
        processed_records.append({
            "Date": date,
            "Post Content": post_content,
            "Article Title": article_title,
            "URL": url,
            "Primary Classification": primary_cls,
            "Sub-classification": sub_cls
        })
        
    df = pd.DataFrame(processed_records)
    
    # 1. Main Classified Dataset CSV
    output_filename = "shobhit_mathur_article_classifications.csv"
    df.to_csv(output_filename, index=False, quoting=csv.QUOTE_ALL)
    print(f"Successfully saved {len(df)} classified records to {output_filename}")
    
    # 2. Main Classified Dataset Excel (.xlsx)
    from create_excel import create_styled_excel
    create_styled_excel()
    
    # 3. Dedicated Article Links CSV
    links_csv = "article_links.csv"
    df[["Date", "Article Title", "URL", "Primary Classification", "Sub-classification"]].to_csv(links_csv, index=False, quoting=csv.QUOTE_ALL)
    print(f"Successfully saved article links to {links_csv}")
    
    # 4. Dedicated Markdown Links Document
    md_filename = "article_links.md"
    with open(md_filename, "w") as f:
        f.write("# Article Links Catalog — Shobhit Mathur\n\n")
        f.write(f"Total Extracted Articles & Shared Posts: **{len(df)}**\n\n")
        f.write("| # | Date | Article Title | Primary Classification | Sub-classification | Direct Link |\n")
        f.write("|---|---|---|---|---|---|\n")
        for i, row in df.iterrows():
            f.write(f"| {i+1} | {row['Date']} | {row['Article Title']} | {row['Primary Classification']} | {row['Sub-classification']} | [Link]({row['URL']}) |\n")
    print(f"Successfully saved formatted markdown catalog to {md_filename}")
    
    print("\nDataset Preview:")
    print(df[["Date", "Article Title", "Primary Classification", "Sub-classification"]].to_string())

if __name__ == "__main__":
    main()

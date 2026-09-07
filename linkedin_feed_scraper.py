import os
import json
import time
import requests
import pytesseract
from PIL import Image
from io import BytesIO
from playwright.sync_api import sync_playwright

LINKEDIN_URL = "https://www.linkedin.com/in/shobhitmathur/recent-activity/shares/"

def perform_ocr(image_url):
    """Downloads an image and performs OCR to extract text."""
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        text = pytesseract.image_to_string(img)
        return text.strip()
    except Exception as e:
        print(f"OCR failed for {image_url}: {e}")
        return ""

def scrape_linkedin_feed(li_at_cookie):
    posts_data = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        
        # Add the authentication cookie
        context.add_cookies([{
            "name": "li_at",
            "value": li_at_cookie,
            "domain": ".linkedin.com",
            "path": "/"
        }])
        
        page = context.new_page()
        print(f"Navigating to {LINKEDIN_URL}...")
        page.goto(LINKEDIN_URL, wait_until="networkidle")
        
        # Scroll to load all posts
        print("Scrolling down to load historical posts...")
        last_height = page.evaluate("document.body.scrollHeight")
        scroll_attempts = 0
        while scroll_attempts < 15:  # Arbitrary limit to prevent infinite loops
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(3)  # Wait for new posts to load
            new_height = page.evaluate("document.body.scrollHeight")
            if new_height == last_height:
                scroll_attempts += 1
            else:
                scroll_attempts = 0
                last_height = new_height
        
        page.screenshot(path="linkedin_debug.png", full_page=True)
        print("Extraction phase starting...")
        # Find all post containers
        post_elements = page.query_selector_all("div.feed-shared-update-v2, div.update-components-update-v2")
        
        for index, element in enumerate(post_elements):
            post_info = {
                "index": index,
                "text": "",
                "shared_link": None,
                "ocr_text": "",
                "images": []
            }
            
            # Extract main text
            text_el = element.query_selector("span.break-words")
            if text_el:
                post_info["text"] = text_el.inner_text().strip()
                
            # Extract shared article link
            article_el = element.query_selector("a.app-aware-link[href*='article'], a.feed-shared-article__image-link")
            if article_el:
                post_info["shared_link"] = article_el.get_attribute("href")
                
            # Extract images for OCR
            img_els = element.query_selector_all("img.ivm-view-attr__img--centered")
            for img in img_els:
                src = img.get_attribute("src")
                if src and src.startswith("http"):
                    post_info["images"].append(src)
                    
            posts_data.append(post_info)
            
        browser.close()
        
    print(f"Successfully extracted {len(posts_data)} posts from the DOM.")
    
    # Process OCR for images
    print("Running OCR on post images (this may take a moment)...")
    for post in posts_data:
        for img_url in post["images"]:
            ocr_result = perform_ocr(img_url)
            if ocr_result:
                post["ocr_text"] += ocr_result + "\n"
                
    # Save raw dump
    with open("raw_linkedin_posts.json", "w") as f:
        json.dump(posts_data, f, indent=4)
        
    print("Raw scrape complete! Data saved to raw_linkedin_posts.json")

if __name__ == "__main__":
    cookie = os.environ.get("LI_AT_COOKIE")
    if not cookie:
        print("Error: Please set the LI_AT_COOKIE environment variable.")
        print("Example: export LI_AT_COOKIE='AQEDATR...'")
        exit(1)
        
    scrape_linkedin_feed(cookie)

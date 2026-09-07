from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://www.thehindu.com/search/?q=shobhit+mathur")
    time.sleep(5)
    links = page.query_selector_all("a.story-card-heading")
    for l in links:
        href = l.get_attribute("href")
        print(href)
    browser.close()

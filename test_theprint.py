from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://theprint.in/?s=shobhit+mathur")
    page.wait_for_timeout(5000)
    
    links = page.query_selector_all("a")
    found_urls = set()
    for link in links:
        href = link.get_attribute("href")
        if href and "shobhit" in href.lower() or href and "mathur" in href.lower():
            found_urls.add(href)
            
    print(f"Found {len(found_urls)} unique relevant URLs:")
    for url in found_urls:
        print(url)
        
    browser.close()

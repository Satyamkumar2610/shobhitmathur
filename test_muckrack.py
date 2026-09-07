from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://muckrack.com/shobhit-mathur/articles")
    page.wait_for_timeout(5000)
    page.screenshot(path="muckrack_test.png", full_page=True)
    content = page.content()
    if "Cloudflare" in content or "Just a moment" in content:
        print("Blocked by Cloudflare")
    else:
        print("Successfully bypassed Cloudflare")
    browser.close()

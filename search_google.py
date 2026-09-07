import json
import time
from googlesearch import search
from create_master_sheet import MASTER_DATA

updates = {}

# Map publication names to their domains to verify results
DOMAIN_MAP = {
    "ThePrint": "theprint.in",
    "The Hindu": "thehindu.com",
    "Economic Times": "economictimes.indiatimes.com",
    "Swarajya": "swarajyamag.com",
    "News 18": "news18.com",
    "The Pioneer": "dailypioneer.com",
    "Hindustan Times": "hindustantimes.com",
    "Telegraph": "telegraphindia.com",
    "Financial Express": "financialexpress.com",
    "Livemint": "livemint.com",
    "NDTV": "ndtv.com",
    "Indian Express": "indianexpress.com",
    "The New Indian Express": "newindianexpress.com"
}

print(f"Starting search for {len(MASTER_DATA)} articles...")

for item in MASTER_DATA:
    # Skip articles that are not news articles (like LinkedIn posts, though all of these are articles)
    pub = item.get("Publication", "")
    domain = None
    for key, val in DOMAIN_MAP.items():
        if key.lower() in pub.lower():
            domain = val
            break
            
    if not domain:
        continue

    title = item["Article Title"]
    # Remove exact quotes, just search the keywords
    query = f"{title} {pub} Shobhit Mathur"
    
    print(f"Searching: {query}")
    try:
        results = search(query, num_results=5, sleep_interval=2, advanced=False)
        found = False
        for url in results:
            if domain in url:
                updates[item["ID"]] = url
                print(f"✅ Found: {url}")
                found = True
                break
        if not found:
            print("❌ Not found on domain.")
    except Exception as e:
        print(f"Error searching {item['ID']}: {e}")
        time.sleep(5) # Backoff if rate limited

with open("google_search_results.json", "w") as f:
    json.dump(updates, f, indent=4)
print(f"Saved {len(updates)} URLs to json.")

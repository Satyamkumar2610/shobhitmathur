import json
import urllib.parse
import requests
from create_master_sheet import MASTER_DATA

updates = {}

def search_theprint(title):
    short_title = " ".join(title.split()[:4])
    query = urllib.parse.quote(short_title)
    url = f"https://theprint.in/wp-json/wp/v2/posts?search={query}"
    try:
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        if r.status_code == 200:
            data = r.json()
            if data and isinstance(data, list):
                # Return the first match's link
                return data[0].get('link')
    except Exception as e:
        print(f"Error on ThePrint: {e}")
    return None

for item in MASTER_DATA:
    if 'theprint' in item['Publication'].lower():
        link = search_theprint(item['Article Title'])
        if link:
            updates[item['ID']] = link
            print(f"Found ThePrint link for {item['ID']}: {link}")

with open('news_updates.json', 'w') as f:
    json.dump(updates, f, indent=4)

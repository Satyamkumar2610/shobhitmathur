import json
import time
from create_master_sheet import MASTER_DATA
from duckduckgo_search import DDGS

ddgs = DDGS()
updates = {}

for item in MASTER_DATA:
    if item['ID'] in ['SM-001']:
        continue
    if 'linkedin.com' in item['URL']:
        continue
        
    title = item['Article Title']
    pub = item['Publication'].lower()
    
    domain_map = {
        'theprint': 'theprint.in',
        'the hindu': 'thehindu.com',
        'the quint': 'thequint.com',
        'ndtv': 'ndtv.com',
        'livemint': 'livemint.com',
        'economic times': 'economictimes.indiatimes.com',
        'swarajya': 'swarajyamag.com',
        'hindustan times': 'hindustantimes.com',
        'indian express': 'indianexpress.com',
        'indiaspend': 'indiaspend.com',
        'financial express': 'financialexpress.com'
    }
    
    domain = None
    for k, v in domain_map.items():
        if k in pub:
            domain = v
            break
            
    query = f'"{title}"'
    if domain:
        query += f' site:{domain}'
        
    try:
        results = list(ddgs.text(query, max_results=3))
        if results:
            new_url = results[0]['href']
            updates[item['ID']] = new_url
            print(f"Found {item['ID']}: {new_url}")
        else:
            query2 = f'"{title}" Shobhit Mathur'
            results2 = list(ddgs.text(query2, max_results=3))
            if results2:
                new_url = results2[0]['href']
                updates[item['ID']] = new_url
                print(f"Found fallback {item['ID']}: {new_url}")
            else:
                print(f"NOT FOUND {item['ID']}: {title}")
    except Exception as e:
        print(f"Error {item['ID']}: {e}")
        
    time.sleep(1)

with open('url_updates.json', 'w') as f:
    json.dump(updates, f, indent=4)

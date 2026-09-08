import requests
import json
from create_master_sheet import MASTER_DATA

headers = {'User-Agent': 'Mozilla/5.0'}
for item in MASTER_DATA:
    url = item['URL']
    if 'linkedin.com' in url:
        continue # Skip linkedin as it requires auth
    try:
        r = requests.head(url, headers=headers, allow_redirects=True, timeout=5)
        if r.status_code >= 400:
            print(f"FAILED ({r.status_code}): {url}")
    except Exception as e:
        print(f"ERROR: {url} - {e}")
print("Done checking URLs.")

import requests
from bs4 import BeautifulSoup

url = "https://theprint.in/opinion/gen-z-rules-workplace-but-indian-universities-out-of-touch-can-nep-2020-change-this/2229598/"
headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"}
res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, "html.parser")
title = soup.title.string if soup.title else "No Title"
print("Title:", title)
content = " ".join([p.text for p in soup.find_all("p")])
print("Content length:", len(content))

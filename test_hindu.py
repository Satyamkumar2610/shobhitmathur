import requests
from bs4 import BeautifulSoup

def search_hindu(query):
    url = f"https://www.thehindu.com/search/?q={query}"
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(response.text, 'html.parser')
    links = soup.find_all('a', href=True)
    for l in links:
        if 'article' in l['href'] and '.ece' in l['href']:
            print(l['href'])

search_hindu("shobhit mathur")

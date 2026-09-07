from duckduckgo_search import DDGS
ddgs = DDGS()
results = list(ddgs.text("site:theprint.in Shobhit Mathur", max_results=5))
for r in results:
    print(r['href'])

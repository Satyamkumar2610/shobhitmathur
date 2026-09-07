from googlesearch import search
import time

try:
    results = search('site:theprint.in "India topped the Physics Olympiad"', num_results=3, sleep_interval=2)
    for r in results:
        print(r)
except Exception as e:
    print(f"Error: {e}")

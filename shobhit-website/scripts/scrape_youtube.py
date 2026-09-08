import os
import subprocess
import json

def get_yt_dlp_command():
    # If yt-dlp is not available globally, install it to a temp virtual env
    return [
        "bash", "-c", 
        "python3 -m venv /tmp/yt_env && source /tmp/yt_env/bin/activate && pip install -q yt-dlp && yt-dlp"
    ]

def scrape_videos(queries):
    all_videos = {}
    
    for query in queries:
        print(f"Scraping YouTube for: {query}...")
        cmd_prefix = get_yt_dlp_command()
        cmd = cmd_prefix[:-1] + [f"{cmd_prefix[-1]} '{query}' --dump-json --no-playlist"]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            lines = result.stdout.strip().split('\n')
            
            for line in lines:
                if not line.strip(): continue
                try:
                    data = json.loads(line)
                    
                    # Filter out wrong person (e.g., Shobhit Nirwan)
                    title = data.get("title", "")
                    if "nirwan" in title.lower():
                        continue
                        
                    video_id = data.get("id")
                    
                    if video_id not in all_videos:
                        video = {
                            "id": video_id,
                            "title": title,
                            "duration": data.get("duration_string", "0:00"),
                            "channel": data.get("uploader"),
                            "views": data.get("view_count"),
                            "date": data.get("upload_date") # YYYYMMDD
                        }
                        
                        # Format date if available
                        if video["date"] and len(video["date"]) == 8:
                            year = video["date"][0:4]
                            month = video["date"][4:6]
                            day = video["date"][6:8]
                            video["date"] = f"{year}-{month}-{day}"
                        
                        all_videos[video_id] = video
                except json.JSONDecodeError:
                    continue
                    
        except subprocess.CalledProcessError as e:
            print(f"Error running yt-dlp for {query}: {e.stderr}")
            
    # Convert dict to list
    return list(all_videos.values())

def generate_ts_file(videos, output_path):
    print(f"Saving {len(videos)} videos to {output_path}...")
    
    ts_content = "export interface Video {\n"
    ts_content += "  id: string;\n"
    ts_content += "  title: string;\n"
    ts_content += "  duration: string;\n"
    ts_content += "  channel: string;\n"
    ts_content += "  views?: number;\n"
    ts_content += "  date?: string;\n"
    ts_content += "}\n\n"
    
    ts_content += "export const VIDEOS: Video[] = [\n"
    for v in videos:
        # Escape quotes in title
        safe_title = v['title'].replace('"', '\\"') if v['title'] else ''
        ts_content += "  {\n"
        ts_content += f"    id: \"{v['id']}\",\n"
        ts_content += f"    title: \"{safe_title}\",\n"
        ts_content += f"    duration: \"{v['duration']}\",\n"
        ts_content += f"    channel: \"{v['channel']}\",\n"
        if v.get('views'): ts_content += f"    views: {v['views']},\n"
        if v.get('date'): ts_content += f"    date: \"{v['date']}\",\n"
        ts_content += "  },\n"
    ts_content += "];\n"
    
    with open(output_path, 'w') as f:
        f.write(ts_content)
    
    print("Done!")

if __name__ == "__main__":
    # Ensure src/data exists
    data_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data")
    os.makedirs(data_dir, exist_ok=True)
    
    queries = [
        'ytsearch5:"shobhit mathur" rishihood',
        'ytsearch10:"shobhit mathur" podcast',
        'ytsearch10:"shobhit mathur" interview',
        'ytsearch5:shobhit mathur education policy'
    ]
    
    videos = scrape_videos(queries)
    if videos:
        out_file = os.path.join(data_dir, "videos.ts")
        generate_ts_file(videos, out_file)
    else:
        print("No videos found or scraping failed.")

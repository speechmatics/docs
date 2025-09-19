import requests

url = "https://preview.tts.speechmatics.com/generate/sarah"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "text": "Welcome to the future of speech technology!"
}

SAMPLE_RATE = 16000

response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    wav_data = response.content
    
    with open("output.wav", "wb") as wav_file:  
        wav_file.write(wav_data)
    
    # Calculate actual audio duration
    audio_bytes = len(wav_data) - 44  # Remove WAV header
    samples = audio_bytes // 2  # 16-bit = 2 bytes per sample
    duration = samples / SAMPLE_RATE
    
    print(f"Speech synthesis completed! Saved {len(wav_data)} bytes as output.wav")
    print(f"Audio duration: {duration:.2f} seconds ({samples:,} samples)")
else:
    print(f"Error: {response.status_code}")
    print(f"Response: {response.text}")
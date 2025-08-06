import requests
import wave
import numpy as np

url = "https://preview.tts.speechmatics.com/generate"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "text": "Hi there. This is a quick mic check."
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    # Get raw PCM data (32-bit float, little-endian)
    raw_audio = response.content
    
    # Convert raw bytes to numpy array of 32-bit floats (little-endian)
    float_samples = np.frombuffer(raw_audio, dtype='<f4')  # '<f4' = little-endian 32-bit float
    
    # Convert float samples (-1.0 to 1.0) to 16-bit integers for WAV compatibility
    # Scale to 16-bit range and convert to integers
    int16_samples = (float_samples * 32767).astype(np.int16)
    
    # WAV file parameters
    sample_rate = 16000  # 16 kHz
    channels = 1         # Mono
    sample_width = 2     # 16-bit = 2 bytes (for compatibility)
    
    # Create WAV file
    with wave.open("output.wav", "wb") as wav_file:
        wav_file.setnchannels(channels)
        wav_file.setsampwidth(sample_width)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(int16_samples.tobytes())
    
    duration = len(float_samples) / sample_rate
    print(f"Speech synthesis completed! Saved {len(raw_audio)} bytes as output.wav")
    print(f"Converted {len(float_samples)} float32 samples to 16-bit WAV")
    print(f"Duration: {duration:.2f} seconds")
else:
    print(f"Error: {response.status_code}")
    print(f"Response: {response.text}")
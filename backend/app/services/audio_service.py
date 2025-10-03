import numpy as np
from app.models.audio_detection import AudioDetection, db
from app.utils.audio_utils import process_audio_file, load_audio_model

# Load model once when the module is imported
model = load_audio_model()
classes = ['Healthy', 'Noise', 'Unhealthy']  # Match these to your model's output classes

def analyze_audio(file, flock_id):
    # Process audio file and get features
    features = process_audio_file(file)
    
    # Make prediction
    pred = model.predict(features)[0]
    
    # Get prediction class and confidence
    prediction_idx = np.argmax(pred)
    confidence = float(pred[prediction_idx])
    
    # Create and save detection
    detection = AudioDetection(
        flock_id=flock_id,
        prediction=classes[prediction_idx],
        confidence=confidence
    )
    db.session.add(detection)
    db.session.commit()
    
    return detection
from app.models.image_detection import ImageDetection, db
from app.utils.image_utils import process_image, load_image_model
import numpy as np
import os
from datetime import datetime

model = load_image_model()

def analyze_image(file, flock_id):
    filename = f"flock_{flock_id}_{datetime.utcnow().isoformat()}.jpg"
    filepath = os.path.join("uploads/images", filename)
    file.save(filepath)

    features = process_image(filepath)
    pred = model.predict(np.array([features]))[0]

    classes = ['Healthy', 'Coccidiosis', 'Newcastle', 'Other']
    prediction_idx = np.argmax(pred)
    confidence = float(pred[prediction_idx])

    detection = ImageDetection(
        flock_id=flock_id,
        prediction=classes[prediction_idx],
        confidence=confidence,
        image_path=filepath
    )
    db.session.add(detection)
    db.session.commit()
    return detection

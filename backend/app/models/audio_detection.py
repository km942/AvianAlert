from datetime import datetime
from app.models.user import db

class AudioDetection(db.Model):
    __tablename__ = 'audio_detections'

    id = db.Column(db.Integer, primary_key=True)
    flock_id = db.Column(db.Integer, db.ForeignKey('flocks.id'), nullable=False)
    prediction = db.Column(db.String(50), nullable=False)  # Healthy, Unhealthy, Noise
    confidence = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    flock = db.relationship("Flock", backref="audio_detections")




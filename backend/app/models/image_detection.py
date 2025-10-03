from datetime import datetime
from app.models.user import db
from app.models.flock import Flock

# This model represents the audio detection results for each flock.
class ImageDetection(db.Model):
    __tablename__ = 'image_detections'

    id = db.Column(db.Integer, primary_key=True)
    flock_id = db.Column(db.Integer, db.ForeignKey('flocks.id'), nullable=False)
    prediction = db.Column(db.String(100), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    image_path = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    flock = db.relationship("Flock", backref="image_detections")

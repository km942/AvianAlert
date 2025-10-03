from app.models.user import db
from datetime import datetime

class Flock(db.Model):
    __tablename__ = 'flocks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship for backref
    user = db.relationship("User", backref="flocks")

# app/routes/dashboard_routes.py
from flask import Blueprint, jsonify, g
from app.models.audio_detection import AudioDetection
from app.models.image_detection import ImageDetection
from app.utils.jwt_utils import jwt_required
from sqlalchemy import func
from datetime import datetime, timedelta

dashboard_bp = Blueprint('dashboard_bp', __name__)

@dashboard_bp.route('/summary', methods=['GET'])
@jwt_required
def get_dashboard_summary():
    # Get count of detections by prediction type in the last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    # Audio analysis
    audio_data = AudioDetection.query.filter(
        AudioDetection.flock_id.in_(g.user_flocks),
        AudioDetection.timestamp >= thirty_days_ago
    ).with_entities(
        AudioDetection.prediction, 
        func.count(AudioDetection.id)
    ).group_by(AudioDetection.prediction).all()
    
    audio_summary = {pred: count for pred, count in audio_data}
    
    # Image analysis
    image_data = ImageDetection.query.filter(
        ImageDetection.flock_id.in_(g.user_flocks),
        ImageDetection.timestamp >= thirty_days_ago
    ).with_entities(
        ImageDetection.prediction, 
        func.count(ImageDetection.id)
    ).group_by(ImageDetection.prediction).all()
    
    image_summary = {pred: count for pred, count in image_data}
    
    return jsonify({
        'audio_summary': audio_summary,
        'image_summary': image_summary,
        'total_detections': {
            'audio': sum(audio_summary.values()) if audio_summary else 0,
            'image': sum(image_summary.values()) if image_summary else 0
        }
    })

@dashboard_bp.route('/timeline', methods=['GET'])
@jwt_required
def get_timeline_data():
    # Get detection counts by day for the last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    # Audio timeline
    audio_timeline = AudioDetection.query.filter(
        AudioDetection.flock_id.in_(g.user_flocks),
        AudioDetection.timestamp >= thirty_days_ago
    ).with_entities(
        func.date(AudioDetection.timestamp), 
        AudioDetection.prediction,
        func.count(AudioDetection.id)
    ).group_by(
        func.date(AudioDetection.timestamp),
        AudioDetection.prediction
    ).all()
    
    # Image timeline
    image_timeline = ImageDetection.query.filter(
        ImageDetection.flock_id.in_(g.user_flocks),
        ImageDetection.timestamp >= thirty_days_ago
    ).with_entities(
        func.date(ImageDetection.timestamp), 
        ImageDetection.prediction,
        func.count(ImageDetection.id)
    ).group_by(
        func.date(ImageDetection.timestamp),
        ImageDetection.prediction
    ).all()
    
    # Format data for frontend charts
    formatted_audio = {}
    for date, prediction, count in audio_timeline:
        date_str = date.strftime('%Y-%m-%d')
        if date_str not in formatted_audio:
            formatted_audio[date_str] = {}
        formatted_audio[date_str][prediction] = count
    
    formatted_image = {}
    for date, prediction, count in image_timeline:
        date_str = date.strftime('%Y-%m-%d')
        if date_str not in formatted_image:
            formatted_image[date_str] = {}
        formatted_image[date_str][prediction] = count
    
    return jsonify({
        'audio_timeline': formatted_audio,
        'image_timeline': formatted_image
    })
from flask import Blueprint, request, jsonify, g
from app.services.audio_service import analyze_audio
from app.utils.jwt_utils import jwt_required

audio_bp = Blueprint('audio_bp', __name__)

@audio_bp.route('/upload', methods=['POST'])
@jwt_required
def upload_audio():
    file = request.files.get('audio')
    flock_id = request.form.get('flock_id')

    if not file or not flock_id:
        return jsonify({'error': 'Missing audio file or flock_id'}), 400

    detection = analyze_audio(file, flock_id)
    return jsonify({
        'flock_id': detection.flock_id,
        'prediction': detection.prediction,
        'confidence': detection.confidence,
        'timestamp': detection.timestamp
    })

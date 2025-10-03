from flask import Blueprint, request, jsonify, g
from app.services.image_service import analyze_image
from app.utils.jwt_utils import jwt_required

image_bp = Blueprint('image_bp', __name__)

@image_bp.route('/upload', methods=['POST'])
@jwt_required
def upload_image():
    file = request.files.get('image')
    flock_id = request.form.get('flock_id')

    if not file or not flock_id:
        return jsonify({'error': 'Missing image or flock_id'}), 400

    detection = analyze_image(file, flock_id)
    return jsonify({
        'flock_id': detection.flock_id,
        'prediction': detection.prediction,
        'confidence': detection.confidence,
        'timestamp': detection.timestamp
    })

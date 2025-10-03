from flask import Blueprint, request, jsonify, g
from app.models.flock import Flock, db
from app.utils.jwt_utils import jwt_required

flock_bp = Blueprint('flock_bp', __name__)

@flock_bp.route('/', methods=['GET'])
@jwt_required
def get_flocks():
    flocks = Flock.query.filter_by(user_id=g.user_id).all()
    return jsonify([{'id': f.id, 'name': f.name, 'location': f.location} for f in flocks])

@flock_bp.route('/', methods=['POST'])
@jwt_required
def create_flock():
    data = request.json
    new_flock = Flock(name=data['name'], location=data.get('location'), user_id=g.user_id)
    db.session.add(new_flock)
    db.session.commit()
    return jsonify({'id': new_flock.id, 'name': new_flock.name, 'location': new_flock.location}), 201

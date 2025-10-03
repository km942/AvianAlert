from flask import Blueprint, request, jsonify
from app.services.auth_service import register_user, authenticate_user
from app.utils.jwt_utils import generate_jwt

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    user, error = register_user(data.get('email'), data.get('password'))
    if error:
        return jsonify({'error': error}), 409

    token = generate_jwt(user.id)
    return jsonify({'token': token, 'user': {'id': user.id, 'email': user.email}}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = authenticate_user(data.get('email'), data.get('password'))
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401

    token = generate_jwt(user.id)
    return jsonify({'token': token, 'user': {'id': user.id, 'email': user.email}})

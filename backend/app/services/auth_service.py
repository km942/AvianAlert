from werkzeug.security import generate_password_hash, check_password_hash
from app.models.user import User, db

def register_user(email, password):
    if User.query.filter_by(email=email).first():
        return None, "Email already registered"

    hashed = generate_password_hash(password)
    user = User(email=email, password=hashed)
    db.session.add(user)
    db.session.commit()
    return user, None

def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return user
    return None

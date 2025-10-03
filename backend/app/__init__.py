from flask import Flask
from flask_cors import CORS
from app.models.user import db
from app.routes.auth_routes import auth_bp
from app.routes.flock_routes import flock_bp
from app.routes.audio_routes import audio_bp
from app.routes.image_routes import image_bp
import os

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('app.config.Config')
    
    # Create upload directories
    os.makedirs("uploads/images", exist_ok=True)
    os.makedirs("uploads/audio", exist_ok=True)
    
    db.init_app(app)
    CORS(app)
    
    # Register all blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(flock_bp, url_prefix="/api/flocks")
    app.register_blueprint(audio_bp, url_prefix="/api/audio")
    app.register_blueprint(image_bp, url_prefix="/api/image")
    
    return app

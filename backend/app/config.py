# app/config.py
import os
from datetime import timedelta

class Config:
    # Basic configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
    
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI', 'sqlite:///avian_alert.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Upload paths
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    IMAGE_UPLOAD_FOLDER = os.path.join(UPLOAD_FOLDER, 'images')
    AUDIO_UPLOAD_FOLDER = os.path.join(UPLOAD_FOLDER, 'audio')
    
    # Model paths
    MODEL_FOLDER = os.path.join(os.getcwd(), 'models')
    AUDIO_MODEL_PATH = os.path.join(MODEL_FOLDER, 'audio_model.h5')
    IMAGE_MODEL_PATH = os.path.join(MODEL_FOLDER, 'image_model.h5')
    
    # JWT settings
    JWT_EXPIRATION = timedelta(days=7)
    
    # API settings
    CORS_HEADERS = 'Content-Type'
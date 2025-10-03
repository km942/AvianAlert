# 🐔 Avian Alert – Backend (Flask)

This backend powers **Avian Alert**, an AI-driven poultry health monitoring system. It handles user authentication, flock management, audio/image detection, and health status tracking. Built with Flask, SQLAlchemy, JWT, and deep learning integrations.

## ⚙️ Tech Stack

- Python + Flask
- SQLAlchemy (SQLite / PostgreSQL)
- JWT-based Authentication
- TensorFlow/Keras (for ML models)
- Librosa (for audio processing)
- CORS-enabled API
- Modular project architecture

## 📁 Project Structure

```
avian-alert-backend/
│
├── app/
│ ├── __init__.py             # Flask app factory
│ ├── config.py               # App config (secret key, DB URI, etc.)
│ ├── models/                 # SQLAlchemy models
│ │ ├── user.py
│ │ ├── flock.py
│ │ ├── audio_detection.py
│ │ └── image_detection.py
│ ├── services/               # Business logic
│ │ ├── auth_service.py
│ │ ├── audio_service.py
│ │ └── image_service.py
│ ├── routes/                 # API endpoints
│ │ ├── auth_routes.py
│ │ ├── flock_routes.py
│ │ ├── audio_routes.py
│ │ └── image_routes.py
│ ├── utils/                  # JWT, processing helpers
│ │ ├── jwt_utils.py
│ │ ├── audio_utils.py
│ │ └── image_utils.py
│
├── models/                   # Trained ML models
│ ├── audio_model.h5
│ └── image_model.h5
├── uploads/                  # Upload directories
│ ├── images/
│ └── audio/
├── run.py                    # Entry point
├── requirements.txt
└── README.md                 # This file
```

## 🤖 ML Models Integration

### Audio Model

- Custom CNN architecture with BurnLayer for audio feature extraction
- Processes audio files using Librosa for feature extraction
- Classifies poultry sounds into: `Healthy`, `Unhealthy`, and `Noise` categories
- Key features:
  - Mel spectrogram audio representation
  - Convolutional layers to capture audio patterns
  - BurnLayer for improved model robustness
  - Global Average Pooling for fusion

### Image Model

- Resnet-based architecture for disease classification from poultry images
- Processes images and normalizes to model input format
- Classifies into: `Healthy`, `Coccidiosis`, `Newcastle`, and `Other` disease categories
- Saves images to persistent storage for record-keeping

### Model Utilities

Both models are integrated with custom utility functions:

```python
# Audio processing pipeline
def process_audio_file(file, sr=44100, duration=2.0):
    # Convert uploaded file to mel spectrogram
    y, sr = librosa.load(file, sr=sr, duration=duration)
    mel_spec = librosa.feature.melspectrogram(y=y, sr=sr)
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    # Reshape for model input
    return mel_spec_db.reshape(1, mel_spec_db.shape[0], mel_spec_db.shape[1], 1)

# Image processing pipeline
def process_image(filepath, target_size=(224, 224)):
    img = Image.open(filepath)
    img = img.resize(target_size)
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)
```

## 🔐 Authentication (Custom JWT System)

- Users register/login using email + password
- Passwords are hashed using Werkzeug
- JWTs issued on login, with 7-day expiry
- `@jwt_required` decorator protects all user-specific routes
- Token payload:
```json
{
"user_id": 42,
"exp": 1745567890
}
```

**Authorization Header Format:**
```http
Authorization: Bearer <your-jwt-token>
```

## 🧬 Database Models

### `User`
- `id`, `email`, `password`, `created_at`

### `Flock`
- `id`, `name`, `location`, `user_id`, `created_at`

### `AudioDetection`
- `id`, `flock_id`, `prediction`, `confidence`, `timestamp`

### `ImageDetection`
- `id`, `flock_id`, `prediction`, `confidence`, `image_path`, `timestamp`

## 📦 API Routes

### 🔑 Auth (`/auth`)
| Method | Endpoint | Description |
|--------|----------------|--------------------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate and get JWT |

### 🐓 Flocks (`/api/flocks`)
| Method | Endpoint | Description |
|--------|------------------|-------------------------|
| GET | `/` | Get all user's flocks |
| POST | `/` | Create a new flock |

### 🎧 Audio Detection (`/api/audio`)
| Method | Endpoint | Description |
|--------|-----------------|----------------------------------------|
| POST | `/upload` | Upload audio file for prediction |

**Form Data:**
- `audio`: audio file (`.wav`, `.mp3`, etc.)
- `flock_id`: integer

### 📸 Image Detection (`/api/image`)
| Method | Endpoint | Description |
|--------|-----------------|----------------------------------------|
| POST | `/upload` | Upload image for disease classification |

**Form Data:**
- `image`: image file
- `flock_id`: integer

## 🚀 Running the App

### 1. Clone and Install
```bash
git clone <repo-url>
cd avian-alert-backend
pip install -r requirements.txt
```

### 2. Run Server
```bash
export FLASK_APP=run.py
flask run
```

### 3. Initialize DB
```python
from app import create_app
from app.models.user import db
app = create_app()
with app.app_context():
    db.create_all()
```

### 4. Set Up Model Directories
```python
# Already included in app/__init__.py
import os
os.makedirs("uploads/images", exist_ok=True)
os.makedirs("uploads/audio", exist_ok=True)
```

### 5. Environment Variables
Create a `.env` file with:
```
SECRET_KEY=your_secret_key_here
DATABASE_URI=sqlite:///avian_alert.db
```

## 🔧 Troubleshooting

### Custom Layer Loading Issues
If you encounter issues loading the model with the BurnLayer, ensure the class definition matches exactly:

```python
class BurnLayer(layers.Layer):
    def __init__(self, burn_intensity=0.2, **kwargs):
        super(BurnLayer, self).__init__(**kwargs)
        self.burn_intensity = burn_intensity
    
    def call(self, inputs, training=None):
        if training:
            return inputs + self.burn_intensity * tf.random.normal(shape=tf.shape(inputs))
        else:
            return inputs
    
    def get_config(self):
        config = super(BurnLayer, self).get_config()
        config.update({"burn_intensity": self.burn_intensity})
        return config
```

### Audio Processing Requirements
For audio processing, ensure you have system libraries installed:
```bash
# For Ubuntu/Debian
sudo apt-get install libsndfile1 ffmpeg

# For macOS
brew install libsndfile ffmpeg
```

## 📌 Next Steps

- Add `/simulate_farm` for audio simulation
- Add email/notification support
- Integrate frontend dashboard
- Add batch processing for multiple audio files
- Implement historical trend analysis
- Set up automated testing pipeline
- Add user roles (admin, farm manager, etc.)
- Integrate real-time monitoring capabilities
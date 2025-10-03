import numpy as np
import librosa
import tensorflow as tf
from keras import layers  # ✅ fixed import

# Define the custom BurnLayer class
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

def process_audio_file(file, sr=44100, duration=2.0):
    y, sr = librosa.load(file, sr=sr, duration=duration)
    if len(y) < int(duration * sr):
        y = np.pad(y, (0, int(duration * sr) - len(y)))
    mel_spec = librosa.feature.melspectrogram(y=y, sr=sr)
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    features = mel_spec_db.reshape(1, mel_spec_db.shape[0], mel_spec_db.shape[1], 1)
    return features

def load_audio_model():
    custom_objects = {"BurnLayer": BurnLayer}
    model = tf.keras.models.load_model('models/best_poultry_audio_model.h5', custom_objects=custom_objects)
    return model

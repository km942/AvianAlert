import numpy as np
import tensorflow as tf
from PIL import Image
from keras import layers  # ✅ Fixed import

# Define custom BurnLayer for robustness
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

def process_image(filepath, target_size=(224, 224)):
    # Load and preprocess image
    img = Image.open(filepath)
    img = img.resize(target_size)
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def load_image_model():
    custom_objects = {"BurnLayer": BurnLayer}
    model = tf.keras.models.load_model('models/image_model.h5', custom_objects=custom_objects)
    return model

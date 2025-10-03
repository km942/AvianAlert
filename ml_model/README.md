# 🐔 Poultry Disease Classification from Fecal Images

This project aims to classify poultry diseases based on fecal images using deep learning. The goal is to develop an efficient and accessible diagnostic tool that can assist farmers and veterinarians by identifying potential diseases from visual patterns in poultry feces.

We are currently working on building a Convolutional Neural Network (CNN) that can recognize and categorize images into four disease classes:

- **Healthy**
- **Coccidiosis** (`cocci`)
- **Salmonella** (`salmo`)
- **Newcastle Disease** (`ncd`)

---

## 🧠 What We're Doing

- Using a custom image dataset of poultry feces, labeled by disease category.
- Reducing image dimensions to optimize performance on limited-memory devices (160x160 resolution).
- Leveraging mixed precision training for faster computation on Apple Silicon chips (M1/M2).
- Training and validating a CNN to accurately classify new images into one of the four disease categories.

---

## ✅ Progress So Far

- [x] Library imports and environment setup
- [x] GPU acceleration support for Apple Silicon
- [x] Mixed precision enabled for better performance
- [x] Image size and batch size optimized for 8GB RAM
- [ ] Data preprocessing and augmentation
- [ ] CNN model architecture
- [ ] Training and evaluation
- [ ] Inference pipeline

---

## 🌾 Why This Matters

Early detection of poultry diseases can prevent large-scale outbreaks, reduce economic loss, and promote healthier livestock conditions. This tool can eventually be integrated into mobile or web applications to empower small-scale poultry farmers with AI-driven diagnostics.

---


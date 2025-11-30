from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
import pickle
import os
import numpy as np
import pandas as pd
from app.security import sanitize_text_input

bp = Blueprint('bot', __name__)

# Load model and data
# Note: In a production app, this should be done more robustly, maybe lazily or in app factory
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'ml_model', 'model.pkl')
COLUMNS_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'ml_model', 'columns.pkl')
PRECAUTIONS_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'ml_model', 'precautions.pkl')

model = None
model_columns = None
precautions_df = None

def load_ml_assets():
    global model, model_columns, precautions_df
    try:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
        if os.path.exists(COLUMNS_PATH):
            with open(COLUMNS_PATH, 'rb') as f:
                model_columns = pickle.load(f)
        if os.path.exists(PRECAUTIONS_PATH):
            with open(PRECAUTIONS_PATH, 'rb') as f:
                precautions_df = pickle.load(f)
    except Exception as e:
        print(f"Error loading ML assets: {e}")

load_ml_assets()

@bp.route('/chat', methods=['GET', 'POST'])
@login_required
def chat():
    if request.method == 'GET':
        return render_template('bot/chat.html')
    
    # API endpoint for chat
    data = request.get_json()
    user_message = data.get('message', '')
    
    # Sanitize user input to prevent XSS attacks
    user_message = sanitize_text_input(user_message, max_length=500).lower()
    
    if not model or not model_columns:
        return jsonify({'response': "I'm sorry, my brain (ML model) is currently offline. Please contact admin."})

    # Simple keyword matching for symptoms
    # In a real app, use NLP (spaCy/NLTK) to extract entities
    detected_symptoms = []
    for symptom in model_columns:
        # Replace underscores with spaces for matching
        symptom_clean = symptom.replace('_', ' ')
        if symptom_clean in user_message or symptom in user_message:
            detected_symptoms.append(symptom)
            
    if not detected_symptoms:
        return jsonify({
            'response': "I couldn't detect any specific symptoms from your message. Please describe your symptoms clearly (e.g., 'I have itching and skin rash').",
            'detected_symptoms': []
        })
        
    # Prepare input vector
    input_vector = pd.DataFrame(0, index=[0], columns=model_columns)
    for sym in detected_symptoms:
        input_vector[sym] = 1
        
    # Predict
    prediction = model.predict(input_vector)[0]
    
    # Get precautions
    precautions = []
    if precautions_df is not None:
        row = precautions_df[precautions_df['Disease'] == prediction]
        if not row.empty:
            precautions = row.iloc[0, 1:].dropna().tolist()
            
    response_text = f"Based on your symptoms ({', '.join(detected_symptoms)}), it looks like you might have **{prediction}**."
    if precautions:
        response_text += "<br><br><strong>Recommended Precautions:</strong><ul>"
        for p in precautions:
            response_text += f"<li>{p}</li>"
        response_text += "</ul>"
        
    response_text += "<br><em>Note: This is an AI prediction. Please consult a doctor for a professional diagnosis.</em>"

    return jsonify({
        'response': response_text,
        'disease': prediction,
        'precautions': precautions
    })

@bp.route('/find_doctors')
@login_required
def find_doctors():
    return render_template('bot/doctors.html')

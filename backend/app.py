from flask import Flask, request, jsonify
import numpy as np
import joblib
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your trained models and scaler
regressor = joblib.load('regressor.pkl')
classifier = joblib.load('classifier.pkl')
scaler = joblib.load('scaler.pkl')

# Encoded mappings (must match LabelEncoder from training)
label_maps = {
    "Dietary_Pattern": {
        "vegan": 4,
        "fast food": 1,
        "processed": 2,
        "traditional": 3,
        "balanced":0
    },
    "Socioeconomic_Status": {
        "high": 0,
        "low": 1,
        "medium": 2
    },
    "Environmental_Factors": {
        "high": 0,
        "low": 1,
        "medium": 2
    },
    "Region": {
        "urban": 2,
        "rural": 0,
        "suburban": 1
    },
    "Nutrition_Access": {
        "good": 2,
        "average": 0,
        "excellent": 1,
        "poor": 3
    }
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_features = data['features']

    # Apply mapping to encoded fields
    input_features[1] = label_maps["Dietary_Pattern"].get(input_features[1], 0)
    input_features[3] = label_maps["Socioeconomic_Status"].get(input_features[3], 0)
    input_features[5] = label_maps["Environmental_Factors"].get(input_features[5], 0)
    input_features[6] = label_maps["Region"].get(input_features[6], 0)
    input_features[11] = label_maps["Nutrition_Access"].get(input_features[11], 0)

    # Predict using both models
    scaled = scaler.transform([input_features])
    predicted_age = regressor.predict(scaled)[0]
    predicted_class = classifier.predict([input_features])[0]
    label = "Late" if predicted_class == 1 else "Early"

    return jsonify({
        "predicted_age": math.ceil(predicted_age),
        "category": label
    })

if __name__ == '__main__':
    app.run(debug=True)
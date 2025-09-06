import React, { useState } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';


const inputFields = [
  { label: "Age (in years)", type: "number" },
  { label: "Dietary Pattern", type: "select", options: ["Vegan", "Fast food", "Processed", "Traditional"] },
  { label: "Fast Food Intake (per week)", type: "number" },
  { label: "Socioeconomic Status", type: "select", options: ["High", "Low", "Medium"] },
  { label: "Physical Activity (hrs per week)", type: "number" },
  { label: "Environmental Factors", type: "select", options: ["High", "Low", "Medium"] },
  { label: "Region", type: "select", options: ["Urban", "Rural", "Suburban"] },
  { label: "Sugar Intake (grams per day)", type: "number" },
  { label: "Fiber Intake (grams per day)", type: "number" },
  { label: "Protein Intake (grams per day)", type: "number" },
  { label: "Processed Food Score", type: "number" },
  { label: "Nutrition Access", type: "select", options: ["Good", "Average", "Excellent", "Poor"] },
  { label: "BMI",type:"number"}
];

export default function App() {
  const [features, setFeatures] = useState(Array(inputFields.length).fill(""));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...features];
    updated[index] = inputFields[index].type === 'number' ? parseFloat(value) : value;
    setFeatures(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        features: features,
      });
      setResult(response.data);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert("Something went wrong! Please check your inputs and server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#fce4ec',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
    }}
  >
    <div style={{
        display: 'flex',
        
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1000px',
        width: '100%',
        marginTop:'20px'
      }}>
      <Player
        autoplay
        loop
        src="https://assets10.lottiefiles.com/packages/lf20_tll0j4bb.json"
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.85,
        }}
      />
    </div>
      <div 
      style={{
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 30px 40px rgba(0,0,0,0.2)',
      width: '100%',
      maxWidth: '35rem',
      zIndex: 1,
      backdropFilter: 'blur(4px)'
    }}>
        <h1 style={{
        fontSize: '2.25rem',
        fontWeight: '800',
        textAlign: 'center',
        color: '#be123c',
        marginBottom: '1.5rem',
        padding: '1rem',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
      }}>
          Menstrual Onset Predictor
        </h1>

        <p style={{
        fontSize: '0.875rem',
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
          Enter your information below to predict age at menarche and its classification (Early/Late).
        </p>

        <div style={{
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem'
}}>
          {inputFields.map((field, index) => (
            <div key={index} style={{
  display: 'flex',
  flexDirection: 'column'
}}>
              <label style={{
  fontSize: '0.875rem',
  color: '#374151',
  fontWeight: '500',
  marginBottom: '0.25rem'
}}>
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  value={features[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  style={{
    padding: '0.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #d1d5db',
    outline: 'none',
    textAlign: 'center'
  }}
  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #fb7185'}
  onBlur={(e) => e.target.style.boxShadow = 'none'}
                >
                  <option value="">Select</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  value={features[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  style={{
    padding: '0.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #d1d5db',
    outline: 'none',
    textAlign: 'center'
  }}
  onFocus={(e) => {
    e.target.style.boxShadow = '0 0 0 2px #fb7185';
  }}
  onBlur={(e) => {
    e.target.style.boxShadow = 'none';
  }}
                  placeholder={`Enter ${field.label}`}
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
    marginTop: '1.5rem',
    width: '100%',
    backgroundColor: '#f43f5e',
    color: '#ffffff',
    fontWeight: 600,
    padding: '0.5rem 1rem',
    borderRadius: '0.75rem',
    transition: 'background-color 300ms',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#e11d48'}
  onMouseLeave={(e) => e.target.style.backgroundColor = '#f43f5e'}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {result && (
          <div style={{
    marginTop: '1.5rem',
    textAlign: 'center',
    backgroundColor: '#ffe4e6',
    padding: '1rem',
    borderRadius: '0.75rem'
  }}>
            <h2 style={{
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#be123c'
}}>
              Predicted Age: <span style={{ fontWeight: '700' }}>{result.predicted_age} years</span>
            </h2>
            <p style={{
  fontSize: '1.125rem',
  color: '#374151'
}}>
              Category: <span style={{ fontWeight: '700' }}>{result.category}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

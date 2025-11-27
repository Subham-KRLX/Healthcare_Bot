import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

def train_model():
    # Load dataset
    data_path = os.path.join(os.path.dirname(__file__), 'dataset.csv')
    df = pd.read_csv(data_path)

    # Preprocessing
    # The dataset has symptoms as columns (Symptom_1, Symptom_2, etc.)
    # We need to convert this into a format where each unique symptom is a feature (column)
    # and the value is 1 if present, 0 if not.
    
    # 1. Get all unique symptoms
    symptom_cols = [col for col in df.columns if 'Symptom' in col]
    unique_symptoms = pd.unique(df[symptom_cols].values.ravel('K'))
    unique_symptoms = [s for s in unique_symptoms if str(s) != 'nan']
    
    # 2. Create a new dataframe with these symptoms as columns
    # Initialize with zeros
    processed_df = pd.DataFrame(0, index=df.index, columns=unique_symptoms)
    
    # 3. Fill the dataframe
    for index, row in df.iterrows():
        for col in symptom_cols:
            symptom = row[col]
            if pd.notna(symptom):
                processed_df.at[index, symptom] = 1
                
    # Add the target variable (Disease)
    processed_df['Disease'] = df['Disease']
    
    # Prepare X and y
    X = processed_df.drop('Disease', axis=1)
    y = processed_df['Disease']
    
    # Split data (optional, but good practice to check accuracy)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    
    # Evaluate
    score = clf.score(X_test, y_test)
    print(f"Model Accuracy: {score * 100:.2f}%")
    
    # Save model and columns
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    columns_path = os.path.join(os.path.dirname(__file__), 'columns.pkl')
    
    with open(model_path, 'wb') as f:
        pickle.dump(clf, f)
        
    with open(columns_path, 'wb') as f:
        pickle.dump(X.columns.tolist(), f)
        
    print("Model and columns saved successfully.")

    # Also save the precautions mapping for easy lookup
    precautions_df = df[['Disease', 'Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']].drop_duplicates()
    precautions_path = os.path.join(os.path.dirname(__file__), 'precautions.pkl')
    with open(precautions_path, 'wb') as f:
        pickle.dump(precautions_df, f)
    print("Precautions saved successfully.")

if __name__ == "__main__":
    train_model()

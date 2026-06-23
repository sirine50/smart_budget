from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import joblib
import os
import re

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FILE_PATH = "smart_budget_model.joblib"
if not os.path.exists(FILE_PATH):
    raise RuntimeError(f"Critical Error: '{FILE_PATH}' not found. Did you run train_model.py first?")

model = joblib.load(FILE_PATH)


@app.get('/')
def root():
    return {"message": "the backend is fonctionnal"}

@app.post("/predict")
def predict_category(description:str):

    if not description.strip():
        raise HTTPException(status_code=400, detail="Description cannot be empty.")
    

    clean_input = description.lower()

    clean_input = re.sub(r"[^A-Za-z0-9 ]", " ", clean_input)
    clean_input = re.sub(r"\s+", " ", clean_input)
    clean_input = clean_input.strip()

    input_data = [clean_input]
    prediction = model.predict(input_data)

    predicted_category = prediction[0]
    
    return {
        "original_description": description,
        "cleaned_description": clean_input,
        "predicted_category": predicted_category
    }

@app.post("/upload-statement")
async def upload_statement(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV.")
    
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    if "Description" not in df.columns:
        raise HTTPException(status_code=400, detail="CSV must contain a 'Description' column.")
    
    df["Cleaned"] = df["Description"].astype(str).str.lower()
    df["Cleaned"] = df["Cleaned"].str.replace(r"[^a-zA-Z0-9 ]", " ", regex=True)
    df["Cleaned"] = df["Cleaned"].str.replace(r"[0-9]", " ", regex=True)
    df["Cleaned"] = df["Cleaned"].str.replace(r"\s+", " ", regex=True).str.strip()

    predictions = model.predict(df["Cleaned"])

    df["Predicted_Category"] = predictions
    
    
    category_counts = df["Predicted_Category"].value_counts().to_dict()
    
    
    transactions_list = df[["Description", "Predicted_Category"]].to_dict(orient="records")
    
    return {
        "filename": file.filename,
        "total_transactions": len(df),
        "summary": category_counts,
        "transactions": transactions_list
    }
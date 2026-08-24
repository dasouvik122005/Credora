from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ManualDataInput, AssessmentResponse
from scoring import calculate_score_from_manual
from data_processor import process_csv
import pandas as pd
import io

app = FastAPI(title="Stateless Credit Assessment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze-financial-profile", response_model=AssessmentResponse)
async def analyze_financial_profile(data: ManualDataInput):
    try:
        return calculate_score_from_manual(data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/analyze-csv", response_model=AssessmentResponse)
async def analyze_csv(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")
    
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        return process_csv(df)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing CSV: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Stateless Credit Assessment API is running"}

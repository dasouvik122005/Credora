import pandas as pd
from models import AssessmentResponse

def process_csv(df: pd.DataFrame) -> AssessmentResponse:
    if df.empty:
        raise ValueError("Uploaded CSV is empty")
        
    required_cols = {'Date', 'Amount', 'Type', 'Category'}
    if not required_cols.issubset(df.columns):
        raise ValueError(f"CSV missing required columns. Expected: {required_cols}")

    income = df[df['Type'].str.lower() == 'credit']['Amount'].sum()
    expenses = df[df['Type'].str.lower() == 'debit']['Amount'].sum()
    savings = income - expenses
    
    income_score = min(100, int((income / 50000) * 100)) if income > 0 else 0
    savings_score = min(100, int((savings / income) * 300)) if income > 0 and savings > 0 else 0
    payment_score = 85 
    
    base_score = 300
    variable_score = (income_score * 0.3) + (savings_score * 0.4) + (payment_score * 0.3)
    final_score = base_score + int(variable_score * 6)
    final_score = max(300, min(900, final_score)) 
    
    risk_level = "Low" if final_score > 700 else "Medium" if final_score > 550 else "High"
    
    flags = []
    recommendations = []
    
    if expenses > income * 0.8:
        flags.append("High spending detected")
        recommendations.append("Reduce unnecessary high-value transactions")
    
    if savings_score < 30:
        recommendations.append("Focus on increasing monthly savings")
        
    return AssessmentResponse(
        credit_score=final_score,
        risk_level=risk_level,
        income_stability=income_score,
        savings_behavior=savings_score,
        payment_discipline=payment_score,
        cashflow_stability=min(100, 100 - int((expenses / income) * 100)) if income > 0 else 0,
        fraud_risk="Low",
        risk_flags=flags,
        recommendations=recommendations or ["Good financial health. Keep it up!"]
    )

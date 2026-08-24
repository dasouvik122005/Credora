from pydantic import BaseModel
from typing import List, Optional

class ManualDataInput(BaseModel):
    monthly_income: float
    monthly_expenses: float
    average_savings: float
    utility_payment_consistency: float
    employment_type: str

class AssessmentResponse(BaseModel):
    credit_score: int
    risk_level: str
    income_stability: int
    savings_behavior: int
    payment_discipline: int
    cashflow_stability: int
    fraud_risk: str
    risk_flags: List[str]
    recommendations: List[str]

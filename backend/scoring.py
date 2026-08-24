from models import ManualDataInput, AssessmentResponse

def calculate_score_from_manual(data: ManualDataInput) -> AssessmentResponse:
    income_score = min(100, int((data.monthly_income / 50000) * 100)) if data.monthly_income > 0 else 0
    savings_score = min(100, int((data.average_savings / data.monthly_income) * 300)) if data.monthly_income > 0 else 0
    payment_score = int(data.utility_payment_consistency)
    
    base_score = 300
    variable_score = (income_score * 0.3) + (savings_score * 0.4) + (payment_score * 0.3)
    final_score = base_score + int(variable_score * 6) 

    risk_level = "Low" if final_score > 700 else "Medium" if final_score > 550 else "High"
    
    flags = []
    recommendations = []
    
    if data.monthly_expenses > data.monthly_income * 0.8:
        flags.append("High expense-to-income ratio")
        recommendations.append("Reduce monthly expenses to improve savings buffer")
    if data.utility_payment_consistency < 80:
        flags.append("Irregular utility payments")
        recommendations.append("Improve regularity of bill payments")
    if savings_score < 40:
        recommendations.append("Maintain consistent monthly savings")

    return AssessmentResponse(
        credit_score=final_score,
        risk_level=risk_level,
        income_stability=income_score,
        savings_behavior=savings_score,
        payment_discipline=payment_score,
        cashflow_stability=min(100, 100 - int((data.monthly_expenses / data.monthly_income) * 100)) if data.monthly_income > 0 else 0,
        fraud_risk="Low",
        risk_flags=flags,
        recommendations=recommendations or ["Good financial health. Keep it up!"]
    )

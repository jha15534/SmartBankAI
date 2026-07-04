def predict_loan(income, expenses, loan_amount, years):

    savings = income - expenses

    emi = loan_amount / (years * 12)

    score = 100

    if savings < emi:
        score -= 40

    if expenses > income * 0.6:
        score -= 20

    if loan_amount > income * 20:
        score -= 25

    if score >= 75:

        status = "Eligible"

        recommendation = (
            "You are financially eligible for this loan."
        )

    elif score >= 50:

        status = "Maybe Eligible"

        recommendation = (
            "Reduce expenses or increase income."
        )

    else:

        status = "Not Eligible"

        recommendation = (
            "Loan approval is not recommended."
        )

    return {

        "status": status,

        "score": score,

        "emi": round(emi, 2),

        "recommendation": recommendation

    }
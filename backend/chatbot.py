import os
import re
import google.generativeai as genai
from dotenv import load_dotenv

# Load Environment Variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Gemini Model
model = genai.GenerativeModel("gemini-2.5-flash")


def ask_gemini(user_data, question):

    question_lower = question.lower()

    # ==========================
    # ACCOUNT RELATED QUESTIONS
    # ==========================

    if "balance" in question_lower:
        return f"💰 Your current account balance is ₹{user_data['balance']}."

    if (
        "account number" in question_lower
        or "my account" in question_lower
    ):
        return f"🏦 Your account number is {user_data['account_number']}."

    if (
        "transaction" in question_lower
        or "history" in question_lower
    ):
        return (
            "📄 Your recent transactions are:\n\n"
            f"{user_data['transactions']}"
        )

    # ==========================
    # SEND MONEY CHECK
    # ==========================

    amount_match = re.search(r"\d+", question)

    if (
        ("send" in question_lower or "transfer" in question_lower)
        and amount_match
    ):

        amount = float(amount_match.group())

        balance = float(user_data["balance"])

        if amount <= balance:

            return (
                f"✅ Yes, you can send ₹{amount:.2f}.\n\n"
                f"Your current balance is ₹{balance:.2f}."
            )

        else:

            return (
                f"❌ You cannot send ₹{amount:.2f}.\n\n"
                f"Your available balance is only ₹{balance:.2f}."
            )

    # ==========================
    # GEMINI PROMPT
    # ==========================

    prompt = f"""
You are SmartBank AI, a professional AI Banking Assistant.

User Details

Name: {user_data['name']}

Account Number: {user_data['account_number']}

Current Balance: ₹{user_data['balance']}

Recent Transactions:

{user_data['transactions']}

Instructions:

1. Never change or guess account details.
2. Use the provided balance and transactions whenever relevant.
3. Answer professionally and clearly.
4. For general banking questions (UPI, NEFT, RTGS, IMPS, loans, fraud prevention, savings, etc.), use your banking knowledge.
5. If the user asks something unrelated to banking, politely answer it if appropriate.
6. Keep responses concise and easy to understand.
7. Format your answer using Markdown.
8. Use headings when required.
9. Use bullet points whenever possible.
10. Keep responses short and professional.

User Question:
{question}
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception:

        return (
            "Sorry, SmartBank AI is currently unavailable. "
            "Please try again in a few moments."
        )
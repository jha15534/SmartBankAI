from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from schemas import UserCreate, LoginAccount, LoginVerify, DepositRequest, WithdrawRequest,  UpdateProfile, VerifyMPIN, SendMoneyRequest, FraudCheckRequest, ChangeMPIN,ChatRequest, LoanRequest
from models import User, Transaction
from chatbot import ask_gemini
from loan_ai import predict_loan
from fastapi.responses import FileResponse
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
        "https://smart-bank-ai-taupe.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "SmartBank AI Running"}

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    new_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        dob=user.dob,
        address=user.address,
        account_number=user.account_number,
        security_question=user.security_question,
        security_answer=user.security_answer,
        mpin=user.mpin
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user_id": new_user.user_id
    }

@app.post("/login/account")
def get_question(data: LoginAccount, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == data.account_number
    ).first()

    if not user:
        return {
            "message": "Account Not Found"
        }

    return {
        "security_question": user.security_question
    }

@app.post("/login/verify")
def verify_login(data: LoginVerify, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == data.account_number
    ).first()

    if not user:
        return {
            "message": "Account Not Found"
        }

    if user.security_answer.lower() == data.security_answer.lower():
        return {
            "message": "Login Successful"
        }

    return {
        "message": "Invalid Security Answer"
    }

@app.get("/dashboard/{account_number}")
def dashboard(account_number: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == account_number
    ).first()

    if not user:
        return {"message": "User not found"}

    return {
        "name": user.name,
        "account_number": user.account_number,
        "balance": user.balance
    }

@app.post("/deposit")
def deposit(data: DepositRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == data.account_number
    ).first()

    if not user:
        return {"message": "User not found"}

    user.balance = float(user.balance) + data.amount

    db.add(user)

    transaction = Transaction(
        account_number=data.account_number,
        transaction_type="Deposit",
        amount=data.amount
    )

    db.add(transaction)
    db.commit()
    db.refresh(user)

    return {
        "message": "Amount Deposited Successfully",
        "updated_balance": user.balance
    }

@app.post("/withdraw")
def withdraw(data: WithdrawRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == data.account_number
    ).first()

    if not user:
        return {"message": "User not found"}

    if float(user.balance) < data.amount:
        return {
            "message": "Insufficient Balance"
        }

    user.balance = float(user.balance) - data.amount

    db.add(user)

    transaction = Transaction(
        account_number=data.account_number,
        transaction_type="Withdraw",
        amount=data.amount
    )

    db.add(transaction)
    db.commit()
    db.refresh(user)

    return {
        "message": "Amount Withdrawn Successfully",
        "updated_balance": user.balance
    }

@app.post("/fraud-check")
def fraud_check(data: FraudCheckRequest, db: Session = Depends(get_db)):

    risk_score = 0
    reasons = []

    sender = db.query(User).filter(
        User.account_number == data.sender_account
    ).first()

    receiver = db.query(User).filter(
        User.account_number == data.receiver_account
    ).first()

    if not sender:
        return {
            "message": "Sender Not Found"
        }

    if not receiver:
        risk_score += 40
        reasons.append("Unknown Receiver")

    if data.amount >= 50000:
        risk_score += 35
        reasons.append("Large Amount")

    if sender.account_number == data.receiver_account:
        risk_score += 100
        reasons.append("Self Transfer")

    if risk_score >= 70:

        status = "High Risk"

    elif risk_score >= 40:

        status = "Medium Risk"

    else:

        status = "Safe"

    return {

        "risk_score": risk_score,
        "status": status,
        "reasons": reasons

    }
@app.get("/verify-recipient/{account_number}")
def verify_recipient(account_number: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == account_number
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Recipient Not Found"
        )

    return {
        "name": user.name,
        "account_number": user.account_number,
        "bank": "SmartBank AI",
        "verified": True
    }
@app.post("/send-money")
def send_money(data: SendMoneyRequest, db: Session = Depends(get_db)):

    sender = db.query(User).filter(
        User.account_number == data.sender_account
    ).first()

    if not sender:
        return {"message": "Sender Account Not Found"}

    receiver = db.query(User).filter(
        User.account_number == data.receiver_account
    ).first()

    if not receiver:
        return {"message": "Receiver Account Not Found"}

    if sender.mpin != data.mpin:
        return {"message": "Invalid MPIN"}

    if float(sender.balance) < data.amount:
        return {"message": "Insufficient Balance"}

    sender.balance -= data.amount
    receiver.balance += data.amount

    db.add(sender)
    db.add(receiver)

    sender_transaction = Transaction(
        account_number=sender.account_number,
        transaction_type="Sent",
        amount=data.amount
    )

    receiver_transaction = Transaction(
        account_number=receiver.account_number,
        transaction_type="Received",
        amount=data.amount
    )

    db.add(sender_transaction)
    db.add(receiver_transaction)

    db.commit()

    return {
        "message": "Money Sent Successfully"
    }
@app.get("/transactions/{account_number}")
def transaction_history(account_number: str, db: Session = Depends(get_db)):

    transactions = db.query(Transaction).filter(
        Transaction.account_number == account_number
    ).order_by(desc(Transaction.created_at)).all()

    if not transactions:
        return {
            "message": "No Transactions Found"
        }

    history = []

    for t in transactions:
        history.append({
            "transaction_id": t.transaction_id,
            "type": t.transaction_type,
            "amount": t.amount,
            "date": t.created_at
        })

    return history

@app.get("/profile/{account_number}")
def get_profile(account_number: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == account_number
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    return {
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "dob": user.dob,
        "address": user.address,
        "account_number": user.account_number
    }

@app.put("/profile/{account_number}")
def update_profile(
    account_number: str,
    data: UpdateProfile,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.account_number == account_number
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    user.name = data.name
    user.email = data.email
    user.phone = data.phone
    user.dob = data.dob
    user.address = data.address

    db.commit()
    db.refresh(user)

    return {
        "message": "Profile Updated Successfully"
    }

@app.post("/verify-mpin")
def verify_mpin(data: VerifyMPIN, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == data.account_number
    ).first()

    if not user:
        return {"message": "User not found"}

    print("Database MPIN:", user.mpin)
    print("Entered MPIN :", data.mpin)
    print("Account No   :", data.account_number)

    if str(user.mpin).strip() != str(data.mpin).strip():
        return {
            "message": "Invalid MPIN"
        }

    return {
        "message": "Verified",
        "balance": user.balance
    }

@app.post("/change-mpin")
def change_mpin(data: ChangeMPIN, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == data.account_number
    ).first()

    if not user:
        return {
            "message": "User Not Found"
        }

    if str(user.mpin) != str(data.current_mpin):
        return {
            "message": "Current MPIN is Incorrect"
        }

    user.mpin = data.new_mpin

    db.commit()

    return {
        "message": "MPIN Updated Successfully"
    }

@app.post("/chat")
def chat(data: ChatRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == data.account_number
    ).first()

    if not user:
        return {
            "message": "User Not Found"
        }

    transactions = db.query(Transaction).filter(
        Transaction.account_number == data.account_number
    ).order_by(desc(Transaction.created_at)).limit(5).all()

    transaction_text = ""

    for t in transactions:

        transaction_text += (
            f"{t.transaction_type} ₹{t.amount} "
            f"on {t.created_at}\n"
        )

    user_data = {

        "name": user.name,

        "account_number": user.account_number,

        "balance": float(user.balance),

        "transactions": transaction_text if transaction_text else "No recent transactions"

    }

    answer = ask_gemini(
        user_data,
        data.question
    )

    return {
        "reply": answer
    }
@app.post("/loan-predict")
def loan_predict(data: LoanRequest):

    result = predict_loan(

        data.income,

        data.expenses,

        data.loan_amount,

        data.years

    )

    return result

@app.get("/download-statement/{account_number}")
def download_statement(account_number: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.account_number == account_number
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    transactions = db.query(Transaction).filter(
        Transaction.account_number == account_number
    ).order_by(desc(Transaction.created_at)).all()

    pdf_name = f"Statement_{account_number}.pdf"

    doc = SimpleDocTemplate(pdf_name)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph("<b><font size=18>SMARTBANK AI</font></b>", styles["Title"])
    )

    elements.append(
        Paragraph("<b>Account Statement</b>", styles["Heading2"])
    )

    elements.append(
        Paragraph(f"Customer : {user.name}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"Account No : {user.account_number}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"Balance : ₹ {user.balance}", styles["BodyText"])
    )

    elements.append(
        Paragraph(" ", styles["BodyText"])
    )

    data = [

        ["Type", "Amount", "Date"]

    ]

    for t in transactions:

        data.append([

            t.transaction_type,

            f"₹ {t.amount}",

            str(t.created_at)

        ])

    table = Table(data)

    table.setStyle(

        TableStyle([

            ("BACKGROUND", (0,0), (-1,0), colors.cyan),

            ("TEXTCOLOR", (0,0), (-1,0), colors.white),

            ("GRID",(0,0),(-1,-1),1,colors.black),

            ("BACKGROUND",(0,1),(-1,-1),colors.beige),

            ("ALIGN",(0,0),(-1,-1),"CENTER")

        ])

    )

    elements.append(table)

    doc.build(elements)

    return FileResponse(

        pdf_name,

        media_type="application/pdf",

        filename=pdf_name

    )
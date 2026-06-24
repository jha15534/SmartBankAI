from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import get_db
from schemas import UserCreate, LoginAccount, LoginVerify
from models import User

app = FastAPI()

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
        security_answer=user.security_answer
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
from sqlalchemy import Column, Integer, String, Text, Date, DECIMAL, DateTime, func
from sqlalchemy.orm import declarative_base
from database import engine

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    phone = Column(String(20))
    dob = Column(String(20))
    address = Column(String(255))
    account_number = Column(String(20), unique=True)
    security_question = Column(String(255))
    security_answer = Column(String(255))
    balance = Column(DECIMAL(10,2), default=10000)
    mpin = Column(String(4))

class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(Integer, primary_key=True, index=True)
    account_number = Column(String(20))
    transaction_type = Column(String(20))
    amount = Column(DECIMAL(10,2))
    created_at = Column(DateTime, server_default=func.now())

Base.metadata.create_all(bind=engine)
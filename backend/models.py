from sqlalchemy import Column, Integer, String
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

Base.metadata.create_all(bind=engine)
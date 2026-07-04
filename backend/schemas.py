from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
    dob: str
    address: str
    account_number: str
    security_question: str
    security_answer: str
    mpin: str

class LoginAccount(BaseModel):
    account_number: str


class LoginVerify(BaseModel):
    account_number: str
    security_answer: str

class DepositRequest(BaseModel):
    account_number: str
    amount: float


class WithdrawRequest(BaseModel):
    account_number: str
    amount: float
class SendMoneyRequest(BaseModel):
    sender_account: str
    receiver_account: str
    amount: float
    mpin: str
class UpdateProfile(BaseModel):
    name: str
    email: str
    phone: str
    dob: str
    address: str

class VerifyMPIN(BaseModel):
    account_number: str
    mpin: str

class FraudCheckRequest(BaseModel):
    sender_account: str
    receiver_account: str
    amount: float
class ChangeMPIN(BaseModel):
    account_number: str
    current_mpin: str
    new_mpin: str

class ChatRequest(BaseModel):
    account_number: str
    question: str

class LoanRequest(BaseModel):
    income: float
    expenses: float
    loan_amount: float
    years: int

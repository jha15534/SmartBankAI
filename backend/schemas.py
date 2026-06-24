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

class LoginAccount(BaseModel):
    account_number: str


class LoginVerify(BaseModel):
    account_number: str
    security_answer: str
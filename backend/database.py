from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://root:Shruti%400212@localhost/smartbank_ai"

engine = create_engine(DATABASE_URL)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
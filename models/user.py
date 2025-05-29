from sqlalchemy import Column, Integer, String
from .meta import Base

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)  # wajib dan unik
    password = Column(String, nullable=False)  # simpan hash password
    role = Column(String, nullable=False)      # "admin" atau "user"

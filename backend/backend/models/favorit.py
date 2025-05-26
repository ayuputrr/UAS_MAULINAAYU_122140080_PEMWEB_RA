# models/favorit.py
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Favorit(Base):
    __tablename__ = 'favorit'

    id = Column(Integer, primary_key=True, autoincrement=True)
    buku_id = Column(Integer, ForeignKey('buku.id'), nullable=False)

    buku = relationship('Buku', back_populates='favorit')

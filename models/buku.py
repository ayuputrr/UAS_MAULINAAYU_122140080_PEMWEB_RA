# models/buku.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .meta import Base

class Buku(Base):
    __tablename__ = 'buku'

    id = Column(Integer, primary_key=True)
    nama_buku = Column(String(255), nullable=False)
    nama_penulis = Column(String(255), nullable=False)
    cover = Column(String(255), nullable=True)
    kategori = Column(String(100), nullable=True)

    # Relasi ke peminjaman
    peminjaman = relationship('Peminjaman', back_populates='buku', cascade='all, delete-orphan')

    # Relasi ke favorit
    favorit = relationship('Favorit', back_populates='buku', cascade='all, delete-orphan')

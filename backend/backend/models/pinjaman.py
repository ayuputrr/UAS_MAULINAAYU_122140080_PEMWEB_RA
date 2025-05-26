from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Peminjaman(Base):
    __tablename__ = 'peminjaman'
    id = Column(Integer, primary_key=True)
    buku_id = Column(Integer, ForeignKey('buku.id'), nullable=False)
    jumlah = Column(Integer, default=1)  # <--- Tambahkan ini
    returned = Column(Boolean, default=False)

    buku = relationship('Buku', back_populates='peminjaman')

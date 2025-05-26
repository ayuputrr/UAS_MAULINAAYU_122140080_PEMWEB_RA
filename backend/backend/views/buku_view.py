from pyramid.view import view_config
from ..models import Buku
from pyramid.response import Response
import json

@view_config(route_name='buku_list', renderer='json', request_method='GET')
def buku_list(request):
    session = request.dbsession
    books = session.query(Buku).all()
    return {
        'buku': [
            {
                'id': book.id,
                'nama_buku': book.nama_buku,
                'nama_penulis': book.nama_penulis,
                'cover': book.cover,
                'kategori': book.kategori
            } for book in books
        ]
    }

@view_config(route_name='buku_create', renderer='json', request_method='POST')
def buku_create(request):
    session = request.dbsession
    data = request.json_body
    buku = Buku(
        nama_buku=data.get('nama_buku'),
        nama_penulis=data.get('nama_penulis'),
        cover=data.get('cover'),
        kategori=data.get('kategori')
    )
    session.add(buku)
    session.flush()  # agar ID tersedia jika diperlukan
    return {'status': 'success', 'message': 'Buku berhasil ditambahkan', 'id': buku.id}

@view_config(route_name='buku_update', renderer='json', request_method='PUT')
def buku_update(request):
    session = request.dbsession
    buku_id = request.matchdict.get('id')

    # Gunakan filter_by + first() agar kompatibel di berbagai versi SQLAlchemy
    buku = session.query(Buku).filter_by(id=buku_id).first()
    if buku:
        data = request.json_body
        buku.nama_buku = data.get('nama_buku', buku.nama_buku)
        buku.nama_penulis = data.get('nama_penulis', buku.nama_penulis)
        buku.cover = data.get('cover', buku.cover)
        buku.kategori = data.get('kategori', buku.kategori)
        session.flush()
        return {'status': 'success', 'message': 'Buku berhasil diperbarui'}
    else:
        request.response.status = 404
        return {'status': 'error', 'message': 'Buku tidak ditemukan'}

@view_config(route_name='buku_delete', renderer='json', request_method='DELETE')
def buku_delete(request):
    session = request.dbsession
    buku_id = request.matchdict.get('id')

    buku = session.query(Buku).filter_by(id=buku_id).first()
    if buku:
        session.delete(buku)
        session.flush()
        return {'status': 'success', 'message': 'Buku berhasil dihapus'}
    else:
        request.response.status = 404
        return {'status': 'error', 'message': 'Buku tidak ditemukan'}

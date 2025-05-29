# views/favorit_view.py
from pyramid.view import view_config
from ..models import Favorit, Buku

@view_config(route_name='favorit_list', renderer='json', request_method='GET')
def favorit_list(request):
    session = request.dbsession
    favorit_data = session.query(Favorit).all()
    return {
        'favorit': [
            {
                'id': f.id,
                'buku_id': f.buku_id,
                'nama_buku': f.buku.nama_buku,
                'nama_penulis': f.buku.nama_penulis,
                'cover': f.buku.cover,
                'kategori': f.buku.kategori
            } for f in favorit_data
        ]
    }

@view_config(route_name='favorit_create', renderer='json', request_method='POST')
def favorit_create(request):
    session = request.dbsession
    data = request.json_body
    buku_id = data.get('buku_id')

    buku = session.query(Buku).filter_by(id=buku_id).first()
    if not buku:
        request.response.status = 404
        return {'status': 'error', 'message': 'Buku tidak ditemukan'}

    favorit = Favorit(buku_id=buku_id)
    session.add(favorit)
    session.flush()
    return {
        'status': 'success',
        'message': 'Buku berhasil ditambahkan ke favorit',
        'favorit': {
            'id': favorit.id,
            'buku_id': buku.id,
            'nama_buku': buku.nama_buku,
            'nama_penulis': buku.nama_penulis,
            'cover': buku.cover,
            'kategori': buku.kategori
        }
    }

@view_config(route_name='favorit_update', renderer='json', request_method='PUT')
def favorit_update(request):
    session = request.dbsession
    favorit_id = request.matchdict.get('id')
    favorit = session.query(Favorit).filter_by(id=favorit_id).first()
    if not favorit:
        request.response.status = 404
        return {'status': 'error', 'message': 'Favorit tidak ditemukan'}

    data = request.json_body
    buku_id = data.get('buku_id')
    if buku_id:
        buku = session.query(Buku).filter_by(id=buku_id).first()
        if not buku:
            request.response.status = 404
            return {'status': 'error', 'message': 'Buku tidak ditemukan'}
        favorit.buku_id = buku_id

    session.flush()
    buku = favorit.buku
    return {
        'status': 'success',
        'message': 'Favorit berhasil diperbarui',
        'favorit': {
            'id': favorit.id,
            'buku_id': buku.id,
            'nama_buku': buku.nama_buku,
            'nama_penulis': buku.nama_penulis,
            'cover': buku.cover,
            'kategori': buku.kategori
        }
    }

@view_config(route_name='favorit_delete', renderer='json', request_method='DELETE')
def favorit_delete(request):
    session = request.dbsession
    favorit_id = request.matchdict.get('id')
    favorit = session.query(Favorit).filter_by(id=favorit_id).first()
    if favorit:
        buku = favorit.buku
        session.delete(favorit)
        session.flush()
        return {
            'status': 'success',
            'message': 'Favorit berhasil dihapus',
            'favorit': {
                'id': buku.id,
                'nama_buku': buku.nama_buku,
                'nama_penulis': buku.nama_penulis,
                'cover': buku.cover,
                'kategori': buku.kategori
            }
        }
    else:
        request.response.status = 404
        return {'status': 'error', 'message': 'Favorit tidak ditemukan'}

from pyramid.view import view_config
from ..models import Peminjaman, Buku

@view_config(route_name='peminjaman_list', renderer='json', request_method='GET')
def peminjaman_list(request):
    session = request.dbsession
    data = session.query(Peminjaman).all()
    return {
        'peminjaman': [
            {
                'id': p.id,
                'buku_id': p.buku_id,
                'nama_buku': p.buku.nama_buku,
                'nama_penulis': p.buku.nama_penulis,
                'cover': p.buku.cover,
                'kategori': p.buku.kategori,
                'jumlah': p.jumlah,
                'returned': p.returned
            } for p in data
        ]
    }

@view_config(route_name='peminjaman_create', renderer='json', request_method='POST')
def peminjaman_create(request):
    session = request.dbsession
    data = request.json_body
    buku_id = data.get('buku_id')
    jumlah = data.get('jumlah', 1)

    buku = session.query(Buku).filter_by(id=buku_id).first()
    if not buku:
        request.response.status = 404
        return {'status': 'error', 'message': 'Buku tidak ditemukan'}

    peminjaman = Peminjaman(buku_id=buku_id, jumlah=jumlah, returned=False)
    session.add(peminjaman)
    session.flush()
    return {
        'status': 'success',
        'message': 'Peminjaman berhasil ditambahkan',
        'peminjaman': {
            'id': peminjaman.id,
            'buku_id': buku.id,
            'nama_buku': buku.nama_buku,
            'nama_penulis': buku.nama_penulis,
            'cover': buku.cover,
            'kategori': buku.kategori,
            'jumlah': peminjaman.jumlah,
            'returned': peminjaman.returned
        }
    }

@view_config(route_name='peminjaman_update', renderer='json', request_method='PUT')
def peminjaman_update(request):
    session = request.dbsession
    peminjaman_id = request.matchdict.get('id')
    peminjaman = session.query(Peminjaman).filter_by(id=peminjaman_id).first()
    if not peminjaman:
        request.response.status = 404
        return {'status': 'error', 'message': 'Peminjaman tidak ditemukan'}

    data = request.json_body

    # Update status returned jika ada
    if 'returned' in data:
        peminjaman.returned = bool(data['returned'])

    # Update jumlah jika ada
    if 'jumlah' in data:
        peminjaman.jumlah = int(data['jumlah'])

    # Update properti buku terkait jika ada
    buku = peminjaman.buku
    if 'nama_buku' in data:
        buku.nama_buku = data['nama_buku']
    if 'nama_penulis' in data:
        buku.nama_penulis = data['nama_penulis']
    if 'kategori' in data:
        buku.kategori = data['kategori']
    if 'cover' in data:
        buku.cover = data['cover']

    session.flush()

    return {
        'status': 'success',
        'message': 'Data peminjaman dan buku diperbarui',
        'peminjaman': {
            'id': peminjaman.id,
            'buku_id': buku.id,
            'nama_buku': buku.nama_buku,
            'nama_penulis': buku.nama_penulis,
            'cover': buku.cover,
            'kategori': buku.kategori,
            'jumlah': peminjaman.jumlah,
            'returned': peminjaman.returned
        }
    }

@view_config(route_name='peminjaman_delete', renderer='json', request_method='DELETE')
def peminjaman_delete(request):
    session = request.dbsession
    peminjaman_id = request.matchdict.get('id')
    peminjaman = session.query(Peminjaman).filter_by(id=peminjaman_id).first()
    if peminjaman:
        session.delete(peminjaman)
        session.flush()
        return {'status': 'success', 'message': 'Peminjaman berhasil dihapus'}
    else:
        request.response.status = 404
        return {'status': 'error', 'message': 'Peminjaman tidak ditemukan'}

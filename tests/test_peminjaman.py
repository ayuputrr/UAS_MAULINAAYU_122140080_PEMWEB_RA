import pytest
from backend.models import Peminjaman, Buku

def test_peminjaman_create_success(testapp, dbsession):
    buku = Buku(nama_buku="Pinjam Buku", nama_penulis="Penulis")
    dbsession.add(buku)
    dbsession.flush()
    payload = {"buku_id": buku.id, "jumlah": 2}
    res = testapp.post_json('/api/peminjaman/create', payload, status=200)
    assert res.json['status'] == 'success'
    assert res.json['peminjaman']['jumlah'] == 2

def test_peminjaman_create_buku_not_found(testapp):
    payload = {"buku_id": 9999, "jumlah": 1}
    res = testapp.post_json('/api/peminjaman/create', payload, status=404)
    assert res.json['status'] == 'error'

def test_peminjaman_list(testapp, dbsession):
    buku = Buku(nama_buku="List Buku Pinjam", nama_penulis="Penulis")
    peminjaman = Peminjaman(buku=buku, jumlah=1, returned=False)
    dbsession.add_all([buku, peminjaman])
    dbsession.flush()
    res = testapp.get('/api/peminjaman', status=200)
    assert any(p['nama_buku'] == "List Buku Pinjam" for p in res.json['peminjaman'])

def test_peminjaman_update_success(testapp, dbsession):
    buku = Buku(nama_buku="Buku Update", nama_penulis="Penulis")
    peminjaman = Peminjaman(buku=buku, jumlah=1, returned=False)
    dbsession.add_all([buku, peminjaman])
    dbsession.flush()
    payload = {
        "returned": True,
        "jumlah": 3,
        "nama_buku": "Buku Baru",
        "nama_penulis": "Penulis Baru",
        "kategori": "Kategori Baru",
        "cover": "cover.jpg"
    }
    res = testapp.put_json(f'/api/peminjaman/update/{peminjaman.id}', payload, status=200)
    assert res.json['status'] == 'success'
    assert res.json['peminjaman']['returned'] is True
    assert res.json['peminjaman']['jumlah'] == 3
    assert res.json['peminjaman']['nama_buku'] == "Buku Baru"

def test_peminjaman_update_not_found(testapp):
    payload = {"returned": True}
    res = testapp.put_json('/api/peminjaman/update/9999', payload, status=404)
    assert res.json['status'] == 'error'

def test_peminjaman_delete_success(testapp, dbsession):
    buku = Buku(nama_buku="To Delete", nama_penulis="Penulis")
    peminjaman = Peminjaman(buku=buku, jumlah=1, returned=False)
    dbsession.add_all([buku, peminjaman])
    dbsession.flush()
    res = testapp.delete(f'/api/peminjaman/delete/{peminjaman.id}', status=200)
    assert res.json['status'] == 'success'

def test_peminjaman_delete_not_found(testapp):
    res = testapp.delete('/api/peminjaman/delete/9999', status=404)
    assert res.json['status'] == 'error'

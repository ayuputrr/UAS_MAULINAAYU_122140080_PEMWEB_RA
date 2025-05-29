import pytest
from backend.models import Buku

def test_buku_create_success(testapp):
    payload = {
        "nama_buku": "Buku Test",
        "nama_penulis": "Penulis Test",
        "cover": "cover.jpg",
        "kategori": "Fiksi"
    }
    res = testapp.post_json('/buku/create', payload, status=200)
    assert res.json['status'] == 'success'
    assert 'id' in res.json

def test_buku_list(testapp, dbsession):
    buku = Buku(nama_buku="List Buku", nama_penulis="Author")
    dbsession.add(buku)
    dbsession.flush()
    res = testapp.get('/buku', status=200)
    assert any(b['nama_buku'] == "List Buku" for b in res.json['buku'])

def test_buku_update_success(testapp, dbsession):
    buku = Buku(nama_buku="Old Title", nama_penulis="Author")
    dbsession.add(buku)
    dbsession.flush()
    payload = {"nama_buku": "New Title"}
    res = testapp.put_json(f'/buku/update/{buku.id}', payload, status=200)
    assert res.json['status'] == 'success'

def test_buku_update_not_found(testapp):
    payload = {"nama_buku": "New Title"}
    res = testapp.put_json('/buku/update/9999', payload, status=404)
    assert res.json['status'] == 'error'

def test_buku_delete_success(testapp, dbsession):
    buku = Buku(nama_buku="Delete Me", nama_penulis="Author")
    dbsession.add(buku)
    dbsession.flush()
    res = testapp.delete(f'/buku/delete/{buku.id}', status=200)
    assert res.json['status'] == 'success'

def test_buku_delete_not_found(testapp):
    res = testapp.delete('/buku/delete/9999', status=404)
    assert res.json['status'] == 'error'

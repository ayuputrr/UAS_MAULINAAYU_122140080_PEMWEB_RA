import pytest
from backend.models import Favorit, Buku

def test_favorit_create_success(testapp, dbsession):
    buku = Buku(nama_buku="Favorit Buku", nama_penulis="Penulis")
    dbsession.add(buku)
    dbsession.flush()
    payload = {"buku_id": buku.id}
    res = testapp.post_json('/favorit/create', payload, status=200)
    assert res.json['status'] == 'success'
    assert res.json['favorit']['buku_id'] == buku.id

def test_favorit_create_buku_not_found(testapp):
    payload = {"buku_id": 9999}
    res = testapp.post_json('/favorit/create', payload, status=404)
    assert res.json['status'] == 'error'

def test_favorit_list(testapp, dbsession):
    buku = Buku(nama_buku="Favorit List Buku", nama_penulis="Penulis")
    favorit = Favorit(buku=buku)
    dbsession.add_all([buku, favorit])
    dbsession.flush()
    res = testapp.get('/favorit', status=200)
    assert any(f['nama_buku'] == "Favorit List Buku" for f in res.json['favorit'])

def test_favorit_update_success(testapp, dbsession):
    buku1 = Buku(nama_buku="Buku1", nama_penulis="Penulis1")
    buku2 = Buku(nama_buku="Buku2", nama_penulis="Penulis2")
    favorit = Favorit(buku=buku1)
    dbsession.add_all([buku1, buku2, favorit])
    dbsession.flush()
    payload = {"buku_id": buku2.id}
    res = testapp.put_json(f'/favorit/update/{favorit.id}', payload, status=200)
    assert res.json['status'] == 'success'
    assert res.json['favorit']['buku_id'] == buku2.id

def test_favorit_update_not_found(testapp):
    payload = {"buku_id": 1}
    res = testapp.put_json('/favorit/update/9999', payload, status=404)
    assert res.json['status'] == 'error'

def test_favorit_delete_success(testapp, dbsession):
    buku = Buku(nama_buku="Delete Favorit", nama_penulis="Penulis")
    favorit = Favorit(buku=buku)
    dbsession.add_all([buku, favorit])
    dbsession.flush()
    res = testapp.delete(f'/favorit/delete/{favorit.id}', status=200)
    assert res.json['status'] == 'success'

def test_favorit_delete_not_found(testapp):
    res = testapp.delete('/favorit/delete/9999', status=404)
    assert res.json['status'] == 'error'

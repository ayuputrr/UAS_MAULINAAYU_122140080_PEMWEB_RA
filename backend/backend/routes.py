def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # Route untuk Buku
    config.add_route('buku_list', '/buku')
    config.add_route('buku_create', '/buku/create')
    config.add_route('buku_update', '/buku/update/{id}')
    config.add_route('buku_delete', '/buku/delete/{id}')
    
    # Route untuk Favorit
    config.add_route('favorit_list', '/favorit')
    config.add_route('favorit_create', '/favorit/create')
    config.add_route('favorit_update', '/favorit/update/{id}')
    config.add_route('favorit_delete', '/favorit/delete/{id}')
    
    # Route untuk Login dan Register
    config.add_route('login', '/api/login')
    config.add_route('register', '/api/register')

    # Route untuk Peminjaman
    config.add_route('peminjaman_list', '/api/peminjaman')
    config.add_route('peminjaman_create', '/api/peminjaman/create')
    config.add_route('peminjaman_update', '/api/peminjaman/update/{id}')
    config.add_route('peminjaman_delete', '/api/peminjaman/delete/{id}')

    # Route untuk Get User by ID
    config.add_route('get_user', '/api/users/{id}')

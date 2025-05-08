export default function HeaderUser({ name }) {
    return (
      <div className="bg-blue-700 p-4 rounded-b-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Hi, {name} 👋</h2>
            <p className="text-sm">Target bacaanmu bulan ini 3 buku selesai</p>
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="rounded-full w-10 h-10 border-2 border-white"
          />
        </div>
      </div>
    );
  }
  
'use client';

import { useState } from 'react';

const initialProducts = [
  { id: 'FL-001', category: 'florist', name: 'Moyo Rose Hand Bouquet', price: 150000, desc: 'Buket bunga mawar segar dipadu dedaunan estetik.', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500' },
  { id: 'ST-001', category: 'studio', name: 'Paket Foto Graduation', price: 350000, desc: 'Sesi foto indoor 30 menit, cetak 10R + frame, file HD.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500' },
  { id: 'SE-001', category: 'seserahan', name: 'Sewa & Hias Box Akrilik', price: 75000, desc: 'Sewa baki akrilik bening tebal hias bunga premium.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500' },
  { id: 'BD-001', category: 'board', name: 'Karangan Bunga Papan Standard', price: 300000, desc: 'Papan ucapan selamat/duka cita ukuran 1.2m x 2m.', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500' }
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState('0');
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const ongkir = parseInt(selectedArea) || 0;
  const total = subtotal + ongkir;

  const handleCheckout = () => {
    if (cart.length === 0) return alert('Keranjang belanja masih kosong!');
    if (selectedArea === '0') return alert('Silakan pilih wilayah pengiriman terlebih dahulu!');

    let msg = `Halo *AWINA Group*, saya mau pesan produk:\n\n`;
    cart.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}* (${item.qty}x) = Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n`;
    });
    msg += `\n📍 *Lokasi:* Sumbawa / KSB`;
    msg += `\n📝 *Catatan:* ${notes || 'Tidak ada'}`;
    msg += `\n💰 *Subtotal:* Rp ${subtotal.toLocaleString('id-ID')}`;
    msg += `\n🚚 *Ongkir:* Rp ${ongkir.toLocaleString('id-ID')}`;
    msg += `\n🔥 *TOTAL:* *Rp ${total.toLocaleString('id-ID')}*`;

    window.open(`https://wa.me/6281916801907?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredProducts = activeTab === 'all' 
    ? initialProducts 
    : initialProducts.filter(p => p.category === activeTab);

  return (
    <main className="bg-[#0A0A0A] text-gray-100 min-h-screen font-sans selection:bg-[#D91A2A] selection:text-white">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#D91A2A]/40 flex items-center justify-center bg-black">
              <span className="text-[#D91A2A] font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold tracking-widest text-white uppercase">
              AWINA <span className="text-[#D91A2A]">Group</span>
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-[#D91A2A] hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-[#D91A2A]/20">
            🛒 Keranjang <span className="bg-white text-[#0A0A0A] px-2 py-0.5 rounded-full text-xs font-bold">{cart.reduce((s, i) => s + i.qty, 0)}</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D91A2A]/10 border border-[#D91A2A]/30 text-[#D91A2A] text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D91A2A] animate-pulse"></span> Sumbawa & Sumbawa Barat
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Momen Berharga Anda, <span className="text-[#D91A2A]">Mahakarya</span> Kami.
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Layanan premium floral, studio foto, seserahan, & karangan bunga terpercaya yang melayani seluruh wilayah Kabupaten Sumbawa & Sumbawa Barat sejak 2016.
          </p>
        </div>
      </section>

      {/* KATALOG SECTION */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-t border-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">Katalog Pilihan</h2>
          <div className="flex flex-wrap gap-2 bg-[#141414] p-1.5 rounded-xl border border-gray-800">
            {['all', 'florist', 'studio', 'seserahan', 'board'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition ${
                  activeTab === tab ? 'bg-[#D91A2A] text-white' : 'text-gray-400 hover:text-white'
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#D91A2A]/50 transition flex flex-col justify-between">
              <div className="h-48 relative bg-gray-900">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-base mb-1">{p.name}</h3>
                  <p className="text-gray-400 text-xs mb-4">{p.desc}</p>
                </div>
                <div>
                  <p className="text-[#D91A2A] font-bold text-base mb-3">Rp {p.price.toLocaleString('id-ID')}</p>
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full bg-[#1F1F1F] hover:bg-[#D91A2A] text-white border border-gray-700 py-2.5 rounded-xl text-xs font-semibold transition">
                    + Tambah Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-[#141414] w-full max-w-md h-full p-6 flex flex-col justify-between border-l border-gray-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">🛒 Keranjang Belanja</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
              </div>

              <div className="py-4 space-y-3 max-h-[40vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-6 text-sm">Keranjang Anda masih kosong.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-[#1F1F1F] p-3 rounded-xl">
                      <div>
                        <p className="text-white text-sm font-semibold">{item.name}</p>
                        <p className="text-[#D91A2A] text-xs font-bold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 bg-gray-800 text-white rounded font-bold text-xs">-</button>
                        <span className="text-white text-xs">{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 bg-gray-800 text-white rounded font-bold text-xs">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Wilayah Tujuan</label>
                <select 
                  value={selectedArea} 
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-gray-700 text-white text-sm rounded-lg p-2.5 outline-none">
                  <option value="0">Pilih Area...</option>
                  <option value="25000">Kota Sumbawa Besar (+Rp 25.000)</option>
                  <option value="50000">Taliwang / KSB (+Rp 50.000)</option>
                  <option value="75000">Maluk / Sekongkang (+Rp 75.000)</option>
                </select>
              </div>

              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Catatan/Ucapan tambahan..." 
                className="w-full bg-[#1F1F1F] border border-gray-700 text-white text-sm rounded-lg p-2.5 outline-none" rows="2" />

              <div className="space-y-1 text-sm border-t border-gray-800 pt-3">
                <div className="flex justify-between text-gray-400"><span>Subtotal:</span><span>Rp {subtotal.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between text-gray-400"><span>Ongkir:</span><span>Rp {ongkir.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-gray-800">
                  <span>Total:</span><span className="text-[#D91A2A]">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[#D91A2A] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition">
                Pesan via WhatsApp 💬
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

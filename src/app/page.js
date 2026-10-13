'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialProducts = [
  { id: 'FL-001', category: 'florist', name: 'Moyo Rose Hand Bouquet', price: 150000, desc: 'Buket bunga mawar segar dipadu dedaunan estetik.', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500' },
  { id: 'ST-001', category: 'studio', name: 'Paket Foto Graduation', price: 350000, desc: 'Sesi foto indoor 30 menit, cetak 10R + frame, file HD.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500' },
  { id: 'SE-001', category: 'seserahan', name: 'Sewa & Hias Box Akrilik', price: 75000, desc: 'Sewa baki akrilik bening tebal hias bunga premium.', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500' },
  { id: 'BD-001', category: 'board', name: 'Karangan Bunga Papan Standard', price: 300000, desc: 'Papan ucapan selamat/duka cita ukuran 1.2m x 2m.', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500' }
];

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  show: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] } }
};

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
    <main className="bg-[#0A0A0A] text-gray-100 min-h-screen font-sans selection:bg-[#D91A2A] selection:text-white scroll-smooth overflow-x-hidden">
      
      {/* 1. HEADER & NAVBAR (DENGAN LOGO GAMBAR BARU) */}
      <header className="fixed top-0 w-full z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D91A2A]/40 overflow-hidden bg-black flex items-center justify-center">
              <img 
                src="/logo.jpg" 
                alt="AWINA Group Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-xl font-bold tracking-widest text-white uppercase">
              AWINA <span className="text-[#D91A2A]">Group</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#home" className="hover:text-[#D91A2A] transition">Home</a>
            <a href="#about" className="hover:text-[#D91A2A] transition">About</a>
            <a href="#services" className="hover:text-[#D91A2A] transition">Services</a>
            <a href="#catalog" className="hover:text-[#D91A2A] transition">Catalog</a>
            <a href="#contact" className="hover:text-[#D91A2A] transition">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="bg-[#D91A2A] hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-[#D91A2A]/20">
              🛒 Keranjang <span className="bg-white text-[#0A0A0A] px-2 py-0.5 rounded-full text-xs font-bold">{cart.reduce((s, i) => s + i.qty, 0)}</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D91A2A]/10 border border-[#D91A2A]/30 text-[#D91A2A] text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D91A2A] animate-pulse"></span> Sumbawa & Sumbawa Barat
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1 
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                Momen Berharga Anda, <span className="text-[#D91A2A]">Mahakarya</span> Kami.
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed">
              Layanan premium floral, studio foto, seserahan, & karangan bunga terpercaya yang melayani seluruh wilayah Kabupaten Sumbawa & Sumbawa Barat sejak 2016.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#catalog" className="bg-[#D91A2A] hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-lg shadow-[#D91A2A]/25">
                Jelajahi Layanan
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/6281916801907" target="_blank" className="bg-[#141414] hover:bg-[#1F1F1F] text-gray-200 border border-gray-800 px-7 py-3.5 rounded-xl font-semibold transition">
                Hubungi Kami
              </motion.a>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <motion.div variants={clipReveal} initial="hidden" animate="show" className="h-48 rounded-2xl overflow-hidden relative border border-gray-800 group">
                <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">AWINA Florist</span>
              </motion.div>
              <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="h-64 rounded-2xl overflow-hidden relative border border-gray-800 group">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">AWINA Photo Studio</span>
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 0.3 }} className="h-64 rounded-2xl overflow-hidden relative border border-gray-800 group">
                <img src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">AWINA Seserahan</span>
              </motion.div>
              <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 0.4 }} className="h-48 rounded-2xl overflow-hidden relative border border-gray-800 group">
                <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">AWINA Board & Tribute</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="py-20 px-6 bg-[#050505] border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xs font-bold text-[#D91A2A] uppercase tracking-widest mb-3">Tentang AWINA Group</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Dedikasi Seni & Kualitas Terbaik Sejak 2016</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              AWINA Group menghadirkan ekosistem layanan kreatif terlengkap di Sumbawa & Sumbawa Barat. Mulai dari rangkaian bunga mawar segar, foto studio berstandar sinematik, hantaran seserahan akrilik mewah, hingga papan ucapan karangan bunga resmi.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-800">
              <div>
                <p className="text-3xl font-extrabold text-[#D91A2A]">10k+</p>
                <p className="text-gray-400 text-xs mt-1">Klien Puas</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#D91A2A]">24/7</p>
                <p className="text-gray-400 text-xs mt-1">Pengiriman</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#D91A2A]">50+</p>
                <p className="text-gray-400 text-xs mt-1">Mitra Kota</p>
              </div>
            </div>
          </div>
          <div className="bg-[#141414] p-8 rounded-2xl border border-gray-800 text-center relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D91A2A]/10 rounded-full blur-2xl"></div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">Sejak 2016</p>
            <p className="text-white text-2xl font-bold mb-4">Mendampingi Setiap Momen Spesial Masyarakat Sumbawa & KSB</p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Kami percaya setiap perayaan layak mendapatkan sentuhan terbaik. Komitmen kami adalah memberikan hasil karya yang estetik, tepat waktu, dan berkesan.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 4. KARYA & LAYANAN */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto border-t border-gray-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-[#D91A2A] uppercase tracking-widest mb-3">The Craft & Services</h2>
          <p className="text-3xl md:text-4xl font-bold text-white">Karya & Layanan Kami</p>
        </div>

        <motion.div 
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div variants={itemFadeUp} className="bg-[#141414] border border-gray-800 hover:border-[#D91A2A]/50 rounded-2xl p-6 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#D91A2A]/10 flex items-center justify-center text-[#D91A2A] mb-6 text-2xl">💐</div>
            <h3 className="text-xl font-bold text-white mb-2">AWINA Florist</h3>
            <p className="text-gray-400 text-sm mb-6">Buket bunga segar & bunga meja dengan estetika seni tinggi.</p>
            <a href="#catalog" className="text-[#D91A2A] text-sm font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition">Lihat Detail &rarr;</a>
          </motion.div>

          <motion.div variants={itemFadeUp} className="bg-[#141414] border border-gray-800 hover:border-[#D91A2A]/50 rounded-2xl p-6 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#D91A2A]/10 flex items-center justify-center text-[#D91A2A] mb-6 text-2xl">📷</div>
            <h3 className="text-xl font-bold text-white mb-2">AWINA Photo Studio</h3>
            <p className="text-gray-400 text-sm mb-6">Sesi foto personal, prewedding, & keluarga berstandar sinematik.</p>
            <a href="#catalog" className="text-[#D91A2A] text-sm font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition">Lihat Detail &rarr;</a>
          </motion.div>

          <motion.div variants={itemFadeUp} className="bg-[#141414] border border-gray-800 hover:border-[#D91A2A]/50 rounded-2xl p-6 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#D91A2A]/10 flex items-center justify-center text-[#D91A2A] mb-6 text-2xl">🎁</div>
            <h3 className="text-xl font-bold text-white mb-2">AWINA Seserahan</h3>
            <p className="text-gray-400 text-sm mb-6">Hantaran & mahar pernikahan eksklusif hias akrilik.</p>
            <a href="#catalog" className="text-[#D91A2A] text-sm font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition">Lihat Detail &rarr;</a>
          </motion.div>

          <motion.div variants={itemFadeUp} className="bg-[#141414] border border-gray-800 hover:border-[#D91A2A]/50 rounded-2xl p-6 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#D91A2A]/10 flex items-center justify-center text-[#D91A2A] mb-6 text-2xl">🎗️</div>
            <h3 className="text-xl font-bold text-white mb-2">AWINA Board & Tribute</h3>
            <p className="text-gray-400 text-sm mb-6">Karangan bunga & papan ucapan premium untuk segala momen.</p>
            <a href="#catalog" className="text-[#D91A2A] text-sm font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition">Lihat Detail &rarr;</a>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. KATALOG PILIHAN */}
      <section id="catalog" className="py-20 px-6 max-w-7xl mx-auto border-t border-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs font-bold text-[#D91A2A] uppercase tracking-widest mb-2">Belanja Online</h2>
            <p className="text-3xl font-bold text-white">Katalog Produk Pilihan</p>
          </div>
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

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#D91A2A]/50 transition flex flex-col justify-between">
                <div className="h-48 relative bg-gray-900 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold text-base mb-1">{p.name}</h3>
                    <p className="text-gray-400 text-xs mb-4">{p.desc}</p>
                  </div>
                  <div>
                    <p className="text-[#D91A2A] font-bold text-base mb-3">Rp {p.price.toLocaleString('id-ID')}</p>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(p)}
                      className="w-full bg-[#1F1F1F] hover:bg-[#D91A2A] text-white border border-gray-700 py-2.5 rounded-xl text-xs font-semibold transition">
                      + Tambah Keranjang
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 6. FOOTER (DENGAN LOGO GAMBAR BARU) */}
      <footer id="contact" className="bg-black py-12 px-6 border-t border-gray-900 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#D91A2A]/40 overflow-hidden bg-black flex items-center justify-center">
                <img 
                  src="/logo.jpg" 
                  alt="AWINA Group Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-white font-bold text-lg uppercase tracking-wider">AWINA Group</span>
            </div>
            <p className="text-xs text-gray-500">Layanan premium floral, studio foto, seserahan, & karangan bunga se-Sumbawa sejak 2016.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#catalog" className="hover:text-white">Catalog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Kontak & WA</h4>
            <ul className="space-y-2 text-xs">
              <li>📞 081916801907</li>
              <li>📷 @Awina_Group</li>
              <li>📍 Sumbawa Besar & KSB</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Jam Operasional</h4>
            <p className="text-xs">Senin - Minggu: 08.00 - 22.00 WITA</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-900 text-center text-xs text-gray-600">
          © 2026 AWINA Group. All rights reserved.
        </div>
      </footer>

      {/* 7. MODAL CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-[#141414] w-full max-w-md h-full p-6 flex flex-col justify-between border-l border-gray-800">
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

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-[#D91A2A] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition">
                  Pesan via WhatsApp 💬
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

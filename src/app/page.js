'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialProducts = [
  { id: 'FL-001', category: 'florist', name: 'Moyo Rose Hand Bouquet', price: 150000, desc: 'Buket bunga mawar segar dipadu dedaunan estetik.', img: '/florist.jpg' },
  { id: 'ST-001', category: 'studio', name: 'Paket Foto Graduation', price: 350000, desc: 'Sesi foto indoor 30 menit, cetak 10R + frame, file HD.', img: '/studio.jpg' },
  { id: 'SE-001', category: 'seserahan', name: 'Sewa & Hias Box Akrilik', price: 75000, desc: 'Sewa baki akrilik bening tebal hias bunga premium.', img: '/seserahan.jpg' },
  { id: 'BD-001', category: 'board', name: 'Karangan Bunga Papan Standard', price: 300000, desc: 'Papan ucapan selamat/duka cita ukuran 1.2m x 2m.', img: '/board.jpg' }
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
  const [activeNav, setActiveNav] = useState('home');

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

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setActiveNav(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const isOnlyStudioService = cart.length > 0 && cart.every((item) => item.category === 'studio');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const ongkir = isOnlyStudioService ? 0 : parseInt(selectedArea) || 0;
  const total = subtotal + ongkir;

  const handleCheckout = () => {
    if (cart.length === 0) return alert('Keranjang belanja masih kosong!');
    if (!isOnlyStudioService && selectedArea === '0') {
      return alert('Silakan pilih wilayah pengiriman terlebih dahulu!');
    }

    let msg = `Halo *AWINA Group*, saya mau pesan produk:\n\n`;
    cart.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}* (${item.qty}x) = Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n`;
    });

    if (isOnlyStudioService) {
      msg += `\n📍 *Metode:* Sesi Foto di Studio (Bebas Ongkir)`;
    } else {
      msg += `\n📍 *Lokasi:* Kabupaten Sumbawa`;
    }

    msg += `\n📝 *Catatan:* ${notes || 'Tidak ada'}`;
    msg += `\n💰 *Subtotal:* Rp ${subtotal.toLocaleString('id-ID')}`;
    msg += `\n🚚 *Ongkir:* ${isOnlyStudioService ? 'Rp 0 (Sesi Foto Studio)' : `Rp ${ongkir.toLocaleString('id-ID')}`}`;
    msg += `\n🔥 *TOTAL:* *Rp ${total.toLocaleString('id-ID')}*`;

    window.open(`https://wa.me/6281916801901?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredProducts = activeTab === 'all' 
    ? initialProducts 
    : initialProducts.filter(p => p.category === activeTab);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <main className="bg-[#FDFBF7] text-[#1C1917] min-h-screen font-sans selection:bg-[#D91A2A] selection:text-white scroll-smooth overflow-x-hidden">
      
      {/* 1. HEADER & NAVBAR */}
      <header className="fixed top-0 w-full z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E7E2D8] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border border-[#D91A2A]/30 overflow-hidden bg-white flex items-center justify-center shadow-sm">
              <img 
                src="/logo.jpg" 
                alt="AWINA Group Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* BRANDING SIMBOL A FLORAL MEMAKAI LOGO-A.JPG */}
            <span className="text-xl font-extrabold tracking-widest text-[#1C1917] uppercase flex items-center select-none">
              <span className="inline-block h-7 w-8 mr-1">
                <img src="/logo-a.jpg" alt="A Floral" className="w-full h-full object-contain mix-blend-multiply" />
              </span>
              <span>WINA</span>
              <span className="text-[#D91A2A] ml-2">Group</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#44403C]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`relative py-1 transition ${
                  activeNav === link.id ? 'text-[#D91A2A] font-bold' : 'hover:text-[#1C1917]'
                }`}>
                {link.label}
                {activeNav === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D91A2A] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="bg-[#D91A2A] hover:bg-[#B81222] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition flex items-center gap-2 shadow-md shadow-[#D91A2A]/20">
              🛒 Keranjang <span className="bg-white text-[#D91A2A] px-2 py-0.5 rounded-full text-xs font-bold">{cart.reduce((s, i) => s + i.qty, 0)}</span>
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D91A2A]/10 border border-[#D91A2A]/30 text-[#D91A2A] text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D91A2A] animate-pulse"></span> Sumbawa
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1 
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-extrabold text-[#1C1917] leading-tight">
                Momen Berharga Anda, <span className="text-[#D91A2A]">Mahakarya</span> Kami.
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#57534E] text-lg mb-8 leading-relaxed">
              Layanan premium floral, studio foto, seserahan, & karangan bunga terpercaya yang melayani seluruh wilayah Kabupaten Sumbawa sejak 2016.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#catalog" 
                onClick={(e) => scrollToSection(e, 'catalog')}
                className="bg-[#D91A2A] hover:bg-[#B81222] text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-lg shadow-[#D91A2A]/20">
                Jelajahi Layanan
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/6281916801901" target="_blank" className="bg-white hover:bg-[#F5F2EB] text-[#1C1917] border border-[#E7E2D8] px-7 py-3.5 rounded-xl font-semibold transition shadow-sm">
                Hubungi Kami
              </motion.a>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <motion.div variants={clipReveal} initial="hidden" animate="show" className="h-48 rounded-2xl overflow-hidden relative border border-[#E7E2D8] shadow-sm group">
                <img src="/florist.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">AWINA Florist</span>
              </motion.div>

              <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="h-64 rounded-2xl overflow-hidden relative border border-[#E7E2D8] shadow-sm group">
                <img src="/studio.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">AWINA Photo Studio</span>
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 0.3 }} className="h-64 rounded-2xl overflow-hidden relative border border-[#E7E2D8] shadow-sm group">
                <img src="/seserahan.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">AWINA Seserahan</span>
              </motion.div>

              <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 0.4 }} className="h-48 rounded-2xl overflow-hidden relative border border-[#E7E2D8] shadow-sm group">
                <img src="/board.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">AWINA Board & Tribute</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION WITH LUXURY MAP CONTAINER */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="py-20 px-6 bg-[#F5F2EB] border-t border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 relative bg-[#1C1917] p-6 md:p-8 rounded-3xl border border-[#3A3530] overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D91A2A]/15 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-[#D91A2A] uppercase tracking-widest block mb-1">Jangkauan Layanan Lokal</span>
                <h4 className="text-xl font-bold text-white">Peta Layanan Kabupaten Sumbawa</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#D91A2A]/20 border border-[#D91A2A]/40 text-[#FF6B7A] text-[10px] font-bold uppercase tracking-wider">
                Pusat Operasional
              </span>
            </div>

            <div className="relative w-full aspect-[2/1] my-2 flex items-center justify-center bg-[#12100E] rounded-2xl border border-[#2D2825] p-4 overflow-hidden">
              <img 
                src="/map-sumbawa.png" 
                alt="Peta Wilayah Sumbawa"
                className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(217,26,42,0.5)]"
              />

              <div className="absolute top-[48%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#D91A2A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D91A2A] border-2 border-white shadow-lg shadow-[#D91A2A]"></span>
                </div>
                
                <div className="bg-[#1C1917]/95 backdrop-blur-md border border-[#D91A2A]/60 px-3 py-1 rounded-lg shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D91A2A] animate-pulse"></span>
                  <span className="text-xs font-extrabold text-white tracking-wide">Sumbawa Besar</span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-xs text-center mt-3">
              📍 Pusat operasional dan pengiriman cepat untuk seluruh <span className="text-white font-semibold">Kabupaten Sumbawa</span>.
            </p>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-xs font-bold text-[#D91A2A] uppercase tracking-widest mb-3">Jangkauan Layanan & Statistik</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1C1917] mb-6">Dedikasi Seni & Kualitas Terbaik Sejak 2016</h3>
            <p className="text-[#57534E] text-sm mb-8 leading-relaxed">
              AWINA Group menghadirkan ekosistem layanan kreatif terlengkap di Kabupaten Sumbawa. Mulai dari rangkaian bunga mawar segar, foto studio berstandar sinematik, hantaran seserahan akrilik mewah, hingga papan ucapan karangan bunga resmi.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E7E2D8]">
              <div className="bg-white p-4 rounded-xl border border-[#E7E2D8] text-center shadow-sm">
                <p className="text-2xl md:text-3xl font-extrabold text-[#D91A2A]">10k+</p>
                <p className="text-[#78716C] text-[11px] font-medium mt-1">Klien Puas</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E7E2D8] text-center shadow-sm">
                <p className="text-2xl md:text-3xl font-extrabold text-[#D91A2A]">24/7</p>
                <p className="text-[#78716C] text-[11px] font-medium mt-1">Pengiriman</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E7E2D8] text-center shadow-sm">
                <p className="text-2xl md:text-3xl font-extrabold text-[#D91A2A]">2016</p>
                <p className="text-[#78716C] text-[11px] font-medium mt-1">Sejak Berdiri</p>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 4. KARYA & LAYANAN */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E7E2D8]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-[#D91A2A] uppercase tracking-widest mb-3">The Craft & Services</h2>
          <p className="text-3xl md:text-4xl font-bold text-[#1C1917]">Karya & Layanan Kami</p>
        </div>

        <motion.div 
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div variants={itemFadeUp} className="bg-white border border-[#E7E2D8] hover:border-[#D91A2A] rounded-2xl p-6 transition shadow-sm hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#D91A2A]/10 flex items-center justify-center text-[#D91A2A] mb-6 text-2xl">💐</div>
            <h3 className="text-xl font-bold text-[#1C1917] mb-2">AWINA Florist</h3>
            <p className="text-[#78716C] text-sm mb-6">Buket bunga segar & bunga meja dengan estetika seni tinggi.</p>
            <a href="#catalog" onClick={(e) => scrollToSection(e, 'catalog')} className="text-[#D91A2A] text-sm font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition">Lihat Detail &rarr;</a>
          </motion.div>

          <motion.div variants={itemFadeUp} className="bg-white border border-[#E7E2D8] hover:border-[#D91A2A] rounded-2xl p-6 transition shadow-sm hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#D91A2A]/10 flex items-center justify-center text-[#D91A2A] mb-6 text-2xl">📷</div>
            <h3 className="text-xl font-bold text-[#1C1917] mb-2">AWINA Photo Studio</h3>
            <p className="text-[#78716C] text-sm mb-6">Sesi foto personal, prewedding, & keluarga berstandar sinematik.</p>
            <a href="#catalog" onClick={(e) => scrollToSection(e, 'catalog')} className="text-[#D91A2A] text-sm font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition">Lihat Detail &rarr;</a>
          </motion.div>

          <motion.div variants={itemFadeUp} className="bg-white border border-[#E7E2D8] hover:border-[#D91A2A] rounded-2xl p-6 transition shadow-sm hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#D91A2A]/10 flex items-center justify-center text-[#D91A2A] mb-6 text-2xl">🎁</div>
            <h3 className="text-xl font-bold text-[#1C1917] mb-2">AWINA Seserahan</h3>
            <p className="text-[#78716C] text-sm mb-6">Hantaran & mahar pernikahan eksklusif hias akrilik.</p>
            <a href="#catalog" onClick={(e) => scrollToSection(e, 'catalog')} className="text-[#D91A2A] text-sm font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition">Lihat Detail &rarr;</a>
          </motion.div>

          <motion.div variants={itemFadeUp} className="bg-white border border-[#E7E2D8] hover:border-[#D91A2A] rounded-2xl p-6 transition shadow-sm hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#D91A2A]/10 flex items-center justify-center text-[#D91A2A] mb-6 text-2xl">🎗️</div>
            <h3 className="text-xl font-bold text-[#1C1917] mb-2">AWINA Board & Tribute</h3>
            <p className="text-[#78716C] text-sm mb-6">Karangan bunga & papan ucapan premium untuk segala momen.</p>
            <a href="#catalog" onClick={(e) => scrollToSection(e, 'catalog')} className="text-[#D91A2A] text-sm font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition">Lihat Detail &rarr;</a>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. KATALOG PILIHAN */}
      <section id="catalog" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E7E2D8]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs font-bold text-[#D91A2A] uppercase tracking-widest mb-2">Belanja Online</h2>
            <p className="text-3xl font-bold text-[#1C1917]">Katalog Produk Pilihan</p>
          </div>
          <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-xl border border-[#E7E2D8] shadow-sm">
            {['all', 'florist', 'studio', 'seserahan', 'board'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition ${
                  activeTab === tab ? 'bg-[#D91A2A] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'
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
              <div key={p.id} className="bg-white border border-[#E7E2D8] rounded-2xl overflow-hidden hover:border-[#D91A2A] transition shadow-sm hover:shadow-md flex flex-col justify-between">
                <div className="h-48 relative bg-[#F5F2EB] overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[#1C1917] font-bold text-base mb-1">{p.name}</h3>
                    <p className="text-[#78716C] text-xs mb-4">{p.desc}</p>
                  </div>
                  <div>
                    <p className="text-[#D91A2A] font-extrabold text-base mb-3">Rp {p.price.toLocaleString('id-ID')}</p>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(p)}
                      className="w-full bg-[#F5F2EB] hover:bg-[#D91A2A] text-[#1C1917] hover:text-white border border-[#E7E2D8] py-2.5 rounded-xl text-xs font-bold transition">
                      + Tambah Keranjang
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 6. FOOTER */}
      <footer id="contact" className="bg-[#1C1917] py-12 px-6 border-t border-[#2D2825] text-gray-300 text-sm">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#D91A2A]/40 overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src="/logo.jpg" 
                  alt="AWINA Group Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <span className="text-white font-extrabold text-lg uppercase tracking-wider flex items-center select-none">
                <span className="inline-block h-6 w-7 mr-1">
                  <img src="/logo-a.jpg" alt="A Floral" className="w-full h-full object-contain filter brightness-110" />
                </span>
                <span>WINA</span>
                <span className="text-[#D91A2A] ml-2 font-bold">Group</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">Layanan premium floral, studio foto, seserahan, & karangan bunga se-Sumbawa sejak 2016.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition">Home</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition">About</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition">Services</a></li>
              <li><a href="#catalog" onClick={(e) => scrollToSection(e, 'catalog')} className="hover:text-white transition">Catalog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Kontak & Media Sosial</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#25D366" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.18c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.28z"/>
                </svg>
                <a href="https://wa.me/6281916801901" target="_blank" className="hover:text-white transition">081916801901</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-pink-500 shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <a href="https://instagram.com/tokobunga_awina" target="_blank" className="hover:text-white transition">@tokobunga_awina</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-cyan-400 shrink-0" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V9.48a8.16 8.16 0 0 0 4.91 1.62v-3.46a4.85 4.85 0 0 1-1-.95z"/>
                </svg>
                <a href="https://www.tiktok.com/@toko_bunga_awina?_r=1&_t=ZS-9AjcbKUZwyG" target="_blank" className="hover:text-white transition">@toko_bunga_awina</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-blue-500 shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <a href="https://www.facebook.com/share/1CVowNkEa7/" target="_blank" className="hover:text-white transition">AWINA Group Facebook</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Jam Operasional</h4>
            <p className="text-xs text-gray-400">Senin - Minggu: 08.00 - 22.00 WITA</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#2D2825] text-center text-xs text-gray-500">
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-[#FDFBF7] w-full max-w-md h-full p-6 flex flex-col justify-between border-l border-[#E7E2D8] shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D8]">
                  <h3 className="text-xl font-bold text-[#1C1917]">🛒 Keranjang Belanja</h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-[#78716C] hover:text-[#1C1917] text-2xl font-bold">&times;</button>
                </div>

                <div className="py-4 space-y-3 max-h-[40vh] overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-[#78716C] text-center py-6 text-sm">Keranjang Anda masih kosong.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#E7E2D8]">
                        <div>
                          <p className="text-[#1C1917] text-sm font-semibold">{item.name}</p>
                          <p className="text-[#D91A2A] text-xs font-bold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 bg-[#F5F2EB] text-[#1C1917] rounded font-bold text-xs border border-[#E7E2D8]">-</button>
                          <span className="text-[#1C1917] text-xs font-semibold">{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 bg-[#F5F2EB] text-[#1C1917] rounded font-bold text-xs border border-[#E7E2D8]">+</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="border-t border-[#E7E2D8] pt-4 space-y-4">
                
                {isOnlyStudioService ? (
                  <div className="p-3 bg-[#F5F2EB] rounded-xl border border-[#E7E2D8] text-xs text-emerald-700 flex items-center gap-2">
                    <span>📷</span>
                    <span><strong>Sesi Foto Studio:</strong> Tanpa Pengiriman / Bebas Ongkir (Langsung Datang ke Studio).</span>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs text-[#78716C] font-medium mb-1">Wilayah Pengiriman</label>
                    <select 
                      value={selectedArea} 
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full bg-white border border-[#E7E2D8] text-[#1C1917] text-sm rounded-lg p-2.5 outline-none">
                      <option value="0">Pilih Area Pengiriman...</option>
                      <option value="25000">Kota Sumbawa Besar (+Rp 25.000)</option>
                    </select>
                  </div>
                )}

                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan/Ucapan tambahan..." 
                  className="w-full bg-white border border-[#E7E2D8] text-[#1C1917] text-sm rounded-lg p-2.5 outline-none" rows="2" />

                <div className="space-y-1 text-sm border-t border-[#E7E2D8] pt-3">
                  <div className="flex justify-between text-[#78716C]"><span>Subtotal:</span><span>Rp {subtotal.toLocaleString('id-ID')}</span></div>
                  <div className="flex justify-between text-[#78716C]">
                    <span>Ongkir:</span>
                    <span>{isOnlyStudioService ? 'Rp 0' : `Rp ${ongkir.toLocaleString('id-ID')}`}</span>
                  </div>
                  <div className="flex justify-between text-[#1C1917] font-bold text-base pt-2 border-t border-[#E7E2D8]">
                    <span>Total:</span><span className="text-[#D91A2A]">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-[#D91A2A] hover:bg-[#B81222] text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-[#D91A2A]/20">
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

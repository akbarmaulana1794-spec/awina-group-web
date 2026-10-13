import './globals.css';

export const metadata = {
  title: 'AWINA Group - Premium Florist, Studio, Seserahan & Papan Bunga',
  description: 'Layanan premium floral, studio foto, seserahan, & karangan bunga terpercaya di Sumbawa & Sumbawa Barat.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-[#0A0A0A] text-gray-100 antialiased">{children}</body>
    </html>
  );
}

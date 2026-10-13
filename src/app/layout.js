import './globals.css';

export const metadata = {
  title: 'AWINA Group - Premium Florist, Studio, Seserahan & Papan Bunga',
  description: 'Layanan premium floral, studio foto, seserahan, & karangan bunga terpercaya di Sumbawa & Sumbawa Barat.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const sans = Manrope({ variable: '--font-sans', subsets: ['latin'], display: 'swap' });
const serif = Cormorant_Garamond({ variable: '--font-serif', subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Or Cliks | Fotografía y producción audiovisual en Panamá',
  description: 'Fotografía, reels y producción audiovisual en Panamá. Historias reales contadas con intención por Xavier y Emily.',
  icons: { icon: '/recursos_imagenes/marca/isotipo-or-cliks.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}

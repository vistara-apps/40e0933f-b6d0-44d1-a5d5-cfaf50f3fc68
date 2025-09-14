import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VeriLex - AI-Powered Legal Verification',
  description: 'Get AI-generated legal memos verified by top city lawyers',
  openGraph: {
    title: 'VeriLex - AI-Powered Legal Verification',
    description: 'Get AI-generated legal memos verified by top city lawyers',
    type: 'website',
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:name': 'VeriLex',
    'fc:frame:icon': 'https://verilex.app/icon.png',
    'fc:frame:home_url': 'https://verilex.app',
    'fc:frame:splash_image_url': 'https://verilex.app/splash.png',
    'fc:frame:splash_background_color': '#1e40af',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

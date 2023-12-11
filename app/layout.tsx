import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'semantic-ui-css/semantic.min.css';
import Image from 'next/image';
import { AuthProvider } from './auth/AuthContextProvider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Casino Portal',
  description: 'Best on the market',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script src="lib/comeon.game-1.1.min.js" />
      <html lang="en" className="w-[100vh] md:w-auto">
        <body className={`${inter.className} bg-[#444444] m-6`}>
          <nav className="flex justify-center mb-8">
            <Image src={'logo.svg'} width={700} height={135} alt="logo" />
          </nav>
          <div className="bg-white mx-auto px-4 main container">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </body>
      </html>
    </>
  );
}

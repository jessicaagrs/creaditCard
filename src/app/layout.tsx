import type { Metadata } from 'next';
import { Roboto, Poppins } from 'next/font/google';
import './globals.css';
import { CreditCardContextProvider } from '@/context/creditCardContext';
import { Toaster } from 'sonner';
import Head from 'next/head';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  weight: ['400', '500', '700'],
});
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Cartão de Crédito',
  description: 'Acompanhamento de gastos do cartão de crédito',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <Head>
        <link
          rel='icon'
          href='/icon.svg'
        />
      </Head>
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <Toaster />
        <CreditCardContextProvider>{children}</CreditCardContextProvider>
      </body>
    </html>
  );
}

import { CreditCardContextProvider } from '@/context/creditCardContext';
import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

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
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <link
          rel='icon'
          href='/icon.ico'
        />
        <Toaster />
        <CreditCardContextProvider>{children}</CreditCardContextProvider>
      </body>
    </html>
  );
}

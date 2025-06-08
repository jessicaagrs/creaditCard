'use client';
import { Invoice } from '@/components/Invoice';
import { PurchaseInstallment } from '@/components/PurchaseInstallment';
import { SelectionActionUser } from '@/components/SelectionActionUser';
import { Spending } from '@/components/Spending';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabUi } from '@/enum/enums';
import useCreditCardContext from '@/hooks/useCreditCardContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const { tab } = useCreditCardContext();
  const [emoji, setEmoji] = useState('🌅');

  useEffect(() => {
    const todayDate = new Date();
    const currentHour = todayDate?.getHours();
    if (currentHour) {
      if (currentHour < 12) {
        setEmoji('Bom dia 🌅');
      } else if (currentHour < 18) {
        setEmoji('Boa tarde ☀️');
      } else {
        setEmoji('Boa noite 🌙');
      }
    }
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl mb-4 text-center'>
            {tab === TabUi.MAIN && 'Selecione uma ação'}
            {tab === TabUi.INVOICE && 'Fatura do mês'}
            {tab === TabUi.PURCHASES && 'Compras parceladas'}
            {tab === TabUi.SPENDING && 'Limite de uso disponível'}
          </CardTitle>
          <CardDescription className='mb-4 text-xl'>{tab === TabUi.MAIN && emoji}</CardDescription>
        </CardHeader>
        <CardContent>
          {tab === TabUi.MAIN && <SelectionActionUser />}
          {tab === TabUi.SPENDING && <Spending />}
          {tab === TabUi.PURCHASES && <PurchaseInstallment />}
          {tab === TabUi.INVOICE && <Invoice />}
        </CardContent>
      </Card>
    </main>
  );
}

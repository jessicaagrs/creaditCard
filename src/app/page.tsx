'use client';
import { Invoice } from '@/components/Invoice';
import { PurchaseInstallment } from '@/components/PurchaseInstallment';
import { SelectionActionUser } from '@/components/SelectionActionUser';
import { Spending } from '@/components/Spending';
import { TimeWithEmoji } from '@/components/TimeWithEmoji';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabUi } from '@/enum/enums';
import useCreditCardContext from '@/hooks/useCreditCardContext';

export default function Home() {
  const { tab } = useCreditCardContext();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardDescription className='mb-5'>
            <TimeWithEmoji />
          </CardDescription>
          <CardTitle className='text-2xl mb-4 text-center'>
            {tab === TabUi.MAIN && 'Selecione uma ação'}
            {tab === TabUi.INVOICE && 'Fatura do mês'}
            {tab === TabUi.PURCHASES && 'Compras parceladas'}
            {tab === TabUi.SPENDING && 'Limite de uso disponível'}
          </CardTitle>
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

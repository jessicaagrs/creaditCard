import { IInvoiceCurrentMonth } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { formatMoney } from '@/utils/formatter';
import { Spinner } from '../Spinner';
import { Button } from '../ui/button';
import { CardFooter } from '../ui/card';
import { TabUi } from '@/enum/enums';
import useCreditCardContext from '@/hooks/useCreditCardContext';

export const Invoice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IInvoiceCurrentMonth | null>(null);
  const [value, setValue] = useState<number>(0);
  const { setTab } = useCreditCardContext();
  
  const handleClickBack = () => {
    setTab(TabUi.MAIN);
  };

  const fetchInvoiceCurrentMonth = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/invoiceCurrentMonth');

      if (!response.ok) {
        throw new Error('Erro ao obter a fatura do mês atual.');
      }
      setData(await response.json());
    } catch (error: any) {
      toast('Erro', { description: error.message, position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoiceCurrentMonth();
  }, []);

  useEffect(() => {
    if (data) {
      const newValue =
        data.invoice.amountUsedSpendingLimit + data.totalInstallments;
      setValue(newValue);
    }
  }, [data]);

  return (
    <form className='flex flex-col gap-4'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Label>Valor a pagar</Label>
          <Input
            value={formatMoney(value)}
            readOnly
            className='bg-gray-100 text-gray-800 h-12 font-bold text-2xl'
          />
        </>
      )}
      <CardFooter className='flex justify-end p-4'>
        <Button
          className='bg-(--selective-yellow) text-foreground hover:bg-(--ut-orange) hover:text-background cursor-pointer'
          onClick={handleClickBack}
        >
          Voltar
        </Button>
      </CardFooter>
    </form>
  );
};

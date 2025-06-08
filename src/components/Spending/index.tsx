'use client';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import useCreditCardContext from '@/hooks/useCreditCardContext';
import { TabUi } from '@/enum/enums';
import { IInvoice } from '@/types';
import { Spinner } from '../Spinner';
import { formatCurrency } from '@/utils/formatter';

export const Spending = () => {
  const [value, setValue] = useState('');
  const [invoice, setInvoice] = useState<IInvoice | null>(null);
  const { setTab } = useCreditCardContext();
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isLoadingGet, setIsLoadingGet] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setValue(formatted);
  };

  const fetchInvoice = async () => {
    try {
      setIsLoadingGet(true);
      const response = await fetch('/api/invoice');

      if (!response.ok) {
        throw new Error(
          'Erro ao obter os dados do valor disponível para uso. Atualize o limite disponível que consta no app do banco e tente novamente.'
        );
      }
      setInvoice(await response.json());
    } catch (error: any) {
      toast('Erro', { description: error.message, position: 'top-center' });
    } finally {
      setIsLoadingGet(false);
    }
  };

  const handleClickSendAvailable = async () => {
    try {
      setIsLoadingPost(true);
      const responseCreate = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          availableLimit: value
            ? Number(value.replace(/\./g, '').replace(',', '.'))
            : 0,
        }),
      });

      if (!responseCreate.ok) {
        throw new Error(
          'Houve um erro, por favor informe o limite disponível no app do banco.'
        );
      }
      setValue('');
      fetchInvoice();
    } catch (error: any) {
      toast('Erro', { description: error.message, position: 'top-center' });
    } finally {
      setIsLoadingPost(false);
    }
  };

  const handleClickBack = () => {
    setTab(TabUi.MAIN);
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  return (
    <section className='flex flex-col gap-8 p-4 bg-background rounded-lg shadow-md'>
      <div className='flex flex-col sm:flex-row gap-3'>
        <Input
          type='text'
          placeholder='Atualize o limite disponível'
          value={value}
          onChange={handleChange}
        />
        <Button
          className='bg-(--selective-yellow) text-foreground hover:bg-(--ut-orange) hover:text-background cursor-pointer'
          onClick={handleClickSendAvailable}
        >
          {isLoadingPost ? <Spinner /> : 'Enviar'}
        </Button>
      </div>

      <div className='flex flex-col gap-6'>
        {isLoadingGet ? (
          <Spinner />
        ) : (
          <>
            <Label>Valor disponível para uso:</Label>
            <Input
              className='font-bold text-xl text-right h-12'
              type='text'
              disabled
              value={
                invoice
                  ? invoice.valueAvailableUse.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 'R$ 0,00'
              }
            />
          </>
        )}
      </div>

      <CardFooter className='flex justify-end p-4'>
        <Button
          className='bg-(--selective-yellow) text-foreground hover:bg-(--ut-orange) hover:text-background cursor-pointer'
          onClick={handleClickBack}
        >
          Voltar
        </Button>
      </CardFooter>
    </section>
  );
};

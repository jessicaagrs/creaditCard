import { TabUi } from '@/enum/enums';
import useCreditCardContext from '@/hooks/useCreditCardContext';
import { formatCurrency } from '@/utils/formatter';
import { useState } from 'react';
import { toast } from 'sonner';
import { ModalPurchasesInstalments } from '../ModalPurchases';
import { Spinner } from '../Spinner';
import { Button } from '../ui/button';
import { CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const PurchaseInstallment = () => {
  const { setTab } = useCreditCardContext();
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [installments, setInstallments] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickBack = () => {
    setTab(TabUi.MAIN);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value);
    setValue(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || !value || !installments) {
      toast.error('Preencha todos os campos corretamente.', {
        position: 'top-center',
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/purchaseInstallment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          value: Number(value.replace(/\./g, '').replace(',', '.')),
          installments,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar compra. Tente novamente.');
      }

      setDescription('');
      setValue('');
      setInstallments(1);
    } catch (error) {
      toast.error((error as Error).message, {
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className='flex flex-col gap-6'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-2'>
          <Label htmlFor='description'>Descrição da compra</Label>
          <Input
            id='description'
            placeholder='ex: botas magazine'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='value'>Valor da compra</Label>
          <Input
            id='value'
            placeholder='ex: 100,00'
            value={value}
            onChange={handleChangeValue}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='installments'>Número de parcelas</Label>
          <Input
            id='installments'
            placeholder='ex: 3'
            type='number'
            value={installments}
            onChange={e => setInstallments(Number(e.target.value))}
            min={1}
            max={12}
          />
        </div>

        <CardFooter className='flex justify-between p-2'>
          <Button
            className='bg-(--selective-yellow) text-foreground hover:bg-(--ut-orange) hover:text-background cursor-pointer'
            onClick={handleClickBack}
          >
            Voltar
          </Button>
          <Button
            className='bg-(--selective-yellow) text-foreground hover:bg-(--ut-orange) hover:text-background cursor-pointer'
            type='submit'
          >
            {isLoading ? (
              <Spinner className='bg-foreground' />
            ) : (
              'Adicionar compra'
            )}
          </Button>
        </CardFooter>
      </form>
      <div>
        <ModalPurchasesInstalments>
          <Button className='bg-transparent text-foreground underline hover:bg-transparent hover:font-bold cursor-pointer text-sm shadow-none'>
            Ver compras efetuadas no mês corrente
          </Button>
        </ModalPurchasesInstalments>
      </div>
    </>
  );
};

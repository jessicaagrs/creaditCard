'use client';
import useCreditCardContext from '@/hooks/useCreditCardContext';
import { Button } from '../ui/button';
import { CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { TabUi } from '@/enum/enums';

export const SelectionActionUser = () => {
  const { setTab } = useCreditCardContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedOption = formData.get('action');
    setTab(selectedOption as TabUi);
  };

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        defaultValue={TabUi.SPENDING}
        className='mb-8'
        name='action'
      >
        <div className='flex items-center gap-3'>
          <RadioGroupItem
            value={TabUi.SPENDING}
            id='r1'
            className='w-6 h-6 border-(--selective-yellow) border-4'
          />
          <Label
            htmlFor='r1'
            className='text-lg'
          >
            Ver quanto posso gastar
          </Label>
        </div>
        <div className='flex items-center gap-3'>
          <RadioGroupItem
            value={TabUi.PURCHASES}
            id='r2'
            className='w-6 h-6 border-(--selective-yellow) border-4'
          />
          <Label
            htmlFor='r2'
            className='text-lg'
          >
            Adicionar compra parcelada
          </Label>
        </div>
        <div className='flex items-center gap-3'>
          <RadioGroupItem
            value={TabUi.INVOICE}
            id='r3'
            className='w-6 h-6 border-(--selective-yellow) border-4'
          />
          <Label
            htmlFor='r3'
            className='text-lg'
          >
            Ver valor fatura do mês
          </Label>
        </div>
      </RadioGroup>
      <CardFooter className='flex justify-end'>
        <Button className='bg-(--selective-yellow) text-foreground hover:bg-(--ut-orange) hover:text-background cursor-pointer'>
          Próximo
        </Button>
      </CardFooter>
    </form>
  );
};

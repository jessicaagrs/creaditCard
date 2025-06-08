import { IPurchaseInstallment } from '@/types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DialogFooter, DialogHeader } from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Spinner } from '../Spinner';
import { formatMoney } from '@/utils/formatter';
import { Button } from '../ui/button';

type ModalProps = {
  children: React.ReactNode;
};

export const ModalPurchasesInstalments = ({ children }: ModalProps) => {
  const [data, setData] = useState<IPurchaseInstallment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPurchasesInstalments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/purchaseInstallment');
      if (!response.ok) {
        throw new Error(
          'Não foi possível carregar as compras parceladas. Tente novamente mais tarde.'
        );
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast.error((error as Error).message, {
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchasesInstalments();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className='fixed inset-0 bg-black/50 z-40' />
      <DialogContent className='fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg focus:outline-none w-full max-w-[90vw]'>
        <DialogHeader>
          <DialogTitle className='text-base sm:text-2xl'>
            Compras cadastradas esse mês
          </DialogTitle>
          <DialogDescription className='text-sm text-gray-600 mb-6'>
            Aqui estão as compras que você cadastrou no mês corrente.
          </DialogDescription>
        </DialogHeader>
        <div className='overflow-x-auto max-w-full'>
          <Table className='min-w-[600px]'>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Total de Parcelas</TableHead>
                <TableHead className='text-right'>Cadastrada em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='text-center'
                  >
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : (
                data?.map(purchase => (
                  <TableRow key={purchase.id}>
                    <TableCell>{purchase.description}</TableCell>
                    <TableCell>{formatMoney(purchase.totalValue)}</TableCell>
                    <TableCell className='text-center'>
                      {purchase.numberInstallments}
                    </TableCell>
                    <TableCell className='text-right'>
                      {new Date(purchase.createdAt).toLocaleDateString(
                        'pt-BR',
                        {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className='mt-5 bg-(--selective-yellow) text-foreground hover:bg-(--ut-orange) hover:text-background cursor-pointer'>
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

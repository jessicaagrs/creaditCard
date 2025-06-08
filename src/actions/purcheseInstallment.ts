import { prisma } from '@/lib/prisma';
import { IPurchaseInstallment } from '@/types';
import { createInstallment } from './installment';

export async function createPurchaseInstallment(
  description: string,
  value: number,
  installments: number
) {
  if (!description || !value || !installments) {
    throw new Error('Preencha todos os campos corretamente.');
  }

  const result: IPurchaseInstallment = await prisma.purchaseInstallment.create({
    data: {
      description,
      totalValue: value,
      numberInstallments: installments,
    },
  });

  createInstallment(result);
}

export async function getPurchaseInstallments() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  const purchases = await prisma.purchaseInstallment.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return purchases;
}

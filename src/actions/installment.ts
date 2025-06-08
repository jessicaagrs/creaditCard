import { prisma } from '@/lib/prisma';
import { IPurchaseInstallment } from '@/types';

export async function createInstallment(
  purchaseInstallment: IPurchaseInstallment
) {
  if (!purchaseInstallment) {
    throw new Error('Ocorreu um erro ao cadastrar as parcelas da compra.');
  }

  const { totalValue, numberInstallments, id } = purchaseInstallment;
  const baseValue = Number((totalValue / numberInstallments).toFixed(2));
  const installments = [];

  let accumulated = 0;
  for (let i = 0; i < numberInstallments; i++) {
    let value = baseValue;
    if (i === numberInstallments - 1) {
      value = Number((totalValue - accumulated).toFixed(2));
    } else {
      accumulated += value;
    }

    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + i);
    dueDate.setDate(1);

    installments.push({
      value,
      purchaseInstallmentId: id,
      dueDate,
    });
  }

  await Promise.all(
    installments.map(data => prisma.installment.create({ data }))
  );
}

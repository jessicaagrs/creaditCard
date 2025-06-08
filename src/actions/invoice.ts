import { prisma } from '@/lib/prisma';

export async function createInvoice(availableLimit: number) {
  if (availableLimit === 0)
    throw new Error(
      'Por favor, informe o limite disponível que consta no aplicativo do banco.'
    );

  const purchaseInstallmentCurrentMonth =
    await prisma.purchaseInstallment.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

  const totalPurchaseInstallmentCurrentMonth =
    purchaseInstallmentCurrentMonth.length === 0
      ? 0
      : purchaseInstallmentCurrentMonth.reduce((acc, item) => {
          return acc + item.totalValue;
        }, 0);

  const amountUsedSpendingLimit =
    2700 - totalPurchaseInstallmentCurrentMonth - availableLimit;

  const valueAvailableUse = 800 - amountUsedSpendingLimit;

  const installments = await prisma.installment.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalValueInstallments =
    installments.length === 0
      ? 0
      : installments.reduce((acc, item) => {
          return acc + item.value;
        }, 0);

  const amountPay = amountUsedSpendingLimit + totalValueInstallments;

  const monthReference = `${String(new Date().getMonth() + 1).padStart(
    2,
    '0'
  )}-${new Date().getFullYear()}`;

  await prisma.invoice.upsert({
    where: { monthReference },
    update: {
      availableLimit,
      amountUsedSpendingLimit,
      valueAvailableUse,
      amountPay,
    },
    create: {
      availableLimit,
      amountUsedSpendingLimit,
      valueAvailableUse,
      amountPay,
      monthReference,
    },
  });
}

export async function getInvoice() {
  const monthReference = `${String(new Date().getMonth() + 1).padStart(
    2,
    '0'
  )}-${new Date().getFullYear()}`;

  const invoice = await prisma.invoice.findUnique({
    where: { monthReference },
  });

  if (!invoice) {
    throw new Error('Fatura não encontrada para o mês atual.');
  }

  return invoice;
}

export async function getInvoiceCurrentMonth() {
  const invoice = await getInvoice();
  let totalInstallments = 0;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const installments = await prisma.installment.findMany({
    where: {
      dueDate: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
    orderBy: {
      dueDate: 'desc',
    },
  });

  if (installments.length > 0) {
    totalInstallments = installments.reduce((acc, item) => {
      return acc + item.value;
    }, 0);
  }

  return { invoice, totalInstallments };
}

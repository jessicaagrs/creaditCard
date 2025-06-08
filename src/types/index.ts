export interface IInvoice {
  id: number;
  availableLimit: number;
  totalLimit: number;
  spendingLimit: number;
  amountUsedSpendingLimit: number;
  valueAvailableUse: number;
  amountPay: number;
  monthReference: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPurchaseInstallment {
  id: number;
  description: string;
  totalValue: number;
  numberInstallments: number;
  createdAt: Date;
  updatedAt: Date;
  installments?: IInstallment[];
}

export interface IInstallment {
  id: number;
  value: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  purchaseInstallmentId: number;
}

export interface IInvoiceCurrentMonth {
  invoice: IInvoice;
  totalInstallments: number;
}


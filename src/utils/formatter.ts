const formatCurrency = (value: string) => {
  const rawValue = value.replace(/\D/g, '');
  const numericValue = Number(rawValue) / 100;
  const formatted = numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatted;
};

function formatMoney(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export { formatCurrency, formatMoney };

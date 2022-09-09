export const formatNumber = (number: number, max?: number, symbol?: string) => {
  const formattedNumber = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: max || 0,
  }).format(number);
  return `${formattedNumber}${symbol || ''}`;
};

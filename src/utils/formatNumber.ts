/**
 * Formating a number with the specified rounding, or by default - to an integer.
 * If necessary, you can add a symbol.
 */

export const formatNumber = (number: number, max?: number, symbol?: string) => {
  const formattedNumber = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: max || 0,
  }).format(number);

  return `${formattedNumber}${symbol || ''}`;
};

const formatNumber = (number: number, max?: number) => {
  return new Intl.NumberFormat('ru-RU', {
    maximumSignificantDigits: max || 0,
  }).format(number);
};

export default formatNumber;

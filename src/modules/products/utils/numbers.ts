import BigDecimal from 'js-big-decimal';

export const roundNumber = (value: number, precision = 2): number => {
  return +new BigDecimal(value)
    .round(precision, BigDecimal.RoundingModes.CEILING)
}

export const numberToMoney = (value: number): string => {
  return Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(value)
}
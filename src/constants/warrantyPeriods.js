export const WARRANTY_PERIODS = [
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
  { value: 12, label: '1 year' },
  { value: 24, label: '2 years' },
  { value: 36, label: '3 years' },
  { value: 60, label: '5 years' },
  { value: 120, label: '10 years' },
  { value: 9999, label: 'Lifetime' },
];

export const getWarrantyPeriodLabel = (months) => {
  const period = WARRANTY_PERIODS.find(p => p.value === months);
  if (period) return period.label;
  
  if (months < 12) {
    return `${months} months`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  }
  
  return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
};
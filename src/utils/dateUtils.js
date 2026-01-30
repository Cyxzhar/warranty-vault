export function calculateExpiryDate(purchaseDate, months) {
  const date = new Date(purchaseDate + 'T00:00:00');
  date.setMonth(date.getMonth() + parseInt(months, 10));
  return date;
}

export function getDaysUntilExpiry(purchaseDate, months) {
  const expiry = calculateExpiryDate(purchaseDate, months);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getWarrantyStatus(purchaseDate, months) {
  const days = getDaysUntilExpiry(purchaseDate, months);
  if (days < 0) return 'expired';
  if (days <= 30) return 'expiring';
  return 'active';
}

export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDaysRemaining(days) {
  if (days < 0) {
    const absDays = Math.abs(days);
    return `Expired ${absDays} ${absDays === 1 ? 'day' : 'days'} ago`;
  }
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  if (days <= 30) return `Expires in ${days} days`;
  return `${days} days remaining`;
}

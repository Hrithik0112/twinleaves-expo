const USD_TO_INR_RATE = 83.12; // You can update this rate as needed

export const convertUSDtoINR = (usdPrice: number): number => {
  return usdPrice * USD_TO_INR_RATE;
};

export const formatToRupees = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
};

export const formatPriceFromUSD = (usdPrice: number): string => {
  const inrPrice = convertUSDtoINR(usdPrice);
  return formatToRupees(inrPrice);
};

export const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
  return price - (price * discountPercentage / 100);
};

export const formatToRupeesCompact = (price: number): string => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)}Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)}L`;
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(2)}K`;
  }
  return formatToRupees(price);
};
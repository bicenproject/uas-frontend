export const formatPrice = (value: string | number): string => {  
  const numValue = typeof value === 'string'   
    ? parseFloat(value)   
    : value;  
  
  if (isNaN(numValue)) return 'Rp 0';  

  return new Intl.NumberFormat('id-ID', {  
    style: 'currency',  
    currency: 'IDR',  
    minimumFractionDigits: 0,  
    maximumFractionDigits: 0  
  }).format(numValue);  
};
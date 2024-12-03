 export const formatPrice = (price: string) => {  
    return new Intl.NumberFormat('id-ID', {  
      style: 'currency',  
      currency: 'IDR',  
      minimumFractionDigits: 0,  
      maximumFractionDigits: 0,  
    }).format(Number(price));  
  };
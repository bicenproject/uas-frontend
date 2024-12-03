// utils/dateUtils.ts  

export const months = {  
    0: 'Januari',  
    1: 'Februari',  
    2: 'Maret',  
    3: 'April',  
    4: 'Mei',  
    5: 'Juni',  
    6: 'Juli',  
    7: 'Agustus',  
    8: 'September',  
    9: 'Oktober',  
    10: 'November',  
    11: 'Desember'  
  };  
  
  export const days = {  
    0: 'Minggu',  
    1: 'Senin',  
    2: 'Selasa',  
    3: 'Rabu',  
    4: 'Kamis',  
    5: 'Jumat',  
    6: 'Sabtu'  
  };  
  
  export const dateUtils = {  
    /**  
     * Format tanggal ke format Indonesia (DD Bulan YYYY)  
     * @param date - string atau Date object  
     * @returns string format "DD Bulan YYYY" (contoh: "17 Agustus 2024")  
     */  
    formatToID: (date: string | Date | null): string => {  
      if (!date) return '-';  
      const d = new Date(date);  
      if (isNaN(d.getTime())) return '-';  
      
      const day = d.getDate();  
      const month = months[d.getMonth() as keyof typeof months];  
      const year = d.getFullYear();  
      
      return `${day} ${month} ${year}`;  
    },  
  
    /**  
     * Format tanggal ke format Indonesia lengkap dengan hari  
     * @param date - string atau Date object  
     * @returns string format "Hari, DD Bulan YYYY" (contoh: "Senin, 17 Agustus 2024")  
     */  
    formatToIDWithDay: (date: string | Date | null): string => {  
      if (!date) return '-';  
      const d = new Date(date);  
      if (isNaN(d.getTime())) return '-';  
      
      const dayName = days[d.getDay() as keyof typeof days];  
      const day = d.getDate();  
      const month = months[d.getMonth() as keyof typeof months];  
      const year = d.getFullYear();  
      
      return `${dayName}, ${day} ${month} ${year}`;  
    },  
  
    /**  
     * Format tanggal ke format Indonesia dengan waktu  
     * @param date - string atau Date object  
     * @returns string format "DD Bulan YYYY HH:mm" (contoh: "17 Agustus 2024 14:30")  
     */  
    formatToIDWithTime: (date: string | Date | null): string => {  
      if (!date) return '-';  
      const d = new Date(date);  
      if (isNaN(d.getTime())) return '-';  
      
      const day = d.getDate();  
      const month = months[d.getMonth() as keyof typeof months];  
      const year = d.getFullYear();  
      const hours = d.getHours().toString().padStart(2, '0');  
      const minutes = d.getMinutes().toString().padStart(2, '0');  
      
      return `${day} ${month} ${year} ${hours}:${minutes}`;  
    },  
  
    /**  
     * Format tanggal ke format Indonesia singkat (DD/MM/YYYY)  
     * @param date - string atau Date object  
     * @returns string format "DD/MM/YYYY" (contoh: "17/08/2024")  
     */  
    formatToIDShort: (date: string | Date | null): string => {  
      if (!date) return '-';  
      const d = new Date(date);  
      if (isNaN(d.getTime())) return '-';  
      
      const day = d.getDate().toString().padStart(2, '0');  
      const month = (d.getMonth() + 1).toString().padStart(2, '0');  
      const year = d.getFullYear();  
      
      return `${day}/${month}/${year}`;  
    },  
  
    /**  
     * Format tanggal dari string ISO ke format yyyy-MM-dd untuk input date HTML  
     * @param date - string atau Date object  
     * @returns string format "YYYY-MM-DD" (contoh: "2024-08-17")  
     */  
    formatToHTMLDate: (date: string | Date | null): string => {  
      if (!date) return '';  
      const d = new Date(date);  
      if (isNaN(d.getTime())) return '';  
      
      return d.toISOString().split('T')[0];  
    },  
  
    /**  
     * Mendapatkan umur dari tanggal lahir  
     * @param birthDate - string atau Date object  
     * @returns number - umur dalam tahun  
     */  
    getAge: (birthDate: string | Date): number => {  
      const today = new Date();  
      const birthDateObj = new Date(birthDate);  
      let age = today.getFullYear() - birthDateObj.getFullYear();  
      const m = today.getMonth() - birthDateObj.getMonth();  
      
      if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {  
        age--;  
      }  
      
      return age;  
    },  
  
    /**  
     * Cek apakah tanggal valid  
     * @param date - string atau Date object  
     * @returns boolean  
     */  
    isValidDate: (date: string | Date): boolean => {  
      const d = new Date(date);  
      return !isNaN(d.getTime());  
    }  
    
  };

  export const formatDate = (dateString: string): string => {  
    const date = new Date(dateString);  
    return date.toLocaleDateString('id-ID', {  
      day: '2-digit',  
      month: '2-digit',  
      year: 'numeric',  
      hour: '2-digit',  
      minute: '2-digit'  
    });  
  };
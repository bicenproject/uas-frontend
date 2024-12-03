import { Html, Head, Main, NextScript } from 'next/document'  

export default function Document() {  
  return (  
    <Html lang="en">  
      <Head>  
        {/* Meta tags global */}  
        <meta charSet="utf-8" />  
        <meta name="viewport" content="width=device-width, initial-scale=1" />  
        
        {/* Favicon */}  
        <link rel="icon" href="/favicon.ico" />  
        
        {/* Font (opsional jika menggunakan CDN) */}  
        <link  
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"  
          rel="stylesheet"  
        />  
        
        {/* Meta tags SEO */}  
        <meta name="theme-color" content="#000000" />  
        <meta  
          name="Inventory App"  
          content="Deskripsi website Anda"  
        />  
        <meta  
          name="keywords"  
          content="keyword1, keyword2, keyword3"  
        />  
        
        {/* Open Graph / Facebook */}  
        <meta property="og:type" content="website" />  
        <meta property="og:url" content="https://yourdomain.com/" />  
        <meta property="og:title" content="Judul Website" />  
        <meta  
          property="og:Inventory App"  
          content="Deskripsi website Anda"  
        />  
        <meta property="og:image" content="/og-image.jpg" />  

        {/* Twitter */}  
        <meta property="twitter:card" content="summary_large_image" />  
        <meta property="twitter:url" content="https://yourdomain.com/" />  
        <meta property="twitter:title" content="Judul Website" />  
        <meta  
          property="twitter:Inventory App"  
          content="Deskripsi website Anda"  
        />  
        <meta property="twitter:image" content="/og-image.jpg" />  
      </Head>  
      <body>  
        <Main />  
        <NextScript />  
      </body>  
    </Html>  
  )  
}
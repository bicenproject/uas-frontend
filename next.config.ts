 module.exports = {  
  images: {  
    domains: ['https://localhost:8000'],  
    remotePatterns: [  
      {  
        protocol: 'https',  
        hostname: '**',  
      },  
      {  
        protocol: 'http',  
        hostname: '**',  
      },  
    ],  
  },  
};
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //main
        primary: '#8E7B68',
        secondary: '#C5A1A0',
        accent: '#FDF8F4',
        background: '#F5EFE6',
        text: '#3D2C28',

        //other
        'success': '#34D399',
        'warning': '#FBBF24',
        'error': '#EF4444',
      },
      fontFamily:{
        'sans': ['Lexend']
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '3rem' }],  
        'h2': ['2rem', { lineHeight: '2.5rem' }],  
        'h3': ['1.50rem', { lineHeight: '2rem' }],
        'p': ['1rem', { lineHeight: '1.6rem' }],      
        'a': ['1rem', { lineHeight: '1.6rem' }],      
        'li': ['1rem', { lineHeight: '1.6rem' }],     
        'button': ['1.125rem', { lineHeight: '2rem' }],
      },
      fontWeight: {
        'h1': 'bold',            
        'h2': 'semibold',        
        'h3': 'normal',          
        'p': 'normal',           
        'a': 'medium',           
        'li': 'normal',          
        'button': 'bold',        
      }
    },
  },
  plugins: [],
} satisfies Config;

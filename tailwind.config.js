/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        opsans: ['Open Sans'],
        manjari: ['Manjari'],
        indie: ['Indie Flower']
      },
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      colors: {
        graphite: '#393D3F',
        icy: '#FDFDFF',
        aegean: '#62929E',
        teal: '#40a8c4',
        marine: '#235784'
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|border|text)-(graphite|icy|aegean|teal|marine)/
    },
    {
      pattern: /(font)-(opsans|manjari|indie)/
    },
    {
      pattern: /(p|m)-(128|144)/
    }
  ]
}

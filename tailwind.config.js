module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      xs: '320px',
    },
    screens: {
      xs: '375px',

      sm: '480px',
      // => @media (min-width: 480px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1800px',
    },
    maxWidth: {
      50: '50%',
      75: '75%',
      90: '90%',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

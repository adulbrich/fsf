import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'light-black': '#212529',
        'beaver-orange': '#D73F09',
        'moondust': '#C6DAE7',
        'luminance': '#FFB500',
        'stratosphere': '#006A8E',
        'dark-orange': '#A94623',
        'light-blackSelected' : "#45484B",
        'unavailable' : '#9D9FA2',
        
      }
    },
  },

  plugins: [daisyui],
  
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: false, // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkMain: '#050505',
                lightMain: '#fff',
            },
            screens: {},
        },
    },
    plugins: [],
};

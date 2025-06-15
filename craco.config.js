module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: {
      resolve: {
        alias: {
          '@': require('path').resolve(__dirname, 'src'),
        },
      },
    },
  },
}; 
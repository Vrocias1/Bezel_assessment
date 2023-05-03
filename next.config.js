module.exports = {
    images: {
      domains: ['getbezel.mo.cloudinary.net'],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  };
  
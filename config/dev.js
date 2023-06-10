module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api':{
          target: 'http://vip.gdxsjt.com/mp',
          // changeOrigin: true,
          secure: false
        }
      }
    }
  }
};

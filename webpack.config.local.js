const common = require('./node_modules/juicyfront/wp5_template');

const config = common.config({
  port: 8000,
  applicationName: `${process.env['REACT_APP_NAME']}`,
  russianName: `${process.env['REACT_RUS_NAME']}`,
  exposes: {},
  baseUrl: '/',
});

module.exports = config;

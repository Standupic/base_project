const common = require('./node_modules/juicyfront/wp5_template');
const config = common.config({
  port: 8000,
  applicationName: `${process.env['REACT_APP_NAME']}`,
  russianName: `${process.env['REACT_RUS_NAME']}`,
  exposes: {
    './app': './src/Main',
  },
  baseUrl: '/sap/bc/ui5_ui5/sap/z_hr_yearrep/',
});

module.exports = config;

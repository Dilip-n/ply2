module.exports = {
  boschAppCreds: {
    host: process.env.BOSCH_HOST || "http://iot2.hyperthings.in:6010",
    username: process.env.BOSCH_USERNAME || "boschadmin",
    password: process.env.BOSCH_PASSWORD || "321@Bosch",
  },
  vignaharthaCreds: {
    host: process.env.VIGNAHARTHA_HOST || "https://ibin.hyperthings.in",
    username: process.env.VIGNAHARTHA_USERNAME || "demo@vighnaharta.com",
    password: process.env.VIGNAHARTHA_PASSWORD || "hts@hyd@123",
  },
  diccCreds: {
    host: process.env.DICC_HOST || "http://103.116.27.151:7002",
    username: process.env.DICC_USERNAME || "admin@hyperthings.in",
    password: process.env.DICC_PASSWORD || "Suru@2617",
  },
  fmsBadalpurCreds: {
    host: process.env.FMSB_HOST || "http://35.206.94.22:7001",
    username: process.env.FMSB_USERNAME || "kbmc@hyperthings.in",
    password: process.env.FMSB_PASSWORD || "hts@hyd@123",
  },
  fmsMumbaiCreds: {
    host: process.env.FMSM_HOST || "http://35.206.94.22:7001",
    username: process.env.FMSM_USERNAME || "mcgm@hyperthings.in",
    password: process.env.FMSM_PASSWORD || "hts@hyd@123",
  },
  airQualityCreds: {
    host: process.env.AQM_HOST || "http://35.206.94.22:7006",
    username: process.env.AQM_USERNAME || "qeeri@hyperthings.in",
    password: process.env.AQM_PASSWORD || "qeeri@123#",
  },
};

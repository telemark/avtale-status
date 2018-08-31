if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
module.exports = {
  DONE_DIRECTORY_PATH: process.env.DONE_DIRECTORY_PATH || 'test/directories/done',
  JOBS_DIRECTORY_PATH: process.env.JOBS_DIRECTORY_PATH || 'test/directories/jobs',
  AGREEMENTS_JWT_SECRET: process.env.AGREEMENTS_JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  AGREEMENTS_LOG_SEARCH_URL: process.env.AGREEMENTS_LOG_SEARCH_URL || 'https://log.service.no/agreements/search',
  AGREEMENTS_LOG_UPDATE_URL: process.env.AGREEMENTS_LOG_UPDATE_URL || 'https://log.service.no/agreements',
  SVARUT_JWT_SECRET: process.env.SVARUT_JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  SVARUT_SERVICE_URL: process.env.SVARUT_SERVICE_URL || 'https://svarut.service.no',
  STATS_SERVICE_JWT: process.env.STATS_SERVICE_JWT || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  STATS_SERVICE_URL: process.env.STATS_SERVICE_URL || 'https://stats.service.no',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'avtale-robot',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}

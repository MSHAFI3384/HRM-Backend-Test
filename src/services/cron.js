import { CronJob } from 'cron'
import { getSheetDataService } from './cron/googleSheet'
import logger from '../logger';

module.exports = (app) => {
  const sheetCron = new CronJob('10 * * * * *', async () => {
    try {
      await getSheetDataService()
      logger.info(`Sheet Data Synced on ${new Date().toLocaleString()}`)
    } catch (err) {
      logger.error('Sheet Data Sync Error', err)
    }
  })

  // sheetCron.start()
}

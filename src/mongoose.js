import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from './logger';

dotenv.config()

module.exports = (app) => {

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose.connect(process.env.MONGO_DB_DEV_URL, options)

  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  //set this variable to true, to see live process of mongo db query's in terminal
  mongoose.set('debug', false)
  mongoose.connection
    .once('open', () => logger.info('Mongo connected 🍀'))
    .on('error', () => logger.error('Connection error'))
}
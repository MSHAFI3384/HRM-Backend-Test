import logger from '../logger';

const getActualRequestDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

let APIlogger = (req, res, next) => {
  logger.info(`Endpoint - ${req.originalUrl} [${req.method}]`)
  if (res && res.statusCode === 200) {
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
    logger.info(`Endpoint - ${req.originalUrl} [${req.method}]: SUCCESS in ${durationInMilliseconds.toLocaleString()} ms`)
  }
  next();
}

module.exports = APIlogger
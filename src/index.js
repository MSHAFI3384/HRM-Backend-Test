import logger from './logger';
import app from './app';
import packages from '../package.json';

const PORT = 3000

app.get("/", (req, res) => { return res.json({ description: "Epitome API", version: packages.version }); });

const server = app.listen(process.env.PORT || PORT);

process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
    logger.info(`Application started on port ${PORT} 🚀`)
);
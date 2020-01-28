import pino from 'pino';
import env from '../../config';

const {
    LOGGER_NAME,
    LOGGER_LEVEL,
} = env;

export const L = pino({ name: LOGGER_NAME, level: LOGGER_LEVEL });

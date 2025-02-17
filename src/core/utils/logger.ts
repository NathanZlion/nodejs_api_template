import winston from 'winston';

const alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all: true
    }),
    winston.format.label({
        label: '[LOGGER]'
    }),
    winston.format.timestamp({
        format: "YY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

const logger = winston.createLogger({
    // level: "debug",
    transports: [
        new winston.transports.Console(
            // {
            //     format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
            // }
        ),
        // Saves logs to a file if you want to
        // new winston.transports.File({ filename: "logs/app.log" }) 
    ],
});

export { logger };
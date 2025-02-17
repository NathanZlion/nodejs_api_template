import server from "./server"
import config from "./config"
import { logger } from "./core/utils/logger";

const PORT = config.PORT || 3000;

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

/**
 * Sistema de Logging para TaskMaster Integration
 */

class Logger {
    constructor(component) {
        this.component = component;
        this.logLevel = process.env.LOG_LEVEL || 'info';
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };
    }

    /**
     * Log de erro
     */
    error(message, error = null) {
        if (this.shouldLog('error')) {
            const timestamp = new Date().toISOString();
            console.error(`[${timestamp}] [ERROR] [${this.component}] ${message}`);
            if (error) {
                console.error(error);
            }
        }
    }

    /**
     * Log de aviso
     */
    warn(message) {
        if (this.shouldLog('warn')) {
            const timestamp = new Date().toISOString();
            console.warn(`[${timestamp}] [WARN] [${this.component}] ${message}`);
        }
    }

    /**
     * Log de informação
     */
    info(message) {
        if (this.shouldLog('info')) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] [INFO] [${this.component}] ${message}`);
        }
    }

    /**
     * Log de debug
     */
    debug(message) {
        if (this.shouldLog('debug')) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] [DEBUG] [${this.component}] ${message}`);
        }
    }

    /**
     * Verifica se deve fazer log baseado no nível
     */
    shouldLog(level) {
        return this.levels[level] <= this.levels[this.logLevel];
    }
}

module.exports = { Logger };

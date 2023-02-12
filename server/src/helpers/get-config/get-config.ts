import config from 'config'

/**
 * Wrapper method for config package
 * Sets the config env based con NODE_ENV value.
 * @param key - the key of the config
 * @returns config value
 */
export const getConfig = (key: string) => {
    /**
     * If NODE_ENV is not set in the environment, 
     * a default value of development is used.
     * https://github.com/node-config/node-config/wiki/Configuration-Files
     */
    return config.get(key)
};

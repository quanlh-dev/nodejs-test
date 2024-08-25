import * as dotenv from 'dotenv';
import ConfigKey from './config-key';
dotenv.config();
const customConfig = {} as Record<ConfigKey, any>;
Object.keys(ConfigKey).forEach((key) => {
    customConfig[key] = process.env?.[key];
});

export default customConfig;

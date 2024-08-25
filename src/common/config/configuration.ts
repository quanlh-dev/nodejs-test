import config from './index';
// import { configJoiSchema } from './validation-schema';

export default () => {
    const CONFIG = {
        ...config,
    };
    // const validateResult = configJoiSchema.validate(CONFIG);
    // if (validateResult?.error) {
    //     console.log('[INVALID CONFIG]', validateResult?.error?.details);
    //     throw validateResult.error;
    // }
    // return validateResult.value;
    return CONFIG;
};

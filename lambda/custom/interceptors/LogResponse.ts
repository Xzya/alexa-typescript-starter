import { ResponseInterceptor } from 'ask-sdk-core';

import { logHelpers } from '../lib/logHelpers';

export const LogResponse: ResponseInterceptor = {
    process(handlerInput, response) {
        logHelpers.logAssert('RESPONSE ENVELOPE', response);
    },
};
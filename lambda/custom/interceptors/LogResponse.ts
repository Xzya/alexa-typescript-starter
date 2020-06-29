import { ResponseInterceptor } from 'ask-sdk-core';

import { logHelpers } from '../lib/logHelpers';

export const LogResponse: ResponseInterceptor = {
    process(_handlerInput, response) {
        logHelpers.logInfo('RESPONSE ENVELOPE', response);
    },
};
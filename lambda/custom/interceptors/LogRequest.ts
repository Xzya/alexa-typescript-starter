import { RequestInterceptor } from 'ask-sdk-core';

import { logHelpers } from '../lib/logHelpers';

export const LogRequest: RequestInterceptor = {
    process(handlerInput) {
        logHelpers.logInfo('REQUEST ENVELOPE', handlerInput.requestEnvelope);
    },
};
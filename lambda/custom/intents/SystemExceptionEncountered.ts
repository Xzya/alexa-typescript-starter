import { RequestHandler } from 'ask-sdk-core';

import { logHelpers, RequestTypes, skillHelpers } from '../lib';

export const SystemExceptionEncountered: RequestHandler = {
    canHandle(handlerInput) {
        return skillHelpers.isType(handlerInput, RequestTypes.SystemExceptionEncountered);
    },
    handle(handlerInput) {
        logHelpers.logError("\n******************* EXCEPTION **********************", handlerInput.requestEnvelope)

        return handlerInput.responseBuilder
            .getResponse();
    }
};

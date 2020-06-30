import { ErrorHandler } from 'ask-sdk-core';

import { ErrorTypes, logHelpers, skillHelpers, Strings } from '../lib';

/**
 * Handles ErrorTypes.Unexpected errors which should be thrown when something
 * unexpected happens.
 */
export const Unexpected: ErrorHandler = {
    canHandle(_, error) {
        return error.name === ErrorTypes.Unexpected;
    },
    handle(handlerInput, error) {
        logHelpers.logError('ERROR', error)

        const { t } = skillHelpers.getRequestAttributes(handlerInput);

        const res = handlerInput.responseBuilder
            .speak(t(Strings.ERROR_UNEXPECTED_MSG))
            .getResponse();
        return res;
    },
};

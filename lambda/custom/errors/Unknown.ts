import { ErrorHandler } from 'ask-sdk-core';

import { logHelpers, skillHelpers, Strings } from '../lib';
import { ErrorTypes } from '../lib/constants';

/**
 * Handles unknown errors. Should be placed at the end, as it will catch
 * all errors.
 */
export const Unknown: ErrorHandler = {
    canHandle(_, error) {
        return error.name === ErrorTypes.Unknown;
    },
    handle(handlerInput, error) {
        logHelpers.logError('UNKNOWN ERROR', error)

        const { t } = skillHelpers.getRequestAttributes(handlerInput);

        const speechText = t(Strings.ERROR_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};

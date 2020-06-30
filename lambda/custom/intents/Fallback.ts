import { RequestHandler } from 'ask-sdk-core';

import { IntentTypes, skillHelpers, Strings } from '../lib';

export const Fallback: RequestHandler = {
    canHandle(handlerInput) {
        return skillHelpers.isIntent(handlerInput, IntentTypes.Fallback);
    },
    handle(handlerInput) {
        const { t } = skillHelpers.getRequestAttributes(handlerInput);

        const speechText = t(Strings.ERROR_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(t(Strings.HELP_MSG))
            .getResponse();
    }
};

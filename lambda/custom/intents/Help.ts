import { RequestHandler } from 'ask-sdk-core';

import { IntentTypes, skillHelpers, Strings } from '../lib';

export const Help: RequestHandler = {
    canHandle(handlerInput) {
        return skillHelpers.isIntent(handlerInput, IntentTypes.Help);
    },
    handle(handlerInput) {
        const { t } = skillHelpers.getRequestAttributes(handlerInput);

        const speechText = t(Strings.HELP_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(t(Strings.SKILL_NAME), speechText)
            .getResponse();
    }
};

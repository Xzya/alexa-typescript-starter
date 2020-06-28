import { RequestHandler } from 'ask-sdk-core';

import { IntentTypes, skillHelpers, Strings } from '../lib';

export const Stop: RequestHandler = {
    canHandle(handlerInput) {
        return skillHelpers.isIntent(handlerInput, IntentTypes.Stop, IntentTypes.Cancel);
    },
    handle(handlerInput) {
        const { t } = skillHelpers.getRequestAttributes(handlerInput);

        const speechText = t(Strings.GOODBYE_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(t(Strings.SKILL_NAME), speechText)
            .getResponse();
    }
};

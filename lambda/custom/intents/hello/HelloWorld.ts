import { RequestHandler } from "ask-sdk-core";
import { IntentTypes, Strings } from "../../lib/constants";
import { skillHelpers } from '../../lib/helpers';

export const HelloWorld: RequestHandler = {
    canHandle(handlerInput) {
        return skillHelpers.isIntent(handlerInput, IntentTypes.HelloWorld);
    },
    handle(handlerInput) {
        const { t } = skillHelpers.getRequestAttributes(handlerInput);

        const speechText = t(Strings.HELLO_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(t(Strings.SKILL_NAME), speechText)
            .getResponse();
    }
};

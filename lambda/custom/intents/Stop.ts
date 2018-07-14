import { RequestHandler } from "ask-sdk-core";
import { IntentTypes, Strings } from "../lib/constants";
import { IsIntent, GetRequestAttributes } from "../lib/helpers";

export const Stop: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, IntentTypes.Stop, IntentTypes.Cancel);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        const speechText = t(Strings.GOODBYE_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(t(Strings.SKILL_NAME), speechText)
            .getResponse();
    }
};

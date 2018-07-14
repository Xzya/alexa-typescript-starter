import { RequestHandler } from "ask-sdk-core";
import { IsIntent, GetRequestAttributes } from "../lib/helpers";
import { IntentTypes, Strings } from "../lib/constants";

export const Fallback: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, IntentTypes.Fallback);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        const speechText = t(Strings.ERROR_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(t(Strings.HELP_MSG))
            .getResponse();
    }
};

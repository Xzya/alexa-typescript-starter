import { RequestHandler } from "ask-sdk-core";
import { IsIntent, GetRequestAttributes } from "../../lib/helpers";
import { IntentTypes } from "../../lib/constants";

export const HelloWorld: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, IntentTypes.HelloWorld);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        const speechText = t("HELLO_MSG");

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(t("SKILL_NAME"), speechText)
            .getResponse();
    }
};

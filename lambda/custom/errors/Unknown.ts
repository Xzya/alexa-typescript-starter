import { ErrorHandler } from "ask-sdk-core";
import { GetRequestAttributes } from "../lib/helpers";
import { Strings } from "../lib/constants";

export const Unknown: ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        const { t } = GetRequestAttributes(handlerInput);

        const speechText = t(Strings.ERROR_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};

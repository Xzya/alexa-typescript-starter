import { ErrorHandler } from "ask-sdk-core";
import { GetRequestAttributes } from "../lib/helpers";
import { Strings, ErrorTypes } from "../lib/constants";

/**
 * Handles ErrorTypes.Unexpected errors which should be thrown when something
 * unexpected happens.
 */
export const Unexpected: ErrorHandler = {
    canHandle(_, error) {
        return error.name === ErrorTypes.Unexpected;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        const { t } = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(t(Strings.ERROR_UNEXPECTED_MSG))
            .getResponse();
    },
};

import { ErrorHandler } from "ask-sdk-core";
import { Strings, ErrorTypes } from "../lib/constants";
import { skillHelpers } from "../lib/helpers";

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

        const { t } = skillHelpers.getRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(t(Strings.ERROR_UNEXPECTED_MSG))
            .getResponse();
    },
};

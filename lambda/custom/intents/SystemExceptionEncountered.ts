import { RequestHandler } from "ask-sdk-core";
import { RequestTypes } from "../lib/constants";
import { IsType } from "../lib/helpers";

export const SystemExceptionEncountered: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, RequestTypes.SystemExceptionEncountered);
    },
    handle(handlerInput) {
        console.log("\n******************* EXCEPTION **********************");
        console.log("\n" + JSON.stringify(handlerInput.requestEnvelope, null, 2));

        return handlerInput.responseBuilder
            .getResponse();
    }
};

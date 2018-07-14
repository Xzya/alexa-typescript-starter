import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../lib/helpers";
import { RequestTypes } from "../lib/constants";

export const SessionEnded: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, RequestTypes.SessionEnded);
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

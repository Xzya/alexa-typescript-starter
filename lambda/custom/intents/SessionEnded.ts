import { RequestHandler } from 'ask-sdk-core';

import { RequestTypes } from '../lib/constants';
import { skillHelpers } from '../lib/helpers';

export const SessionEnded: RequestHandler = {
    canHandle(handlerInput) {
        return skillHelpers.isType(handlerInput, RequestTypes.SessionEnded);
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.withShouldEndSession(true).getResponse();
    }
};

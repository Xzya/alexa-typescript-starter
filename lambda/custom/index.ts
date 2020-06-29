import * as Alexa from 'ask-sdk-core';

import * as Errors from './errors';
import * as Intents from './intents';
import * as HelloIntents from './intents/hello';
import * as Interceptors from './interceptors';

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        // Intents.Debug,

        // Default intents
        Intents.Launch,
        Intents.Help,
        Intents.Stop,
        Intents.SessionEnded,
        Intents.SystemExceptionEncountered,
        Intents.Fallback,

        // Hello intents
        HelloIntents.HelloWorld
    )
    .addErrorHandlers(
        Errors.Unknown,
        Errors.Unexpected
    )
    .addRequestInterceptors(
        Interceptors.Localization,
        Interceptors.SlotInterceptor,
        Interceptors.LogRequest,
    ).addResponseInterceptors(
        Interceptors.LogResponse
    )
    .lambda();

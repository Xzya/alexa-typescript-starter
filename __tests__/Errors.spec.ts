import { HandlerInput } from 'ask-sdk-core';

import { errorHelper, ErrorTypes, IntentTypes, skillHelpers, Strings } from '../lambda/custom/lib';
import { getLocalePath } from '../lambda/custom/locales/locale';
import { helpers, IntentRequestBuilder, requestFactory, responseBuilder } from './helpers';

helpers.setConfigurationsAndRunPipeline({
    resource: getLocalePath()
}, locale => {
    describe("Errors", () => {

        const request = requestFactory()
            .createRequest(IntentRequestBuilder, locale)
            .addIntent({
                name: IntentTypes.HelloWorld,
                confirmationStatus: "CONFIRMED"
            });

        it("Unknown", async () => {

            skillHelpers.isIntent = jest.fn().mockImplementation((handlerInput: HandlerInput, ...args: any) => {
                throw errorHelper.createError('This is a test')
            });

            const matcher = responseBuilder()
                .addResponse(Strings.ERROR_MSG)
                .addReprompt(Strings.ERROR_MSG);

            const response = await helpers.skill(request.getRequest());

            expect(response).toMatchObject(matcher.getResponse());
        });

        it("Unexpected", async () => {

            skillHelpers.isIntent = jest.fn().mockImplementation((handlerInput: HandlerInput, ...args: any) => {
                throw errorHelper.createError('This is a test', ErrorTypes.Unexpected)
            });

            const matcher = responseBuilder()
                .addResponse(Strings.ERROR_UNEXPECTED_MSG)

            const response = await helpers.skill(request.getRequest());

            expect(response).toMatchObject(matcher.getResponse());
        });

    });
})
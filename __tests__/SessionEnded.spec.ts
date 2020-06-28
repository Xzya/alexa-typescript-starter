import { getLocalePath } from '../lambda/custom/locales/locale';
import { helpers, requestFactory, responseBuilder } from './helpers';
import { SessionEndedRequestBuilder } from './helpers/SessionEndedRequestBuilder';

helpers.setConfigurationsAndRunPipeline({
    resource: getLocalePath()
}, locale => {
    describe("Session Ended", () => {
        it("should work", async () => {
            const request = requestFactory().createRequest(SessionEndedRequestBuilder, locale);

            const response = await helpers.skill(request.getRequest());

            const matcher = responseBuilder().shouldEndSession(true);

            expect(response).toMatchObject(matcher.getResponse());
        });
    });
})
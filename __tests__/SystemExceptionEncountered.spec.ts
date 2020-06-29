import { getLocalePath } from '../lambda/custom/locales/locale';
import { helpers, requestFactory, responseBuilder } from './helpers';
import { SystemExceptionEncounteredRequestBuilder } from './helpers/SystemExceptionEncouteredRequestBuilder';

helpers.setConfigurationsAndRunPipeline({
    resource: getLocalePath()
}, locale => {
    describe("Session Ended", () => {
        it("should work", async () => {
            const request = requestFactory().createRequest(SystemExceptionEncounteredRequestBuilder, locale);

            const response = await helpers.skill(request.getRequest());

            expect(response).toMatchObject(responseBuilder().getResponse());
        });
    });
})
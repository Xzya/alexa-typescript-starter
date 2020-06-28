import { Strings } from '../lambda/custom/lib/constants';
import { getLocalePath } from '../lambda/custom/locales/locale';
import { helpers } from './helpers';
import { IntentRequestBuilder } from './helpers/IntentRequestBuilder';
import { requestFactory } from './helpers/RequestFactory';
import { responseBuilder } from './helpers/ResponseBuilder';

helpers.setConfigurationsAndRunPipeline({
    resource: getLocalePath()
}, locale => {
    describe("Errors", () => {
        it("Unknown", async () => {
            const matcher = responseBuilder().addResponse(Strings.ERROR_MSG).addReprompt(Strings.ERROR_MSG);

            const request = requestFactory().createRequest(IntentRequestBuilder, locale);

            const response = await helpers.skill(request.getRequest());

            expect(response).toMatchObject(matcher.getResponse());
        });
    });
})
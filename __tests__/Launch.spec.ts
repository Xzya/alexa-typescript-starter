import { Strings } from '../lambda/custom/lib/constants';
import { getLocalePath } from '../lambda/custom/locales/locale';
import { helpers, LaunchRequestBuilder, requestFactory, responseBuilder } from './helpers';

helpers.setConfigurationsAndRunPipeline({
    resource: getLocalePath()
}, locale => {
    describe("Launch", () => {
        it("should work", async () => {
            const request = requestFactory().createRequest(LaunchRequestBuilder, locale);

            const response = await helpers.skill(request.getRequest());

            const matcher = responseBuilder()
                .addResponse(Strings.WELCOME_MSG)
                .addReprompt(Strings.WELCOME_MSG)
                .addSimpleCard({ key: Strings.SKILL_NAME }, { key: Strings.WELCOME_MSG });

            expect(response).toMatchObject(matcher.getResponse());
        });
    });
})
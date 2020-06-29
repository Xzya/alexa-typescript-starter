import { IntentTypes, Strings } from '../lambda/custom/lib/constants';
import { getLocalePath } from '../lambda/custom/locales/locale';
import { helpers, IntentRequestBuilder, requestFactory, responseBuilder } from './helpers';

helpers.setConfigurationsAndRunPipeline({
    resource: getLocalePath()
}, locale => {
    describe("Hello", () => {
        it("should work", async () => {
            const matcher = responseBuilder()
                .addResponse(Strings.HELLO_MSG)
                .addSimpleCard({ key: Strings.SKILL_NAME }, { key: Strings.HELLO_MSG })

            const request = requestFactory().createRequest(IntentRequestBuilder, locale).addIntent({
                name: IntentTypes.HelloWorld,
                confirmationStatus: "CONFIRMED"
            });

            const response = await helpers.skill(request.getRequest());

            expect(response).toMatchObject(matcher.getResponse());
        });
    });
});
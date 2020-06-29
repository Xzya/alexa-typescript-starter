import { IntentTypes, Strings } from '../lambda/custom/lib/constants';
import { getLocalePath } from '../lambda/custom/locales/locale';
import { helpers, IntentRequestBuilder, requestFactory, responseBuilder } from './helpers';

helpers.setConfigurationsAndRunPipeline({ resource: getLocalePath() }, locale => {
    describe("BuiltIn Intents", () => {

        const request = requestFactory().createRequest(IntentRequestBuilder, locale);

        it("Help", async () => {

            const response = await helpers.skill(request.addIntent({
                name: IntentTypes.Help
            }).getRequest());

            const matcher = responseBuilder()
                .addResponse(Strings.HELP_MSG)
                .addReprompt(Strings.HELP_MSG)
                .addSimpleCard({ key: Strings.SKILL_NAME }, { key: Strings.HELP_MSG });

            expect(response).toMatchObject(matcher.getResponse());
        });

        it("Stop", async () => {
            const response = await helpers.skill(request.addIntent({
                name: IntentTypes.Stop
            }).getRequest());

            const matcher = responseBuilder()
                .addResponse(Strings.GOODBYE_MSG)
                .addSimpleCard({ key: Strings.SKILL_NAME }, { key: Strings.GOODBYE_MSG });

            expect(response).toMatchObject(matcher.getResponse());
        });

        it("Cancel", async () => {
            const response = await helpers.skill(request.addIntent({
                name: IntentTypes.Cancel
            }).getRequest());

            const matcher = responseBuilder()
                .addResponse(Strings.GOODBYE_MSG)
                .addSimpleCard({ key: Strings.SKILL_NAME }, { key: Strings.GOODBYE_MSG });

            expect(response).toMatchObject(matcher.getResponse());
        });

        it("Fallback", async () => {
            const response = await helpers.skill(request.addIntent({
                name: IntentTypes.Fallback
            }).getRequest());

            const matcher = responseBuilder()
                .addResponse(Strings.ERROR_MSG)
                .addReprompt(Strings.HELP_MSG)

            expect(response).toMatchObject(matcher.getResponse());
        });
    });
});
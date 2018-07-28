import { skill, ssml, RequestWithIntent, RequestWithType } from "./helpers";
import { IntentTypes, LocaleTypes } from "../lambda/custom/lib/constants";

describe("BuiltIn Intents", () => {
    it("Help", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Help,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/You can say hello/gi));
    });

    it("Stop", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Stop,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/Goodbye/gi));
    });

    it("Cancel", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Cancel,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/Goodbye/gi));
    });

    it("Fallback", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Fallback,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/Sorry, I can't understand the command/gi));
    });
});

import { skill, ssml, RequestWithIntent } from "./helpers";
import { LocaleTypes, IntentTypes } from "../lambda/custom/lib/constants";

describe("Hello", () => {
    it("should work", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.HelloWorld,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/Hello world/gi));
    });
});

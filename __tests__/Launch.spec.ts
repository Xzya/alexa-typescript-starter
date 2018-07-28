import { skill, ssml, RequestWithType } from "./helpers";
import { RequestTypes, LocaleTypes } from "../lambda/custom/lib/constants";

describe("Launch", () => {
    it("should work", async () => {
        const response = await skill(RequestWithType({
            type: RequestTypes.Launch,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/Welcome to the Alexa Skills Kit/gi));
    });
});

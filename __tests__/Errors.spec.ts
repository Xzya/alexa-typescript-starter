import { skill, ssml, RequestWithIntent } from "./helpers";
import { IntentTypes, LocaleTypes } from "../lambda/custom/lib/constants";

describe("Errors", () => {
    it("Unknown", async () => {
        const response = await skill(RequestWithIntent({
            name: "Intent" as IntentTypes,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/Sorry, I can't understand the command/gi));
    });
});

import { Resource } from "i18next";
import { Strings, LocaleTypes } from "./constants";

interface IStrings {
    [Strings.SKILL_NAME]: string;
    [Strings.WELCOME_MSG]: string;
    [Strings.GOODBYE_MSG]: string;
    [Strings.HELLO_MSG]: string;
    [Strings.HELP_MSG]: string;
    [Strings.ERROR_MSG]: string;
    [Strings.ERROR_UNEXPECTED_MSG]: string;
}

export const strings: Resource = {
    [LocaleTypes.enUS]: {
        translation: {
            SKILL_NAME: "Hello world",
            WELCOME_MSG: "Welcome to the Alexa Skills Kit, you can say hello!",
            GOODBYE_MSG: "Goodbye!",
            HELLO_MSG: "Hello world!",
            HELP_MSG: "You can say hello to me!",
            ERROR_MSG: "Sorry, I can't understand the command. Please say again.",
            ERROR_UNEXPECTED_MSG: "Sorry, an unexpected error has occured. Please try again later.",
        } as IStrings,
    },
};

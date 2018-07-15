export enum RequestTypes {
    Launch = "LaunchRequest",
    Intent = "IntentRequest",
    SessionEnded = "SessionEndedRequest",
    SystemExceptionEncountered = "System.ExceptionEncountered",
}

export enum IntentTypes {
    Help = "AMAZON.HelpIntent",
    Stop = "AMAZON.StopIntent",
    Cancel = "AMAZON.CancelIntent",
    Fallback = "AMAZON.FallbackIntent",

    HelloWorld = "HelloWorldIntent",
}

export enum ErrorTypes {
    Unknown = "UnknownError",
    Unexpected = "UnexpectedError",
}

export enum Strings {
    SKILL_NAME = "SKILL_NAME",
    WELCOME_MSG = "WELCOME_MSG",
    GOODBYE_MSG = "GOODBYE_MSG",
    HELLO_MSG = "HELLO_MSG",
    HELP_MSG = "HELP_MSG",
    ERROR_MSG = "ERROR_MSG",
    ERROR_UNEXPECTED_MSG = "ERROR_UNEXPECTED_MSG",
}

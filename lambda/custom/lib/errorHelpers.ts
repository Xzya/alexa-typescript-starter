import { ErrorTypes } from './constants';

/**
 * Creates an error with the given message and type.
 * 
 * @param msg 
 * @param type 
 */
function createError(
    msg: string = "Something unexpected happened.",
    type: ErrorTypes = ErrorTypes.Unknown
): Error {
    const error = new Error(msg);
    error.name = type;

    return error;
}

export const errorHelper = {
    createError
}
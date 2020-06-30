import { getDialogState, getIntentName, getRequestType, HandlerInput } from 'ask-sdk-core';
import { DialogState, IntentRequest, Request, services } from 'ask-sdk-model';
import _ = require('lodash');

import { RequestAttributes, SessionAttributes, Slots, SlotValues } from '../interfaces';
import { RequestTypes } from './constants';

/**
 * Checks if the request matches any of the given intents.
 * 
 * @param handlerInput 
 * @param intents 
 */
function isIntent(handlerInput: HandlerInput, ...intents: string[]): boolean {
    if (!skillHelpers.isType(handlerInput, RequestTypes.Intent)) {
        return false
    }
    return _.some(intents, intent => getIntentName(handlerInput.requestEnvelope) === intent);
}

/**
 * Checks if the request matches any of the given types.
 * 
 * @param handlerInput 
 * @param types 
 */
function isType(handlerInput: HandlerInput, ...types: string[]): boolean {
    return _.some(types, type => getRequestType(handlerInput.requestEnvelope) === type);
}

/**
 * Checks if the request matches the given intent and dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 * @param state 
 */
function isIntentWithDialogState(handlerInput: HandlerInput, intent: string, state: DialogState): boolean {
    return skillHelpers.isIntent(handlerInput, intent) && getDialogState(handlerInput.requestEnvelope) === state;
}

/**
 * Gets the request attributes and casts it to our custom RequestAttributes type.
 * 
 * @param handlerInput 
 */
function getRequestAttributes(handlerInput: HandlerInput): RequestAttributes {
    return handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
}

/**
 * Gets the session attributes and casts it to our custom SessionAttributes type.
 * 
 * @param handlerInput 
 */
function getSessionAttributes(handlerInput: HandlerInput): SessionAttributes {
    return handlerInput.attributesManager.getSessionAttributes() as SessionAttributes;
}

/**
 * Get an attribute by name if exists.
 * @param handlerInput the handler input
 * @param name the attribute name
 */
function getSessionAttributesByName(handlerInput: HandlerInput, name: string): SessionAttributes {
    const session = skillHelpers.getSessionAttributes(handlerInput);
    return !_.isNil(session) && _.has(session, name) && session[name];
}

/**
 * Gets the directive service client.
 * 
 * @param handlerInput 
 */
function getDirectiveServiceClient(handlerInput: HandlerInput): services.directive.DirectiveServiceClient {
    return handlerInput.serviceClientFactory!.getDirectiveServiceClient();
}

/**
 * Parses the slot values and returns a new object with additional information,
 * e.g. if the value was matched, or if it is ambiguous etc.
 * 
 * Example:
 *   If we have the following Drink Slot Type:
 *   {
 *     "types": [{
 *       "values": [{
 *           "id": "cocacola",
 *           "name": {
 *             "value": "Coca Cola"
 *           }
 *         },
 *         {
 *           "id": "cocacolazero",
 *           "name": {
 *             "value": "Coca Cola Zero"
 *           }
 *         }
 *       ]
 *     }]
 *   }
 * 
 *   If the user said "Cola", the following value should be generated:
 *   {
 *     "name": "drink", // slot name
 *     "value": "Cola", // what the user said
 *     "isMatch": true, // was successfuly matched with our slot type
 *     "resolved": "Coca Cola", // the first resolved value
 *     "id": "cocacola", // the first resolved id
 *     "isAmbiguous": true, // true because we matched multiple possible values
 *     "values": [{
 *         "name": "Coca Cola",
 *         "id": "cocacola"
 *       },
 *       {
 *         "name": "Coca Cola Zero",
 *         "id": "cocacolazero"
 *       }
 *     ],
 *     "confirmationStatus": "NONE"
 *   }
 * 
 * @param filledSlots 
 */
function getSlotValues(filledSlots: Slots): SlotValues {
    const slotValues: SlotValues = {};

    _.mapValues(filledSlots, slot => {
        switch (true) {
            case _.isNil(slot.resolutions) || _.isEmpty(slot.resolutions):
                slotValues[slot.name] = {
                    name: slot.name,
                    value: slot.value ?? '',
                    isMatch: false,
                    confirmationStatus: slot.confirmationStatus
                }
                break;
            default:
                slot.resolutions?.resolutionsPerAuthority?.map(res => {
                    switch (res.status.code) {
                        case 'ER_SUCCESS_MATCH':
                            slotValues[slot.name] = {
                                name: slot.name,
                                value: slot.value ?? '',
                                isMatch: true,
                                isAmbiguous: res.values.length > 1,
                                values: res.values.map(x => x.value),
                                confirmationStatus: slot.confirmationStatus
                            }
                            break;
                        default:
                            slotValues[slot.name] = {
                                name: slot.name,
                                value: slot.value ?? '',
                                isMatch: false,
                                confirmationStatus: slot.confirmationStatus
                            }
                            break;
                    }
                });
                break;
        }
    });
    return slotValues;
}

/**
 * Get request envelope as T.
 * @param handlerInput the handler input
 */
function getRequestAs<T extends Request>(handlerInput: HandlerInput): T {
    return handlerInput.requestEnvelope.request as T;
}
/**
 * Resets the given slot value by setting it to an empty string.
 * If the intent is using the Dialog Directive, this will cause Alexa
 * to reprompt the user for that slot.
 * 
 * @param request 
 * @param slotName 
 */
function resetSlotValue(request: IntentRequest, slotName: string) {
    if (request.intent.slots) {
        const slot = request.intent.slots[slotName];
        if (slot) {
            slot.value = "";
        }
    }
}

/**
 * Resets all unmatched slot values by setting them to an empty string.
 * If the intent is using the Dialog Directive, this will cause Alexa
 * to reprompt the user for those slots.
 * 
 * @param request 
 */
function resetUnmatchedSlotValues(handlerInput: HandlerInput, slots: SlotValues) {
    if (skillHelpers.isType(handlerInput, RequestTypes.Intent)) {
        const request = skillHelpers.getRequestAs<IntentRequest>(handlerInput);

        // reset invalid slots
        Object.keys(slots).forEach((key) => {
            const slot = slots[key];

            if (slot && !slot.isMatch) {
                skillHelpers.resetSlotValue(request, slot.name);
            }
        });
    }
}

/**
 * Wraps the given string as an interjection.
 * 
 * @param str 
 */
function interject(str: string): string {
    return `<say-as interpret-as="interjection">${str}</say-as>`;
}

/**
 * Selects a random element from the array;
 * 
 * @param arr 
 */
function random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns a VoicePlayer.Speak directive with the given speech. Useful for sending progressive responses.
 * 
 * @param handlerInput 
 * @param speech 
 */
function voicePlayerSpeakDirective(handlerInput: HandlerInput, speech?: string): services.directive.SendDirectiveRequest {
    const requestId = handlerInput.requestEnvelope.request.requestId;

    return {
        directive: {
            type: "VoicePlayer.Speak",
            speech: speech,
        },
        header: {
            requestId,
        },
    };
}

export const skillHelpers = {
    isIntent,
    isType,
    isIntentWithDialogState,
    getRequestAttributes,
    getSessionAttributes,
    getSessionAttributesByName,
    getDirectiveServiceClient,
    getSlotValues,
    getRequestAs,
    resetSlotValue,
    resetUnmatchedSlotValues,
    interject,
    random,
    voicePlayerSpeakDirective
}
import { RequestInterceptor } from "ask-sdk-core";
import { RequestAttributes, Slots } from "../interfaces";
import { RequestTypes } from "../lib/constants";
import { skillHelpers } from '../lib/helpers';

/**
 * Parses and adds the slot values to the RequestAttributes.
 */
export const SlotInterceptor: RequestInterceptor = {
    process(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;

        if (handlerInput.requestEnvelope.request.type === RequestTypes.Intent) {
            attributes.slots = skillHelpers.getSlotValues(handlerInput?.requestEnvelope?.request?.intent?.slots as Slots);
        } else {
            attributes.slots = {};
        }
    },
};

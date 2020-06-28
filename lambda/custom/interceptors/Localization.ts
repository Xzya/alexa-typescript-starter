import { RequestInterceptor, getLocale } from "ask-sdk-core";
import { strings } from "../lib/strings";
import { RequestAttributes } from "../interfaces";
import { skillHelpers } from '../lib/helpers';
import { localeHelpers } from '../lib/localeHelper';
import { LocaleTypes } from '../lib/constants';
import i18next from 'i18next';

/**
 * Adds translation functions to the RequestAttributes.
 */
export const Localization: RequestInterceptor = {
    process(handlerInput) {
        localeHelpers.setResource(getLocale(handlerInput.requestEnvelope) as LocaleTypes, strings);

        const attributes = handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
        attributes.t = function (key: string, ...args: any[]) {
            return i18next.t(key, args)
        };

        attributes.tr = function (key: any, ...args: any[]) {
            const result = i18next.t<string[]>(key, args);

            return skillHelpers.random(result);
        };
    },
};

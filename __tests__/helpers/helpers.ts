import { RequestEnvelope } from 'ask-sdk-model';
import { Resource } from 'i18next';

import { handler } from '../../lambda/custom';
import { LocaleTypes } from '../../lambda/custom/lib/constants';
import { localeHelpers } from '../../lambda/custom/lib/localeHelper';

export type PartialDeep<T> = {
    [P in keyof T]?: PartialDeep<T[P]>;
};

let locales: LocaleTypes[][];

/**
 * 
 * @param config the configuration for tests
 * @param jestDescriber the describe to be used with the configuration
 */
function setConfigurationsAndRunPipeline(config: {
    resource: Resource | string,
    timeout?: number,
    locales?: LocaleTypes[][]
}, jestDescribe: (locale: LocaleTypes) => any) {

    locales = config.locales ?? [[LocaleTypes.enUS]];

    const processTests = describe.each(locales);

    processTests('Testing running for locale %s', (...locales: LocaleTypes[]) => {
        const locale = locales[0];

        beforeAll(() => localeHelpers.setResource(locale, config.resource));

        return jestDescribe(locale);
    }, config.timeout);
}

/**
 * Accepts a partial T object and returns it as T.
 * Useful when you only need a few fields of T but still want to get type
 * completions and to suppress compilation error.
 * 
 * @param value 
 */
function partial<T>(value: PartialDeep<T>): T {
    return (value as any) as T;
}

/**
 * Calls the skill handler with the given RequestEnvelope. Returns a promise
 * with the response.
 * 
 * @param event 
 */
function skill(event: RequestEnvelope) {
    return new Promise((fulfill, reject) => {
        return handler(event, null, (err, res) => {
            if (err) return reject(err);
            return fulfill(res);
        });
    });
}

export const helpers = {
    setConfigurationsAndRunPipeline,
    partial,
    skill
}
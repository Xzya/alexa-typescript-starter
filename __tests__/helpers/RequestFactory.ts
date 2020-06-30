import { RequestEnvelope } from 'ask-sdk-model';

import { LocaleTypes } from '../../lambda/custom/lib/constants';
import { BaseRequestBuilder } from './BaseRequestBuilder';
import { helpers } from './helpers';

class RequestFactory {

    private _request: RequestEnvelope;

    /**
     *
     */
    constructor() {
        this._request = helpers.partial<RequestEnvelope>({
            context: {
                System: {
                    device: {
                        deviceId: 'test',
                    },
                    application: {
                        applicationId: 'application-test'
                    },
                }
            },
            session: {
                application: {
                    applicationId: 'application-test'
                },
                sessionId: 'session-test'
            }
        })
    }

    /**
     * Creates a new request builder T based on BaseRequestBuilder<T>
     * @param factory the instance creator
     * @param locale the locale
     */
    public createRequest<T extends BaseRequestBuilder<T>>(factory: { new(request: RequestEnvelope, locale: LocaleTypes): T }, locale: LocaleTypes): T {
        return new factory(this._request, locale);
    }
}

export const requestFactory = () => new RequestFactory();
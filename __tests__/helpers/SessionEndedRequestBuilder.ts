import { RequestEnvelope, SessionEndedError, SessionEndedReason, SessionEndedRequest } from 'ask-sdk-model';

import { LocaleTypes } from '../../lambda/custom/lib/constants';
import { BaseRequestBuilder } from './BaseRequestBuilder';
import { helpers } from './helpers';

export class SessionEndedRequestBuilder extends BaseRequestBuilder<SessionEndedRequestBuilder>{
    /**
     *
     */
    constructor(request: RequestEnvelope, locale: LocaleTypes) {
        super(request);
        this.request.request = helpers.partial<SessionEndedRequest>({
            type: "SessionEndedRequest",
            locale,

        })
    }

    public addError(error: SessionEndedError): SessionEndedRequestBuilder {
        this.getRequestByType<SessionEndedRequest>().error = error;
        return this;
    }

    public addReason(reason: SessionEndedReason): SessionEndedRequestBuilder {
        this.getRequestByType<SessionEndedRequest>().reason = reason;
        return this;
    }
}
import { interfaces, RequestEnvelope } from 'ask-sdk-model';

import { LocaleTypes } from '../../lambda/custom/lib/constants';
import { BaseRequestBuilder } from './BaseRequestBuilder';
import { helpers } from './helpers';

export class SystemExceptionEncounteredRequestBuilder extends BaseRequestBuilder<SystemExceptionEncounteredRequestBuilder> {

    /**
     *
     */
    constructor(request: RequestEnvelope, locale: LocaleTypes) {
        super(request);
        this.request.request = helpers.partial<interfaces.system.ExceptionEncounteredRequest>({
            type: "System.ExceptionEncountered",
            locale
        })
    }

    public addError(error: interfaces.system.Error): SystemExceptionEncounteredRequestBuilder {
        this.as<interfaces.system.ExceptionEncounteredRequest>().error = error;
        return this;
    }

    public addCause(cause: interfaces.system.ErrorCause): SystemExceptionEncounteredRequestBuilder {
        this.as<interfaces.system.ExceptionEncounteredRequest>().cause = cause;
        return this;
    }
}
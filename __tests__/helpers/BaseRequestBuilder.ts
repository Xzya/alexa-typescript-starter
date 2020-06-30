import { Request, RequestEnvelope } from 'ask-sdk-model';
import _ from 'lodash';

/**
 * Has all actions basis for all requests. 
 */
export class BaseRequestBuilder<T extends BaseRequestBuilder<T>> {

    protected request: RequestEnvelope;

    /**
     *
     */
    constructor(request: RequestEnvelope) {
        if (_.isNil(request)) {
            throw new Error('Request is null or undefined');
        }
        this.request = request;
    }

    /**
     * If the 'attributes' are null a new attribute is saved, whether dont it's merged with pre-existents attributes.
     * @param attribute the attribute
     */
    public addSessionAttributes(attribute: {
        [key: string]: any
    }): T {
        if (_.isNil(attribute)) {
            throw new Error('Attribute is null or undefined');
        }
        switch (true) {
            case _.isNil(this.request.session.attributes):
                this.request.session.attributes = attribute;
                break;
            default:
                this.request.session.attributes = _.merge(this.request.session.attributes, attribute);
                break;
        }

        return this as unknown as T;
    }

    /**
     * Get the request envelope.
     */
    public getRequest(): RequestEnvelope {
        return this.request;
    }

    /**
     * Convert the request to type R.
     */
    protected as<R extends Request>(): R {
        return this.request?.request as unknown as R;
    }
}
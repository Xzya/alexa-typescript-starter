import { Response, ResponseEnvelope, ui } from 'ask-sdk-model';
import i18next from 'i18next';
import _ from 'lodash';

import { helpers } from './';

export class ResponseBuilder {

    private _response: ResponseEnvelope;
    /**
     *
     */
    constructor() {
        this._response = helpers.partial<ResponseEnvelope>({
            response: helpers.partial<Response>({})
        })
    }

    public addSessionAttributes(attribute: { [key: string]: any }): ResponseBuilder {
        switch (true) {
            case _.isNil(this._response.sessionAttributes):
                this._response.sessionAttributes = attribute;
                break;
            default:
                this._response.sessionAttributes = _.merge(this._response.sessionAttributes, attribute);
                break;
        }
        return this;
    }

    /**
     * Add ssml response in the response envelope, this uses i18n by default to get the responses
     * @param key the key
     * @param args the args
     */
    public addResponse(key: string, ...args: any[]): ResponseBuilder {
        if (!i18next.isInitialized) {
            throw new Error('i18next its not initialized!')
        }

        const response = i18next.t(key, args);

        this._response.response.outputSpeech = helpers.partial<ui.OutputSpeech>({
            ssml: expect.stringMatching(response)
        })

        return this;
    }

    /**
     * Add ssml reprompt in the response envelope, this uses i18n by default to get the responses
     * @param key the key
     * @param args the args
     */
    public addReprompt(key: string, ...args: any[]): ResponseBuilder {
        const response = i18next.t(key, args);

        this._response.response.reprompt = helpers.partial<ui.Reprompt>({
            outputSpeech: {
                ssml: expect.stringMatching(response)
            }
        })

        return this;
    }

    public addSimpleCard(title: { key: string, args?: any[] }, content: { key: string, args?: any[] }): ResponseBuilder {
        this._response.response.card = helpers.partial<ui.Card>({
            type: "Simple",
            content: i18next.t(content.key, content.args),
            title: i18next.t(title.key, title.args)
        })

        return this;
    }

    public shouldEndSession(endSession: boolean): ResponseBuilder {
        this._response.response.shouldEndSession = endSession;
        return this;
    }

    public getResponse(): ResponseEnvelope {
        return this._response;
    }
}

export const responseBuilder = () => new ResponseBuilder();
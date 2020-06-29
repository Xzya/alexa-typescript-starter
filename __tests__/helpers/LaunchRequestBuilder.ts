import { LaunchRequest, RequestEnvelope, Task } from 'ask-sdk-model';

import { LocaleTypes } from '../../lambda/custom/lib/constants';
import { BaseRequestBuilder } from './BaseRequestBuilder';
import { helpers } from './helpers';

export class LaunchRequestBuilder extends BaseRequestBuilder<LaunchRequestBuilder> {
    /**
     *
     */
    constructor(request: RequestEnvelope, locale: LocaleTypes) {
        super(request);
        this.request.request = helpers.partial<LaunchRequest>({
            type: "LaunchRequest",
            locale
        })
    }

    public addTask(task: Task): LaunchRequestBuilder {
        this.as<LaunchRequest>().task = task;
        return this;
    }
}
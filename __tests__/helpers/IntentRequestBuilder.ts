import {
    Intent,
    IntentConfirmationStatus,
    IntentRequest,
    RequestEnvelope,
    Slot,
    SlotConfirmationStatus,
    slu,
} from 'ask-sdk-model';
import _ from 'lodash';

import { LocaleTypes } from '../../lambda/custom/lib/constants';
import { BaseRequestBuilder } from './BaseRequestBuilder';
import { helpers } from './helpers';

export class IntentRequestBuilder extends BaseRequestBuilder<IntentRequestBuilder>{

    /**
     *
     */
    constructor(request: RequestEnvelope, locale: LocaleTypes) {
        super(request);
        this.request.request = helpers.partial<IntentRequest>({
            type: "IntentRequest",
            locale
        })
    }

    public addIntent(intent: {
        name: string,
        confirmationStatus?: IntentConfirmationStatus
    }): IntentRequestBuilder {
        this.as<IntentRequest>().intent = helpers.partial<Intent>({
            name: intent.name,
            confirmationStatus: intent.confirmationStatus ?? "NONE"
        });
        return this;
    }

    public addSlots(slot: {
        [key: string]: {
            value?: string;
            confirmationStatus?: SlotConfirmationStatus;
            resolutions?: {
                status: slu.entityresolution.StatusCode,
                values?: {
                    name: string;
                    id?: string;
                }[];
            }[]
        }
    }): IntentRequestBuilder {
        _.mapKeys(slot, (val, key) => {
            this.as<IntentRequest>().intent.slots[key] = helpers.partial<Slot>({
                confirmationStatus: val.confirmationStatus ?? 'NONE',
                name: key,
                value: val.value,
                resolutions: _.isNil(val.resolutions) || _.isEmpty(val.resolutions) ? undefined :
                    helpers.partial<slu.entityresolution.Resolutions>({
                        resolutionsPerAuthority: _.map(val.resolutions, res => {
                            return helpers.partial<slu.entityresolution.Resolution>({
                                status: {
                                    code: res.status
                                },
                                values: _.map(res.values, v => {
                                    return {
                                        value: {
                                            name: v.name,
                                            id: v.id
                                        }
                                    }
                                })
                            })
                        })
                    })
            })
        })
        return this;
    }
}
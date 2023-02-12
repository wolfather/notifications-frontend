import { UserEntity } from '../../src/entity/user.entity';
import { LogFactory } from '../../src/factory/log.factory'
import * as uuid from 'uuid'
import { CATEGORIES } from '../../src/enum/categories';
import { NOTIFICATIONS } from '../../src/enum/notifications';

import {} from '../../src/enum/categories'
const stub_user: Partial<UserEntity> = {
    id: uuid.v4(),
    name: 'Valid Name',
    email: `valid@mail.com`,
    phone_number: `+55 11 986 548 282`,
    subscribed: [],
    channels: [],
};

describe('LogFactory', () => {

    
    it('should accept an empty message to create the log', () => {
        let _factoryInstance = LogFactory(
            stub_user, 
            NOTIFICATIONS[0].value,
            CATEGORIES[0].value,
            ''
        );

        expect(_factoryInstance.message).toEqual('');
        expect(_factoryInstance.name).not.toBe('');
        expect(_factoryInstance.email).toBe(stub_user.email);
        expect(_factoryInstance.phone_number).not.toBe('');
        expect(_factoryInstance.email).toBe(stub_user.email);
        expect(_factoryInstance.channel).toBe('sms')
    })
})
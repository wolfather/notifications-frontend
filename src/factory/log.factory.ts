import { LogEntity } from './../entity/log.entity';
import { UserEntity } from './../entity/user.entity';
import * as uuid from 'uuid';

export const LogFactory = (
    userData: Partial<UserEntity>, 
    notificationValue: string, 
    categoryValue: string,
    message: string
): LogEntity => {
    const userLogData: LogEntity = {
        id: uuid.v4(),
        name: userData?.name || '',
        email: userData?.email || '',
        phone_number: userData?.phone_number || '',
        subscribed: categoryValue,
        channel: notificationValue,
        message
    };

    return userLogData;
}
import { LogEntity } from './../entity/log.entity';
import { UserEntity } from './../entity/user.entity';

export const LogFactory = (
    userData: Partial<UserEntity>, 
    notificationValue: string, 
    categoryValue: string,
    message: string
): LogEntity => {
    const {id, name, email, phone_number} = userData;
    
    const userLogData: LogEntity = {
        date: new Date(),
        id: id || '',
        name: name || '',
        email: email || '',
        phone_number: phone_number || '',
        subscribed: categoryValue,
        channel: notificationValue,
        message
    };

    return userLogData;
}
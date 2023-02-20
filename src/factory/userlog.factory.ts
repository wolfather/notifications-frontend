import { LogEntity } from '../entity/log.entity';
import { UserEntity } from '../entity/user.entity';

export const userLogFactory = (
    userData: Partial<UserEntity>, 
    categoryValue: string,
    message: string
): LogEntity => {
    const {id, name, email, phone_number} = userData;
    
    const userLogData: LogEntity = {
        date: new Date().getTime(),
        id: id || '',
        name: name || '',
        email: email || '',
        phone_number: phone_number || '',
        subscribed: categoryValue,
        message
    };

    return userLogData;
}
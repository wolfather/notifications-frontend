import { UserEntity } from './user.entity';

export interface NotificationEntity {
    subscription: string;
    channel: string;
    user: Partial<UserEntity>;
}

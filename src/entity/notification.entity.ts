import { UserEntity } from './user.entity';

export interface NotificationEntity {
    category: string;
    user: Partial<UserEntity>;
}

import { UserEntity } from "./user.entity"

export interface LogEntity {
    user: UserEntity;
    date?: Date;    
}
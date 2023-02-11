import { createContext, useState } from "react";

import * as uuid from 'uuid'
import { UserEntity } from "../entity/user.entity";


export interface UserContextProp {
    user: UserEntity,
    setUser: Function
}

export const mock_user: UserEntity = {
    id: uuid.v4(),
    name: 'John Doe',
    email: `john_doe@somemail.com`,
    phone_number: `+55 11 986 548 282`,
    subscribed: [],
    channels: [],
}

export const UserContext = createContext<UserContextProp|null>(null)

export const UserProvider = ({children}: any) => {
    const [user, setUser] = useState<UserEntity>(mock_user);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
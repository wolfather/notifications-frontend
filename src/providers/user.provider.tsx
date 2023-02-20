import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import * as uuid from 'uuid'
import { UserEntity } from "../entity/user.entity";

export interface UserContextProp {
    users: Partial<UserEntity>[];
    setUsers: Dispatch<SetStateAction<Partial<UserEntity>[]>>;
    userSelected: Partial<UserEntity>;
    setUserSelected: Dispatch<SetStateAction<Partial<UserEntity>>>
}

const mock_users: Partial<UserEntity>[] = [
    {
        id: uuid.v4(),
        name: 'John Doe',
        email: `john_doe@somemail.com`,
        phone_number: `+55 11 986 548 282`,
        subscribed: [],
        channels: [],
    },
    {
        id: uuid.v4(),
        name: 'Mary Harry',
        email: `mary_harry@somemail.com`,
        phone_number: `+55 11 986 548 281`,
        subscribed: [],
        channels: [],
    },
    {
        id: uuid.v4(),
        name: 'Larry Barry',
        email: `larry_barry@somemail.com`,
        phone_number: `+55 11 986 548 280`,
        subscribed: [],
        channels: [],
    }
];

export const UserContext = createContext<UserContextProp>({
    users: [],
    setUsers: () => {},
    userSelected: {},
    setUserSelected: () => {}
});

type props = {
    children: ReactNode
}

export const UserProvider = ({children}: props) => {
    const [users, setUsers] = useState<Partial<UserEntity>[]>(mock_users);
    const [userSelected, setUserSelected] = useState<Partial<UserEntity>>({});

    return (
        <UserContext.Provider value={{
            users, setUsers, userSelected, setUserSelected
        }}>
            {children}
        </UserContext.Provider>
    )
}

import { FC, useContext, useEffect, useState } from "react";
import { UserContext, UserContextProp } from "../../providers/user.provider";
import { UserEntity } from "../../entity/user.entity";
import { Title } from "../Title";

export const Navbar: FC<{}> = () => {

    const {users, userSelected, setUserSelected} = useContext<UserContextProp>(UserContext);
    const [active, setActive] = useState('');

    useEffect(() => {
        if(userSelected.id === undefined) {
            setActive('');
        }

        return () => {}
    }, [userSelected])

    const btnUser = `text-black p-2 rounded mx-1 inline-block cursor-pointer `;
    const btnUserActive = 'bg-gray-800 text-white cursor-default';
    const btnUserInactive = 'bg-gray-200';

    const toggleUserActive = (user: Partial<UserEntity>) => {
        setUserSelected(user);
        setActive(user.id || '')
    };

    return (<div className="container sticky top-0 bg-blue-200 shadow-md z-50 w-full px-5 py-2 flex justify-between items-center mb-9">
        <Title />

        <nav className="clear-both">
            {users.map(user => {
                const userActive = `${btnUser} ${active === user.id ? btnUserActive : btnUserInactive}`;

                return <div 
                    className={userActive}
                    key={user.id}
                    onClick={() => toggleUserActive(user)}
                    role="link">{user.name}
                </div>
            })}
        </nav>
    </div>)
}
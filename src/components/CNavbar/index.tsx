import { FC, useContext, useEffect, useState } from "react";
import { UserContext, UserContextProp } from "../../providers/user.provider";
import { UserEntity } from "../../entity/user.entity";
import { CTitle } from "../CTitle";
import { styles } from "./styles";

export const CNavbar: FC<{}> = () => {
    const {users, userSelected, setUserSelected} = useContext<UserContextProp>(UserContext);
    const [active, setActive] = useState('');

    useEffect(() => {
        if(userSelected.id === undefined) {
            setActive('');
        }

        return () => {}
    }, [userSelected])

    const toggleUserActive = (user: Partial<UserEntity>) => {
        setUserSelected(user);
        setActive(user.id || '')
    };

    return (<div className={styles.container}>
        <CTitle />

        <nav className={styles.nav}>
            {users.map(user => {
                const userActive = `${styles.btnUser} ${active === user.id ? styles.btnUserActive : styles.btnUserInactive}`;

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
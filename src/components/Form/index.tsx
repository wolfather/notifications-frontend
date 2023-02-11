import { FC, FormEvent, useContext, useEffect, useMemo, useRef, useState } from "react";

import { CButton } from "../Button";
import { CTextarea } from "../Textarea";
import { CSelect } from "../CSelect";
import { CATEGORIES, NOTIFICATIONS } from "../../enum/categories";
import { UserEntity } from "../../entity/user.entity";
import { UserContext, UserContextProp } from "../../providers/user.provider";


export const CForm: FC<{}> = () => {
    const [message, setMessage] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [notificationValue, setNotificationValue] = useState<string>('');

    const MAX_TEXTAREA_VALUES = Object.freeze(100);
    
    const {user, setUser} = useContext(UserContext);
    
    const validateForm = useMemo(() => {
        return (
            categoryValue !== '' && 
            notificationValue !== '' &&
            message.length >= (MAX_TEXTAREA_VALUES / 10)
        )
    }, [categoryValue, notificationValue, message])

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(validateForm) {
            const _channels = [...user.channels, notificationValue]
            const _subscribed = [...user.subscribed, categoryValue]
            setUser((prev: any) => ({...prev, 
                _channels, _subscribed
            }))

            
            setMessage('')
            setCategoryValue('')
            setNotificationValue('')
            
            console.log('Submitted!')
        }
    }

    return (<>
        <p>{categoryValue} - {notificationValue}</p>
        <form onSubmit={(e) => submitForm(e)}>
            <CSelect 
                selectType="category" 
                optionsData={CATEGORIES}
                setSelectValue={setCategoryValue}
                selectValue={categoryValue} />
            <CSelect 
                selectType="notification" 
                optionsData={NOTIFICATIONS}
                setSelectValue={setNotificationValue}
                selectValue={notificationValue} />
            <CTextarea 
                charLimit={MAX_TEXTAREA_VALUES} 
                setTextareaMessage={setMessage} 
                textareaMessage={message} />

            <CButton isDisabled={!validateForm} />
        </form>
    </>)
}
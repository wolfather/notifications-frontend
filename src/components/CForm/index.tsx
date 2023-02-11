import { FC, FormEvent, useCallback, useContext, useMemo, useState } from "react";

import { CButton } from "../CButton";
import { CTextarea } from "../CTextarea";
import { CSelect } from "../CSelect";
import { CATEGORIES, NOTIFICATIONS } from "../../enum/categories";
import { UserContext, UserContextProp } from "../../providers/user.provider";
import { AppLoggerContext, LoggerContextProp } from "../../providers/applogger.provider";
import { LogEntity } from "../../entity/log.entity";
import { LogFactory } from "../../factory/log.factory";


export const CForm: FC<{}> = () => {
    const [message, setMessage] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [notificationValue, setNotificationValue] = useState<string>('');

    const MAX_TEXTAREA_VALUES = Object.freeze(100);
    
    const {user, setUser} = useContext<UserContextProp>(UserContext);
    const {setLogs} = useContext<LoggerContextProp>(AppLoggerContext);
    
    const validateForm = useMemo(() => {
        return (
            categoryValue !== '' && 
            notificationValue !== '' &&
            message.length >= (MAX_TEXTAREA_VALUES / 10)
        )
    }, [categoryValue, notificationValue, message]);

    const resetForm = () => {
        setMessage('')
        setCategoryValue('')
        setNotificationValue('')
    };

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const _channels = new Set(user.channels)
        const _subscribed = new Set(user.subscribed)

        if(validateForm) {
            _channels.add(notificationValue)
            _subscribed.add(categoryValue)

            setUser(prev => ({
                ...prev, 
                channels : Array.from(_channels),
                subscribed: Array.from(_subscribed)
            }));

            const userLogData = LogFactory(
                user, 
                notificationValue, 
                categoryValue,
                message
            );

            setLogs(prev => [...prev, userLogData])
            
            resetForm();
            
            console.log('Submitted!')
        }
    };

    return (<>
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
                textareaMessage={message}
                rows={5}
                cols={50} />

            <CButton label="Submit" isDisabled={!validateForm} />
        </form>
    </>)
}
import { FC, FormEvent, useCallback, useContext, useMemo, useState } from "react";

import { CButton } from "../CButton";
import { CTextarea } from "../CTextarea";
import { CSelect } from "../CSelect";
import { CATEGORIES } from "../../enum/categories";
import { NOTIFICATIONS } from '../../enum/notifications';
import { UserContext, UserContextProp } from "../../providers/user.provider";
import { AppLoggerContext, LoggerContextProp } from "../../providers/applogger.provider";
import { LogFactory } from "../../factory/log.factory";

export const CForm: FC<{}> = () => {
    const [message, setMessage] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [notificationValue, setNotificationValue] = useState<string>('');

    const MAX_TEXTAREA_VALUES = Object.freeze(100);
    
    const {userSelected, setUserSelected} = useContext<UserContextProp>(UserContext);
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

    const submitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const _channels = new Set(userSelected.channels)
        const _subscribed = new Set(userSelected.subscribed)

        if(validateForm && userSelected.id) {
            _channels.add(notificationValue)
            _subscribed.add(categoryValue)

            setUserSelected(prev => ({
                ...prev, 
                channels : Array.from(_channels),
                subscribed: Array.from(_subscribed)
            }));

            const userLogData = LogFactory(
                userSelected, 
                notificationValue, 
                categoryValue,
                message
            );

            setLogs(prev => [...prev, userLogData]);
            setUserSelected({});
            
            resetForm();
            
            console.log('Submitted!')
        }
    }, [userSelected, notificationValue, categoryValue, message]);

    return (<section className="container">
        <form onSubmit={(e) => submitForm(e)}>
            <div className="container mb-2">
                <CSelect 
                    selectType="category" 
                    optionsData={CATEGORIES}
                    setSelectValue={setCategoryValue}
                    selectValue={categoryValue} />
            </div>
            <div className="container mb-2">
                <CSelect 
                    selectType="notification" 
                    optionsData={NOTIFICATIONS}
                    setSelectValue={setNotificationValue}
                    selectValue={notificationValue} />
            </div>
            <div className="container mb-2">
                <CTextarea 
                    charLimit={MAX_TEXTAREA_VALUES} 
                    setTextareaMessage={setMessage} 
                    textareaMessage={message}
                    rows={5}
                    cols={50} />
            </div>

            <div className="container clear-both flex items-stretch">
                <CButton 
                    label="Submit" 
                    buttonType="submit"
                    isDisabled={!validateForm} />
            </div>
        </form>
    </section>)
}
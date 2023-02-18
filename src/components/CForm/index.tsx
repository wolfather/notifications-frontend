import { FC, FormEvent, useMemo, useState } from "react";

import { CButton } from "../CButton";
import { CTextarea } from "../CTextarea";
import { CSelect } from "../CSelect";
import { CATEGORIES } from "../../enum/categories";
import { NOTIFICATIONS } from '../../enum/notifications';
import { styles } from "./styles";
import { useSubmit } from "../../hooks/usesubmit";

export const CForm: FC<{}> = () => {
    const [message, setMessage] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [notificationValue, setNotificationValue] = useState<string>('');

    const MAX_TEXTAREA_VALUES = Object.freeze(100);
    
    const { userSelected, onSubmitForm } = useSubmit({
        notificationValue, categoryValue, message
    });
    const validateForm = useMemo(() => {
        return (
            categoryValue !== '' && 
            notificationValue !== '' &&
            userSelected.name !== '' &&
            message.length >= 1//(MAX_TEXTAREA_VALUES / 10)
        )
    }, [categoryValue, notificationValue, userSelected, message]);

    const resetValues = () => {
        setMessage('');
        setCategoryValue('');
        setNotificationValue('');
    };

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(validateForm && userSelected.id) {
            onSubmitForm();
            
            resetValues();
        }
    };

    return (
        <section className={styles.container}>
            <form onSubmit={(e) => submitForm(e)}>
                <div className={styles.fields}>
                    <CSelect 
                        selectType='category' 
                        optionsData={CATEGORIES}
                        setSelectValue={setCategoryValue}
                        selectValue={categoryValue} />
                </div>
                <div className={styles.fields}>
                    <CSelect 
                        selectType='notification' 
                        optionsData={NOTIFICATIONS}
                        setSelectValue={setNotificationValue}
                        selectValue={notificationValue} />
                </div>
                <div className={styles.fields}>
                    <CTextarea 
                        charLimit={MAX_TEXTAREA_VALUES} 
                        setTextareaMessage={setMessage} 
                        textareaMessage={message}
                        rows={5}
                        cols={50} />
                </div>

                <div className={styles.buttonContainer}>
                    <CButton 
                        label='Submit' 
                        buttonType='submit'
                        isDisabled={!validateForm} />
                </div>
            </form>
        </section>
    );
}
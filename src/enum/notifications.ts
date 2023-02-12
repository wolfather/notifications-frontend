import { SelectEntity } from "../entity/select.entity";

export const NOTIFICATIONS: SelectEntity[] = [
    {label: 'SMS', value: 'sms'},
    {label: 'E-Mail', value: 'email'},
    {label: 'Push Notification', value: 'push_notification'}
]
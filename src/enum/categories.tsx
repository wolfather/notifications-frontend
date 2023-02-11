import { SelectEntity } from "../entity/select.entity";

export const CATEGORIES: SelectEntity[] = [
    {label: 'Sports', value: 'sports'},
    {label: 'Finance', value: 'finance'},
    {label: 'Movies', value: 'movies'},
]

export const NOTIFICATIONS: SelectEntity[] = [
    {label: 'SMS', value: 'sms'},
    {label: 'E-Mail', value: 'email'},
    {label: 'Push Notification', value: 'push_notification'}
]
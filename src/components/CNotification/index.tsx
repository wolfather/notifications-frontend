import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { NotificationEntity } from "../../entity/notification.entity";
import { CNotification } from "./CNotification.component";

import { NotificationContext, NotificationProvider, NotificationContextProps } from './CNotification.provider';

export { NotificationContext, NotificationProvider };
export type { NotificationContextProps };


import { NotificationProvider } from "../components/CNotification"
import { AppLoggerProvider } from "./applogger.provider"
import { UserProvider } from "./user.provider"


export const Providers = ({children}: any) => {

    return (
        <AppLoggerProvider>
            <NotificationProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </NotificationProvider>
        </AppLoggerProvider>
    )
}
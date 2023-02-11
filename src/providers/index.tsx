import { AppLoggerProvider } from "./applogger.provider"
import { UserProvider } from "./user.provider"


export const Providers = ({children}: any) => {

    return (
        <AppLoggerProvider>
            <UserProvider>
            {children}
            </UserProvider>
        </AppLoggerProvider>
    )
}
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { LogEntity } from '../entity/log.entity';

export interface LoggerContextProp {
    logs: LogEntity[];
    setLogs: Dispatch<SetStateAction<LogEntity[]>>;
}

export const AppLoggerContext = createContext<LoggerContextProp>({
    logs: [], 
    setLogs: () => {}
})

export const AppLoggerProvider = ({children}: any) => {
    const [logs, setLogs] = useState<LogEntity[]>([]);

    return <AppLoggerContext.Provider value={{logs, setLogs}}>
        {children}
    </AppLoggerContext.Provider>
}
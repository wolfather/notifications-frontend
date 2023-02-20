import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { LogEntity } from '../entity/log.entity';

export interface LoggerContextProp {
    logs: LogEntity[];
    setLogs: Dispatch<SetStateAction<LogEntity[]>>;
}

export const AppLoggerContext = createContext<LoggerContextProp>({
    logs: [], 
    setLogs: () => {},
})

type props = {
    children: ReactNode
}

export const AppLoggerProvider = ({children}: props) => {
    const [logs, setLogs] = useState<LogEntity[]>([]);

    return <AppLoggerContext.Provider value={{logs, setLogs}}>
        {children}
    </AppLoggerContext.Provider>
}
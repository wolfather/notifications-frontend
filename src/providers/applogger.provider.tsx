import { createContext } from "react";
import { LogEntity } from "../entity/log.entity";

type LoggerContext = {
    viewLogs: () => LogEntity[],
    appendLog: (param: LogEntity) => void
}

export const AppLoggerContext = createContext<LoggerContext|null>(null)

export const AppLoggerProvider = ({children}: any) => {
    const logs: LogEntity[] = [];

    const appendLog = (params: LogEntity): void => {
        logs.push({...params, date: new Date()})
    };

    const viewLogs = (): LogEntity[] => logs;


    return <AppLoggerContext.Provider value={{viewLogs, appendLog}}>
        {children}
    </AppLoggerContext.Provider>
}
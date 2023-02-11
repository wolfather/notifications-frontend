import { FC, useContext } from "react";
import { LoggerContextProp, AppLoggerContext } from "../../providers/applogger.provider";

export const Log: FC<{}> = () => {
    const { logs } = useContext<LoggerContextProp>(AppLoggerContext);
    
    return (<>{
        logs.length ? 
        logs.map(log => (
            <div key={log.id}>
                <p>{log.name}</p>
                <p>{log.channel}</p>
                <p>{log.subscribed}</p>
                <p>{log.message}</p>
            </div>
        )) : 
        <></>}
    </>)
}

import { FC, useContext } from "react";
import { LoggerContextProp, AppLoggerContext } from "../../providers/applogger.provider";

export const Log: FC<{}> = () => {
    const { logs } = useContext<LoggerContextProp>(AppLoggerContext);
    
    const isCollapsed = logs.length ? 'non-collapsed' : 'collapsed'

    return (<aside className="bg-indigo-200 py-2 px-2">{
        logs.length ? 
        logs.map(log => (
            <div key={log.id} 
                className="h-2 min-h-full my-20 py-4 px-4 max-w-sm mx-auto bg-white shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <p className="text-lg text-black font-semibold">{log.name}</p>
                <div className="text-slate-500 font-medium">
                    <p>{log.channel}</p>
                    <p>{log.subscribed}</p>
                    <p>{log.message}</p>
                </div>
            </div>
        )) : 
        <></>}
    </aside>)
}

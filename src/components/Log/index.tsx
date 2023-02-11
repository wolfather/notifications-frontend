import { FC, useContext } from "react";
import { LoggerContextProp, AppLoggerContext } from "../../providers/applogger.provider";

export const Log: FC<{}> = () => {
    const { logs } = useContext<LoggerContextProp>(AppLoggerContext);
    
    const isCollapsed = logs.length ? 'non-collapsed' : 'collapsed'

    return (<aside className="bg-slate-600 ">{
        logs.length ? 
        logs.map(log => (
            <div key={log.id} className="py-4 px-4 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
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

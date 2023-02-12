import { FC, useContext } from "react";
import { LoggerContextProp, AppLoggerContext } from "../../providers/applogger.provider";

export const Log: FC<{}> = () => {
    const { logs } = useContext<LoggerContextProp>(AppLoggerContext);
    
    return (<aside className="bg-indigo-200 py-2 overflow-auto">{
        logs.length ? 
        logs.map(log => (
            <div key={log.id} 
                className="h-32 min-h-0 my-6 mx-4 py-4 px-4 max-w-sm bg-white rounded shadow-lg space-y-1 sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <p className="text-md text-black font-semibold">{log.name}</p>
                <div className="text-slate-500 font-medium leading-3">
                    <dl className="mb-2">
                        <dt className="text-black text-sm">channel</dt>
                        <dd className="text-xs">{log.channel}</dd>
                    </dl>
                    <dl className="mb-2">
                        <dt className="text-black text-sm">subscription:</dt>
                        <dd className="text-xs">{log.subscribed}</dd>
                    </dl>
                    <dt>
                        <dt className="text-black text-sm">Message:</dt>
                        <dd className="text-xs">{log.message}</dd>
                    </dt>
                </div>
            </div>
        )) : 
        <></>}
    </aside>)
}

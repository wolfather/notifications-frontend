import { useEffect, useState } from "react";
import { LogEntity } from "../entity/log.entity";
import * as uuid from 'uuid';

export const useLogFile = (logs: LogEntity[]) => {
    const [ logUrl, setLogUrl ] = useState<string>('');
    const [ logFileName, setLogFileName ] = useState<string>('');

    useEffect(() => {
        if(logs.length) {
            const blobFile = new Blob(
                [JSON.stringify(logs, null, 2)], 
                {type: 'application/json'}
            );

            setLogUrl(URL.createObjectURL(blobFile));
            setLogFileName(`log-${uuid.v4()}.json`);
        }

        () => {}
    }, [logs]);

    return { logUrl, logFileName };
}
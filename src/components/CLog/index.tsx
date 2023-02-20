import { FC, useContext } from "react";
import { LoggerContextProp, AppLoggerContext } from "../../providers/applogger.provider";
import { BoxColor } from "../CBoxColor";
import { styles } from "./styles";
import { useLogFile } from "../../hooks/uselogfile";
import { CDownloadButtonComponent } from "../CDownloadbutton/CDownloadbutton.compoent";

export const CLog: FC<{}> = () => {
    const { logs } = useContext<LoggerContextProp>(AppLoggerContext);
    const { logUrl, logFileName } = useLogFile(logs);

    return (<aside className={styles.container}>{
        logs.length ? 
        <section>
            <h2 className={styles.title}>Logs</h2>
            <CDownloadButtonComponent 
                url={logUrl}
                fileName={logFileName} />
            {logs.map(log => (
                <BoxColor 
                    key={String(log.date)} 
                    className={styles.boxColor}>
                    <p className={styles.boxColorName}>{log.name}</p>
                    <div className={styles.boxColorData}>
                        <dl>
                            <dt className={styles.boxColorDataTitle}>subscription:</dt>
                            <dd className={styles.boxColorDataDefinition}>{log.subscribed}</dd>

                            <dt className={styles.boxColorDataTitle}>Message:</dt>
                            <dd className={styles.boxColorDataDefinition}>{log.message}</dd>
                        </dl>
                    </div>
                </BoxColor>
            ))}
        </section> : 
        <></>}
    </aside>)
}

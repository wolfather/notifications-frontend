import { FC, useContext } from "react";
import { LoggerContextProp, AppLoggerContext } from "../../providers/applogger.provider";
import { BoxColor } from "../CBoxColor";
import { styles } from "./styles";

export const CLog: FC<{}> = () => {
    const { logs } = useContext<LoggerContextProp>(AppLoggerContext);
    
    return (<aside className={styles.container}>{
        logs.length ? 
        <section>
            <h2 className={styles.title}>Logs</h2>
            {logs.map(log => (
                <BoxColor 
                    channel={log.channel}
                    key={String(log.date)} 
                    className={styles.boxColor}>
                    <p className={styles.boxColorName}>{log.name}</p>
                    <div className={styles.boxColorData}>
                        <dl>
                            <dt className={styles.boxColorDataTitle}>channel</dt>
                            <dd className={styles.boxColorDataDefinition}>{log.channel}</dd>

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

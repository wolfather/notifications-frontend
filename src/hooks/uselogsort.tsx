import { LogEntity } from "entity/log.entity"

export const useLogSort = (log: LogEntity[]) => {
    const logSorted = (logs: LogEntity[]) => {
        const sorted: LogEntity[] = logs.sort((a, b) => b.date - a.date)

        return sorted;
    };

    return logSorted;
}

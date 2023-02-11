import {
    FC,
    SelectHTMLAttributes, 
    ForwardRefRenderFunction, 
    forwardRef, 
    useImperativeHandle, 
    useState,
} from 'react';
import { SelectEntity } from '../../entity/select.entity';

type props = SelectHTMLAttributes<HTMLSelectElement> & {
    selectType: 'category' | 'notification',
    optionsData: SelectEntity[],
    selectValue: string,
    setSelectValue: Function,
}

export const CSelect: FC<props> = ({
    optionsData, selectType, selectValue, setSelectValue, ...rest
}: props) => {

    return(
        <select {...rest}
            onChange={(e) => setSelectValue(e.target.value)}
            value={selectValue}>
            <option value=''>Choose one {selectType}</option>
            {optionsData.map(optionData => (
                <option 
                    key={optionData.value}
                    label={optionData.label}
                    value={optionData.value}>
                </option>
            ))}
        </select>
    )
}

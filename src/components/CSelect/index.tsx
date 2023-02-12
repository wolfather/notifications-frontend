import {
    FC,
    SelectHTMLAttributes, 
    ForwardRefRenderFunction, 
    forwardRef, 
    useImperativeHandle, 
    useState,
    memo,
} from 'react';
import { SelectEntity } from '../../entity/select.entity';

type props = SelectHTMLAttributes<HTMLSelectElement> & {
    selectType: 'category' | 'notification',
    optionsData: SelectEntity[],
    selectValue: string,
    setSelectValue: Function,
}

export const _CSelect: FC<props> = ({
    optionsData, selectType, selectValue, setSelectValue, ...rest
}: props) => {

    return(
        <select {...rest}
            className="w-full border border-teal-900 bg-white"
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

export const CSelect = memo(_CSelect)
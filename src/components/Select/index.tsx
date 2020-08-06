import React, { SelectHTMLAttributes } from 'react';

import './style.css';
import { prependOnceListener } from 'process';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<{
        value: string;
        texto: string;
    }>;
}

const Select:React.FunctionComponent<SelectProps> = ({ label, name, options, ...rest }) => {
    return(
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(option => {
                    return(<option key={option.value} value={option.value}>{option.texto}</option>);
                })}
            </select>
        </div>
    );
}

export default Select;
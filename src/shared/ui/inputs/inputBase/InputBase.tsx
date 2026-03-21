import React, { type FC } from 'react';
import type { BaseInputProps } from '~~>shared/model/input.types';

const InputBase: FC<BaseInputProps> = ({ leftIcon, rightIcon, ...props }) => {
    return (
        <div>
            <input type="text" name="" id="" {...props}/>
        </div>
    );
};

export default InputBase;
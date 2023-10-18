import { useState, useEffect } from "react";
import { Checkbox } from "./Checkbox";

const BaseCheckbox = () => {
    const [states, setStates] = useState({
        checkbox1: false,
        checkbox2: true,
        checkbox3: 'minus',
    });

    const handleToggle = (name, newValue) => {
        setStates(prevStates => ({ ...prevStates, [name]: newValue }));
    };

    return (
        <div className="w-[415px] h-[177px] relative rounded-[5px] border border-purple-500 p-4 grid grid-cols-2 gap-4">
            {/* Default State */}
            <div className="flex items-center">
                <Checkbox isChecked={states.checkbox1} onChange={(value) => handleToggle('checkbox1', value)} />
                <span className="ml-4">Unchecked</span>
            </div>
            <div className="flex items-center">
                <Checkbox isChecked={states.checkbox2} onChange={(value) => handleToggle('checkbox2', value)} />
                <span className="ml-4">Checked</span>
            </div>
            <div className="flex items-center">
                <Checkbox isChecked={states.checkbox3} onChange={(value) => handleToggle('checkbox3', value)} variant={['checked', 'minus']} />
                <span className="ml-4">Minus</span>
            </div>

            {/* Disabled State */}
            <div className="flex items-center">
                <Checkbox isChecked={false} isDisabled={true} />
                <span className="ml-4 text-gray-500">Disabled Unchecked</span>
            </div>
            <div className="flex items-center">
                <Checkbox isChecked={false} isDisabled={true} />
                <span className="ml-4 text-gray-500">Disabled Checked</span>
            </div>
        </div>
    );
}

export { BaseCheckbox };

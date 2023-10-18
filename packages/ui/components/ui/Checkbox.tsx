import { useState, useEffect } from "react";
const Checkbox = ({ isChecked: propIsChecked, onChange, isDisabled = false, variant = ['checked', 'minus'] }) => {
    const [isChecked, setIsChecked] = useState(propIsChecked);

    useEffect(() => {
        setIsChecked(propIsChecked);
    }, [propIsChecked]);

    const handleToggle = () => {
        if (isDisabled) return;
    
        let nextState;
        if (isChecked === false) {
            if (variant.includes('checked')) {
                nextState = true;
            } else if (variant.includes('minus')) {
                nextState = 'minus';
            }
        } else { // If isChecked is either true or 'minus'
            nextState = false;
        }
    
        onChange(nextState); // Notify the parent
    };



    let bgColor, checkMark;
    if (isChecked === true) {
        bgColor = 'bg-blue-600';
        checkMark = (
            <svg className="w-3.5 h-3.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        );
    } else if (isChecked === 'minus') {
        bgColor = 'bg-neutral-600';
        checkMark = <div className="w-3.5 h-0.5 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>;
    } else {
        bgColor = 'bg-zinc-800';
    }

    const borderColor = isChecked ? (isChecked === 'minus' ? 'border-neutral-600' : 'border-blue-600') : 'border-zinc-800';
    const cursorStyle = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';

    return (
        <div 
            tabIndex={0}
            className={`w-5 h-5 p-2 relative rounded ${bgColor} ${borderColor} ${cursorStyle} focus:outline-none focus:ring-2 focus:ring-blue-500`} 
            onClick={handleToggle}
        >
            {checkMark}
        </div>
    );
}

export { Checkbox };

import React, { useState } from "react";

interface SelectProps {
    name: string;
    value: string;
    text: string;
    maxWidth: string;
    options: { value: string; label: string }[];
    onChange: (name: string, value: any) => void;
}

/**
 * Custom select component with custom design and feel
 *
 * @author Gregory Albert <gregoryalbert1209@gmail.com>
 * @since 2024-03-25
 *
 * @returns {JSX.Element} A React component.
 */
const CustomSelect: React.FC<SelectProps> = ({ name, value, maxWidth, text, options, onChange }) => {

    const [selectedValue, setSelectedValue] = useState(value)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [displayedText, setDisplayedText] = useState(text);

    /**
     * Toggles the dropdown boolean value
     *
     * @author Gregory Albert <gregoryalbert1209@gmail.com>
     * @since 2024-03-25
     *
     * @returns {void}.
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    /**
     * Toggles the dropdown boolean value
     *
     * @param {string} selectedLabel - The selected text/label.
     * @param {any} selectedValue - The value of the selected label.
     *
     * @author Gregory Albert <gregoryalbert1209@gmail.com>
     * @since 2024-03-25
     *
     * @returns {void}.
     */
    const handleOptionClick = (selectedLabel: string, selectedValue: string) => {
        setDropdownOpen(false);
        setDisplayedText(selectedLabel);
        setSelectedValue(selectedValue);
        onChange(name, selectedValue);
    };

    return (
        <div className="flex bg-gray-4 rounded-md text-gray-2 cursor-pointer text-xs select-none w-full h-fit min-w-40"
        style={{ maxWidth: maxWidth }}>
            <div
                onClick={toggleDropdown}
                defaultValue={selectedValue}
                className=
                {`select-arrow outline-none flex rounded-md p-3
                appearance-none bg-transparent h-full w-full pr-10 `}
            >
                {displayedText}

            </div>
            <div
                className={`text-left cursor-pointer  absolute h-fit top-14 bg-gray-4 rounded-md min-w-40
            ${dropdownOpen ? 'block' : 'hidden'}`}
            style={{ maxWidth: maxWidth }}>
                {options.map(option => (
                    <div
                        key={option.value}
                        className="px-4 py-2 hover:bg-gray-3 rounded-md"
                        onClick={() => handleOptionClick(option.label, option.value)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;

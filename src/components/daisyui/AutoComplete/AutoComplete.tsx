import { useState, useMemo, ReactElement } from "react";
import { Input, InputProps } from "../Input";

interface AutoCompleteProps extends InputProps {
  options: Array<{ [key: string]: any }>; // Accepts any object as option
  searchKey?: string; // Key used for filtering and display
  onOptionSelect?: (selectedOption: { [key: string]: any }) => void;
}

const AutoComplete = ({
  options,
  searchKey = "label", // Default search key
  onOptionSelect,
  placeholder = "Type to search...",
}: AutoCompleteProps): ReactElement => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = useMemo(() => {
    const result = options.filter((option) =>
      (option[searchKey] || "").toLowerCase().includes(inputValue.toLowerCase())
    );
    return result;
  }, [inputValue, options, searchKey]);

  const handleInputChange = (e: any) => {
    const value = e.target.value.trim();
    setInputValue(value);
    setShowDropdown(value.length > 0);
  };

  const handleOptionClick = (option: any) => {
    setInputValue(option[searchKey]); // Set the input value to the selected option's value
    setShowDropdown(false);
    if (onOptionSelect) onOptionSelect(option); // Trigger the callback with the selected option
  };

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        size="sm"
        className="border-none focus:outline-none"
      />
      {showDropdown && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto w-full">
          {filteredOptions.length === 0 ? (
            <li className="p-2 bg-base-100">No options found</li>
          ) : (
            filteredOptions.map((option: any, index: any) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer px-4 py-2 hover:bg-base-200 bg-base-100"
              >
                {option[searchKey]}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;

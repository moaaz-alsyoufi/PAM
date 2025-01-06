import {
  useState,
  useMemo,
  ReactElement,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import clsx from "clsx";
import { Input, InputProps } from "../Input";
import { SelectOptionProps } from "../Select";

interface AutoCompleteProps extends InputProps {
  options: Array<SelectOptionProps & { label: string; value: string }>;
  onOptionSelect?: (selectedOption: { label: string; value: string }) => void;
}

const AutoComplete = ({
  options,
  onOptionSelect,
  value,
  onChange,
  placeholder = "Type to search...",
  className,
  ...inputProps
}: AutoCompleteProps): ReactElement => {
  const [inputValue, setInputValue] = useState<string>(String(value || ""));
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // Filter options based on the input value
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      ),
    [inputValue, options]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowDropdown(newValue.length > 0);
    if (onChange) onChange(e);
  };

  const handleOptionClick = (option: {
    label: string;
    value: string;
  }): void => {
    setInputValue(option.label);
    setShowDropdown(false);
    if (onOptionSelect) onOptionSelect(option);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredOptions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleOptionClick(filteredOptions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className={clsx("relative", className)}>
      {/* Input Field */}
      <Input
        {...inputProps}
        size="sm"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={clsx("w-full focus:outline-none border-none", inputProps)}
      />

      {/* Dropdown Menu */}
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={clsx(
                "cursor-pointer px-4 py-2 hover:bg-gray-100",
                highlightedIndex === index && "bg-gray-200"
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;

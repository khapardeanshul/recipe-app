import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder= 'search...'
}) => {
    return (
        <input 
        type="text"
        className='search-input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        />
    );
};

export default SearchInput;
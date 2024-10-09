import React from 'react'

interface SelectButtonProps {
    label: string;
    value: string;
    options: string[];
    onChange: (option: string) => void;
    isSearch?: boolean;
}

export default function SelectButton(props: SelectButtonProps) {
  return (
    <select className={props.isSearch ? "search-select" : "main-select"} value={props.value} onChange={(e) => props.onChange(e.target.value)}>
        {props.options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
    </select>
  );
}

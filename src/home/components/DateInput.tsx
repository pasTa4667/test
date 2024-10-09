import React from 'react';

interface DateInputProps {
    value: Date;
    onChange: (date: string) => void;
    isSearch?: boolean;
}

export default function DateInput(props: DateInputProps) {
    return (
        <input className={props.isSearch ? "search-date-select" : "main-date-select"} type="date" value={props.value.toISOString().split('T')[0]} onChange={(e) => props.onChange(e.target.value)}/>
    );
}

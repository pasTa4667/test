import React from 'react'

interface CheckboxProps {
    value: string;
    checked: boolean;
    onToggle: (tag: string) => void;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className='checkbox-container'>
        <input className="checkbox" type='checkbox' checked={props.checked} value={props.value} onChange={() => props.onToggle(props.value)} />
        <label className='checkbox-label'>{props.value}</label>
    </div>
  )
}

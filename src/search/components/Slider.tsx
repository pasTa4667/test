import React from 'react';


interface SliderProps {
    value: number,
    label: string,
    min?: number,
    max?: number,
    onChange: (value: number) => void;
}

export default function Slider(props: SliderProps) {
  return (
    <div className="slider-container">
      <label className='range-slider-label'>{`${props.label}: ${props.value}$`}</label>
      <input className='range-slider' type='range' min={props.min ?? 1} max={props.max ?? 100} value={props.value} onChange={(e) => props.onChange(Number(e.target.value))}/>
    </div>
  );
}

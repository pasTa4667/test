import { useMemo } from 'react'
import SelectButton from '../../home/components/SelectButton';
import { cities, generateTimes, tags } from '../../shared/definitions';
import DateInput from '../../home/components/DateInput';
import { useSearchParams } from 'react-router-dom';
import Slider from './Slider';
import Checkbox from './Checkbox';

interface SideBarProps {
  city: string;
  time: string;
  fromDate: Date;
  toDate: Date;
  priceMax: number;
  priceMin: number;
  tagsNotCheckedList: { [key: string]: boolean };
  onCityChange: (city: string) => void;
  onTimeChange: (time: string) => void;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onPriceMaxChange: (value: number) => void;
  onPriceMinChange: (value: number) => void;
  onTagToggle: (tag: string) => void;
}

export default function SideBar(props: SideBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const times = useMemo(generateTimes, []);

  function onChange(value: string, name: string, fn: Function) {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set(name, value);
    setSearchParams(updatedSearchParams);
    fn(value);
  }

  function handlePriceMinChange(price: number) {
    if(price > props.priceMax) {
      props.onPriceMaxChange(price);
      props.onPriceMinChange(price);
    }
    props.onPriceMinChange(price);
  }

  function handlePriceMaxChange(price: number) {
    if (price < props.priceMin) {
      props.onPriceMaxChange(price);
      props.onPriceMinChange(price);
    }
    props.onPriceMaxChange(price);
  }

  const TagList = () => {
    return (
      <div>
        {tags.map((tag, index) => (
          <Checkbox key={index} value={tag} checked={props.tagsNotCheckedList[tag] ?? true} onToggle={props.onTagToggle}/>
        ))}
      </div>
    )
  }

  return (
    <div className="side-bar">
      <div className="date-time-section">
        <SelectButton
          label=""
          options={cities}
          onChange={(value) => onChange(value, "city", props.onCityChange)}
          value={props.city}
          isSearch={true}
        />
        <SelectButton
          label=""
          options={times}
          onChange={(value) => onChange(value, "time", props.onTimeChange)}
          value={props.time}
          isSearch={true}
        />
        <DateInput
          value={props.fromDate}
          onChange={(value) =>
            onChange(value, "fromDate", props.onFromDateChange)
          }
          isSearch={true}
        />
        <DateInput
          value={props.toDate}
          onChange={(value) => onChange(value, "toDate", props.onToDateChange)}
          isSearch={true}
        />
      </div>
      <hr />
      <Slider
        value={props.priceMax}
        label="Max Price"
        onChange={handlePriceMaxChange}
      />
      <hr />
      <Slider
        value={props.priceMin}
        label="Min Price"
        onChange={handlePriceMinChange}
      />
      <hr />
      <TagList />
      <hr />
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import "./media/home.css";
import { cities, generateTimes, getPureDate } from '../shared/definitions';
import SelectButton from './components/SelectButton';
import DateInput from './components/DateInput';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [time, setTime] = useState("12:00");
  const [city, setCity] = useState("Munich");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const navigate = useNavigate();
  
  const timeOptions = useMemo(generateTimes, []);

  function handleSubmit() {
    navigate(`/results?city=${city}&time=${time}&fromDate=${getPureDate(fromDate)}&toDate=${getPureDate(toDate)}`);
  }

  function handleDateChange(newDate: string, setFn: Function, isToDate = false) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(newDate);
    if (selectedDate < today || (isToDate && selectedDate < fromDate)) {
    return;
    }
    setFn(selectedDate);
  }


  return (
    <div className="home-page">
      <div style={{ fontSize: "30px" }}> Go get a Car you lazy bumm</div>
      <div className="home-search-container">
        <SelectButton
          label={"City:"}
          value={city}
          options={cities}
          onChange={setCity}
        />
        <SelectButton
          label={"Time:"}
          value={time}
          options={timeOptions}
          onChange={setTime}
        />
        <DateInput value={fromDate} onChange={(newDate) => handleDateChange(newDate, setFromDate)} />
        <DateInput value={toDate} onChange={(newDate) => handleDateChange(newDate, setToDate, true)} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>GO</button>
    </div>
  );
}

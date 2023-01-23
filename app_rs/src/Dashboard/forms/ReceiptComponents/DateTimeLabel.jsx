import {useState} from "react";

function DateTimeLabel() {
  const [dayVal, setDayVal] = useState("")
  const [monthVal, setMonthVal] = useState("")
  const [yearVal, setYearVal] = useState("")

  const [hourVal, setHourVal] = useState("")
  const [minuteVal, setMinuteVal] = useState("")
  return (
      <label className='widespread'>
        <span>Date</span>
        <div className='datetime-label'>
          <input
            type="text"
            id="date-day"
            value={dayVal}
            placeholder='DD'
            onChange={(e) => setValid(setDayVal, e.target.value, 1, 31, 2, ".datetime-label #date-month")}/>
          <input
            type="text"
            id="date-month"
            value={monthVal}
            placeholder='MM'
            onChange={(e) => setValid(setMonthVal, e.target.value, 1, 12, 2, ".datetime-label #date-year")} />
          <input
            type="text"
            id="date-year"
            value={yearVal}
            placeholder='YY'
            onChange={(e) => setValid(setYearVal, e.target.value, 0, 99, 2, ".datetime-label #time-hour")} />
        </div>
        <span>Time</span>
        <div className='datetime-label'>
          <input
            type="text"
            id="time-hour"
            value={hourVal}
            placeholder='HH'
            onChange={(e) => setValid(setHourVal, e.target.value, 0, 23, 2, ".datetime-label #time-minute")}
          />
          <input
            type="text"
            id="time-minute"
            value={minuteVal}
            placeholder='MM'
            onChange={(e) => setValid(setMinuteVal, e.target.value, 0, 59, 2)}
          />
        </div>
      </label>
  )
}

function setValid(setter, value, minimum, maximum, length, nextSelector) {
  if (value === "") {
    setter(value)
  }
  const valueNumeric = parseInt(value);
  const isValid
    = isInt(value) &&
      valueNumeric <= maximum &&
      valueNumeric >= minimum &&
      value.length <= length;
  if (isValid) {
    setter(value);
    if (value.length === length) {
      document.querySelector(nextSelector)?.focus();
    }
  }
}

function isInt(string) {
  return Array.from(string).every((value) => value >= '0' && value <= '9');
}

export default DateTimeLabel;

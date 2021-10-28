<h3>Examples:</h3>

- Default

```js
() => {
  const [startDate, setStartDate] = useState(new Date());

  return <CustomDatePicker selected={startDate} onChange={setStartDate} useWeekdaysShort />;
};
```

- Month Picker

```js
() => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <CustomDatePicker
      selected={startDate}
      onChange={setStartDate}
      showMonthYearPicker
      dateFormat="MM/yyyy"
      calendarClassName="date-picker-month-year"
    />
  );
};
```

- Month Picker bottom-end position

```js
() => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <CustomDatePicker
      selected={startDate}
      onChange={setStartDate}
      showMonthYearPicker
      dateFormat="MM/yyyy"
      calendarClassName="date-picker-month-year"
      popperPlacement="right-end"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: '8px, 7px',
        },
      }}
    />
  );
};
```

- Month Picker right-start position

```js
() => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <CustomDatePicker
      selected={startDate}
      onChange={setStartDate}
      showMonthYearPicker
      dateFormat="MM/yyyy"
      calendarClassName="date-picker-month-year"
      popperPlacement="right-start"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: '0px, 7px',
        },
      }}
    />
  );
};
```

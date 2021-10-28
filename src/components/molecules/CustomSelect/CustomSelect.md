<h3>Examples:</h3>

- Small

```js
<CustomSelect
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  onOptionSelected={value => {
    /* onOptionSelected */
  }}
  name="select_name"
/>
```

- Medium

```js
<CustomSelect
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  size="medium"
  onOptionSelected={value => {
    /* onOptionSelected */
  }}
  name="select_name"
/>
```

- With Value

```js
<CustomSelect
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  value={{ value: 'option1', label: 'Option 1' }}
  onOptionSelected={value => {
    /* onOptionSelected */
  }}
  name="select_name"
/>
```

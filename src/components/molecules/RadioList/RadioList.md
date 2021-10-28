<h3>Examples:</h3>

```js
const [type, setType] = useState(null);
const listOptionRadio = [{
  label: 'Label name',
  value: 'lorem',
  disabled: true
}]
<RadioList
  name="type"
  list={listOptionRadio}
  value={type}
  onChange={e => setType(e)}
/>
```

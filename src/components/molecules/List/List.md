<h3>List draggable example</h3>

```js
const initialListData = [
  {
    id: generateUEID(),
    text: 'Lorem 1'
  }
];
const [listData, setListData] = React.useState(initialListData);
function handleSubmit(data) {
  setListData([...listData, { id: generateUEID(), text: data.listInput }]);
}
const listRemoveItem = id => setListData(listData.filter(t => t.id !== id));
<Form onSubmit={handleSubmit}>
  <TextInput name="listInput" placeholder="add item list" />
  <Button label="Add Item" type="submit" />
</Form>
<List draggable list={listData} setList={setListData} remove={listRemoveItem} />
```

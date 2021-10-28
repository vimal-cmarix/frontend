<h3>Examples:</h3>

```js
<Form>
  <ListFeedback
    list={[
      { value: '1', label: 'Too expensive', checked: true },
      { value: '2', label: 'Done with my job hunt' },
      { value: '3', label: 'Technical issues' },
      { value: '4', label: 'Switching to another product' },
      { value: '5', label: 'Not sure how to use data & tools' },
      { value: '6', label: 'Missing features I need' },
      { value: '7', label: 'Other (please explain below)' },
    ]}
    onChange={(item) => {}}
    placeholder="Anything you want to share? (Optional)"
  />
</Form>
```

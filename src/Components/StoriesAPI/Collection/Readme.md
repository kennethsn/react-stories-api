`StoriesAPICollection` Example:

```js
<StoriesAPICollection id={1} endpoint="https://example.com" q="eli" apiKey="<api-key-here>" urlFormatter="http://example.com/$id" page={2} onChange={ctx => alert("Event: "+JSON.stringify(ctx))}
onLoad={data => alert("Found "+data.name)}/>
```

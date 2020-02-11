# react-stories-api

> React Components for building interactive data storytelling interfaces with the Stories API

[![NPM](https://img.shields.io/npm/v/react-stories-api.svg)](https://www.npmjs.com/package/react-stories-api) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-stories-api
```

## Usage

```jsx
import React from 'react';
import StoriesAPIStory from 'react-stories-api';

class App extends Component {
  render () {
    return (
      <StoriesAPIStory
        id="Q11641"
        endpoint="<stories-api-endpoint>"
        collection="<collection-id-here>"
        apiKey="<api-key-here>"
      />
    )
  }
}

```

## License

MIT © [kennethsn](https://github.com/kennethsn)

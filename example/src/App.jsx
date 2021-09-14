import React from 'react';
import StoriesAPIStory from 'react-stories-api';

const App = () => (
  <StoriesAPIStory
    apiKey="G69Rkdmn.kpTHArUusmaUDNizmsEnbmZzHm3kn6Ul"
    collection={2}
    endpoint="https://stage.stories.k2.services"
    id="Q11641"
    options={{
      onChange: (index) => console.log(`Going to moment ${index}`),
      logo: (
        <img
          alt="React Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        />
      ),
    }}
  />
);

export default App;

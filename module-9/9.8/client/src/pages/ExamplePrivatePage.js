// An example private page that calls private API endpoints using the auth token.
// If the auth token is empty (ie: we're not logged in), then the API route will return an error.
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';

// Text formatted as code block
function CodeBlock({ children }) {
  return (
    <pre className="font-mono text-md text-gray-700 p-4 text-wrap">
      {children}
    </pre>
  );
}
function ExamplePrivatePage() {
  const { user, token } = useAuth();
  const [privateData, setPrivateData] = useState(undefined);
  useEffect(() => {
    const examplePrivateAPICall = async () => {
      console.log('=== DEBUG: private API async call triggered...');
      const result = await axios.get('/api/private', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('=== DEBUG: private API response: ' + JSON.stringify(result));
      if (result.status === 200) {
        setPrivateData(JSON.stringify(result?.data));
      } else {
        setPrivateData('API error');
      }
    };
    examplePrivateAPICall();
  }, [user, token]);
  return (
    <div className="mx-20">
      <h2 className="text-2xl my-12 font-semibold">Example Private Page</h2>
      <p>
        This is an example private page. It should get some data from a private
        API endpoint using the auth token, if we're logged in.
      </p>
      <p>
        You can see the actions of the API call inside the developer JS console
        and network tab.
      </p>

      <div className="my-16">
        <h2 className="text-2xl font-semibold my-2">Auth details:</h2>
        <CodeBlock>
          user: {user ? JSON.stringify(user, null, 2) : ''}
          <br />
          token: {token}
        </CodeBlock>
      </div>
      <div className="my-16">
        <h2 className="text-2xl font-semibold my-2">Private API data:</h2>
        <CodeBlock>data result: {privateData || '(empty)'}</CodeBlock>
      </div>
    </div>
  );
}

export default ExamplePrivatePage;
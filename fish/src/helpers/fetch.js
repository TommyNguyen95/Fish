import React from 'react';

//  Import to the component/view you want to use the fetch helper e.g. import UseFetch from './helpers/fetch'
//  Set a variable with the url you want to fetch and use a useState hook to get the data you want. You can also import the loading state if you want to use it e.g.
//  const [getUsers,setGetUsers] = useState([])
//  const {loading} = UseFetch({url:'http://localhost:3001/api/users', recieveResponse:setGetUsers})

//  Dont forget to import React{useState} from 'react when using

const UseFetch = ({ url, recieveResponse }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null)
  /**
   * Fetches data
   */
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        recieveResponse(await response.json())
        setLoading(false);
      } catch (error) {
        setError(error)
      }
    };
    fetchData();
  }, [url]);
  return { loading, error };
}
export default UseFetch;


import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommend from "./components/Recommend";
import LogIn from "./components/LogIn";
import { useApolloClient } from '@apollo/client';
import { useQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries';
import { updateCache } from './utils/functions';

const App = () => {
  const [page, setPage] = useState('authors');
  const [user, setUser] = useState(null);
  const result = useQuery(ME);
  const client = useApolloClient();

  useEffect(() => {
    const isUser = window.localStorage.getItem("user") ? true : false;
    if (isUser) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, {query: ALL_BOOKS}, addedBook);
    }
  })

  if (result.loading) {
    return <div>Loading....</div>
  }
  const me = result.data.me;
  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    client.resetStore();
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user && <button onClick={() => setPage('add')}>add book</button>}
        {!user && <button onClick={() => setPage("login")}>Log in</button>}
        {user && <button onClick={() => setPage("recommend")}>Recommendations</button>}
        {user && <button onClick={handleLogout}>Log out</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === "recommend"} me={me && me} />

      <LogIn show={page === "login"} setUser={setUser}/>
    </div>
  )
}

export default App

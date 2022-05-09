import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import './App.css';
import Content from './Content';
import Footer from './Footer';
import { handlePages } from './lib';
import Loader from './Loader';
import Token from './Token';
import { BOOK_QUERY } from './graphql';

function App() {
  const { data, loading, error } = useQuery(BOOK_QUERY);
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState([]);
  const [pagArr, setPagArr] = useState([]);
  const [word, setWord] = useState();


  useEffect(() => {
    if (pagArr.length <= 0 && !loading && !error) {
      setPagArr(handlePages(data.book.pages));
    }
    if (position.length > 1) {
      let res = [];
      pagArr[index].map((pos) =>
        // eslint-disable-next-line array-callback-return
        pos.tokens.filter((tok) => {
          if (tok.position.join('') === position.join('')) {
            res.push(tok.value);
            setWord(res[0]);
          }
        })
      );
    }
  }, [data, error, index, loading, pagArr, position]);

  function handleNextPage() {
    if (index < pagArr.length - 1) {
      setIndex(index + 1);
    }
  }

  function handlePreviousPage() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  if (loading) return <Loader />;

  if (error)
    return (
      <div className='container open-book'>
        <pre>{error.message}</pre>
      </div>
    );
  if (word) {
    return (
      <Token
        setWord={setWord}
        word={word}
        title={data.book.title}
        author={data.book.author}
      />
    );
  } else if (pagArr.length > 0) {
    return (
      <>
        <Content
          title={data.book.title}
          author={data.book.author}
          page={pagArr[index]}
          setPosition={setPosition}
        />
        <Footer
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          pagArr={pagArr}
          index={index}
        />
      </>
    );
  }
}

export default App;

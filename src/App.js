import { useEffect, useState } from 'react';
import './App.css';
import SearchLine from './SearchLine';
import Table from './Table';

const App = () => {
  const [defaultDataArr, setDefaultDataArr] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [inputValue, setInputValue] = useState('');

  //fetching data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      setDataArr(data)
      setDefaultDataArr(data)
      setTableHeaders(Object.keys(data[0]))
    })
    .catch(error => console.log(error));
  }, []);

  //filtering and controlling input
  const filterFoo = (value) => {
    const filteredArr = defaultDataArr.filter(item => {
      const valuesArr = Object.values(item);
      let flag = false;
      for (let values of valuesArr) {
        if (values.toString().includes(value)) {
          flag = true;
          break
        }
      }
      if (flag) {
        return item
      }
    })
    setDataArr(filteredArr)   
  };
  
  const onInputChange = (e) => {
    setInputValue(e.target.value)

    filterFoo(e.target.value)
  };

  return (
    <>
      <div className='title'>Table constructor</div>
      <SearchLine value={inputValue} onChange={onInputChange} />
      <Table dataArr={dataArr} inputValue={inputValue} headers={tableHeaders} />
    </>
  );
}

export default App;

import { useState, useEffect } from 'react'
import './Table.css'

const Table = ({ dataArr, inputValue, headers }) => {
    const [defaultArr, setDefaultArr] = useState(dataArr);
    const [currentItems, setCurrentItems] = useState([]);
    const [sortData, setSortData] = useState(null);
    const [pagesArr, setPagesArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsOnPage = 50;

    //sorting
    const changeSortDirection = key => {
        let direction = 'increasing';
        if (sortData && sortData.key === key && sortData.direction === 'increasing') {
          direction = 'decreasing';
        }
        setSortData({ key, direction });
    };

    useEffect(() => {
        setCurrentPage(1)
        if (inputValue === '') setSortData(null)
    }, [inputValue])

    useEffect(() => {
        let sortableItems = [...dataArr];
        if (sortData !== null) {
          sortableItems.sort((a, b) => {
            if (a[sortData.key] < b[sortData.key]) {
              return sortData.direction === 'increasing' ? -1 : 1;
            }
            if (a[sortData.key] > b[sortData.key]) {
              return sortData.direction === 'increasing' ? 1 : -1;
            }
            return 0;
          });
        }
        setDefaultArr(sortableItems)
    }, [sortData])
        
    // pagination
    useEffect(() => {
        setDefaultArr(dataArr)
    }, [dataArr])

    useEffect(() => {
        //show after loading
        if (currentItems.length === 0) setCurrentItems(dataArr.slice(0, 50))
        //pagination after filtering or sorting
        paginate(currentPage)
        const pagesAmount = Math.ceil(defaultArr.length/50)
        setPagesArr(Array(pagesAmount).fill(""))
    }, [defaultArr])

    const paginate = (pageNumber) => {
        const start = (pageNumber - 1) * itemsOnPage;
        const end = start + itemsOnPage;
        const items = defaultArr.slice(start, end)
        setCurrentItems(items)
    }

    const definePageNumber = (e) => {
        const pageNumber = +e.target.innerHTML;

        setCurrentPage(pageNumber)
        paginate(pageNumber)
    }

    return (
        <>
            <table className='table'>
                <thead>
                <tr>
                    {headers.length !== 0 && headers.map((label, i) => <th className='head' onClick={() => changeSortDirection(label)} key={i}>{label}</th>)}
                </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, i) => <tr key={i}>{Object.values(item).map((value, i) => <td key={i}>{value}</td>)}</tr>)}
                </tbody>
            </table>
            <ul className='pagesList'>
                {pagesArr.map((_, i) => <li onClick={definePageNumber} className={`pageSwitch ${currentPage === i+1 ? 'active' : null}`} key={i}>{i+1}</li>)}
            </ul>
        </>
    )
}

export default Table
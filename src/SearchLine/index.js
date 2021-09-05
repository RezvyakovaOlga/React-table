import './SearchLine.css'

const SearchLine = ({ value, onChange}) => {
    return (
        <div className='searchWrapper'>
            <label className='label'>Search notes</label>
            <input className='input' value={value} onChange={onChange} />
        </div>
    )
}

export default SearchLine
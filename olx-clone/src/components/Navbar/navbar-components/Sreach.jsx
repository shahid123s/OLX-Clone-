import './navbarComponents.css'

const Search = () => {

    return (
        <form action=""  className='search'>
                <input type="text" placeholder='Find Cars, Mobiel, laptops and more....'  className='navbar-search'/>
                <button className='search-btn'>Search</button>
            </form>
    )
}

export default Search
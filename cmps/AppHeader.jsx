const { NavLink } = ReactRouterDOM
const { Link } = ReactRouterDOM


export function AppHeader() {

    return <header className="app-header full main-layout">
        <section className="header-container">
            <h1>David's Book Store</h1>
            <nav className='app-nav'>
                <NavLink to='/'>Home</NavLink>
                <span> | </span>
                <NavLink to='/about'>About</NavLink>
                <span> | </span>
                <NavLink to='/book'>Books</NavLink>
                <span> | </span>
                <button onClick={() => localStorage.clear()}>Clear LocalStorage</button>
            </nav >
        </section >
    </header >
}



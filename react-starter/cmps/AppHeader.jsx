export function AppHeader({ page = 'home', onSetPage }) {

    return <header className="app-header full main-layout">
        <section className="header-container">
            <h1>David's Book Store</h1>
            <nav className='app-nav'>
                <a href="#" className={(page === 'home') ? 'active' : ''}
                    onClick={(ev) => onSetPage('home')}>
                    Home
                </a>
                <span> | </span>
                <a href="#" className={(page === 'about') ? 'active' : ''}
                    onClick={(ev) => onSetPage('about')}>
                    About
                </a>
                <span> | </span>
                <a href="#" className={(page === 'books') ? 'active' : ''}
                    onClick={(ev) => onSetPage('books')}>
                    Books
                </a>
                <span> | </span>
                <button onClick={() => localStorage.clear()}>Clear LocalStorage</button>
            </nav>
        </section>
    </header>
}



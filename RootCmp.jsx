const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

export function RootCmp() {

    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <UserMsg />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/book' element={<BookIndex />} />
                    <Route path='/book/:id' element={<BookDetails />} />
                    <Route path='/book/edit/:id' element={<BookEdit />} />
                </Routes>
            </main>
        </section>
    </Router>
}
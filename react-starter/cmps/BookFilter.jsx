const { useState, useEffect } = React

export function BookFilter({ filterBy, setFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handleChange(ev) {
        const { type, name, value } = ev.target

        setFilterByToEdit(prev => (
            { ...prev, [name]: type === 'text' ? value : +value }
        ))
    }

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])


    return <section className="book-filter">
        <p>Serch:</p>
        <input
            value={filterByToEdit.txt}
            onChange={ev => handleChange(ev)}
            placeholder="Search by name"
            type="text"
            name="txt"
        />
        <p>Price Filter:</p>
        <input
            value={filterByToEdit.price || ''}
            onChange={ev => handleChange(ev)}
            placeholder="Search by Price"
            type="number"
            name="price"
        />
    </section>

}


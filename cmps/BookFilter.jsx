const { useState, useEffect } = React

export function BookFilter({ filterBy, setFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handleChange(ev) {
        const { type, name, value } = ev.target

        setFilterByToEdit(prev => (
            { ...prev, [name]: type === 'text' ? value : +value || value }
        ))
    }

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])


    return <section className="book-filter">
        <label htmlFor="txt">Search:</label>
        <p></p>
        <input
            value={filterByToEdit.txt}
            onChange={ev => handleChange(ev)}
            placeholder="Search by name"
            type="text"
            name="txt"
        />
        <label htmlFor="price">Price Filter:</label>
        <input
            value={filterByToEdit.price || ''}
            onChange={ev => handleChange(ev)}
            placeholder="Search by Price"
            type="number"
            name="price"
        />
        <label htmlFor="diff">Difficulty Level:</label>
        <select
            value={filterByToEdit.diff}
            onChange={ev => handleChange(ev)}
            name="diff"
            id="diff">
            <option value="" disabled hidden>
                Filter by Difficulty
            </option>
            <option value='serious' >Serious Reading</option>
            <option value='decent'>Decent Reading</option>
            <option value='light' >Light Reading</option>
        </select>
    </section>

}






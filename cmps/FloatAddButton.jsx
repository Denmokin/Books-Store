const { Link } = ReactRouterDOM

export function FloatAddButton() {

    return <div className='float-add-btn' >
        <Link to='/book/add'>
            <button>{<img src='./assets/img/icons/plus_icon.svg'/>}</button>
        </Link>
    </div>
}
import { NavLink } from "react-router-dom"

export const NavBar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-trasparent" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">My Notes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className='nav-link' to='/dashboard/api/notes/active'>Active notes</NavLink>
                            <NavLink className='nav-link' to='/dashboard/api/notes/archived'>Archived notes</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
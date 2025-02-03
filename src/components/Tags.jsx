import { NavLink } from "react-router-dom"

export const Tags = ({ tags, handlerRemoveTag, handlerTagSelectedForm }) => {

    return (
        <>
            <div className="tagTile">
            <h5 className="my-2 tagTile">Tags</h5>
            <span className="material-symbols-outlined">
                sell
            </span>
            </div>
            <ul className="list-group list-group-flush">
                {tags.map(tag => {
                    return (
                        <li key={tag.id} className="list-group-item tagList">
                            <NavLink
                                className='card-link'
                                to={'/dashboard/api/notes/tag/' + tag.id}>
                                {tag.name}
                            </NavLink>
                            <a href="#" className="card-link" onClick={() => handlerRemoveTag(tag.id)}>
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
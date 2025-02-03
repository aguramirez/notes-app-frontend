
export const Notes = ({ notes, handlerRemoveNote, handlerNoteSelectedForm }) => {


    return (
        <>
            {notes?.map(note => {
                return (
                    <div className="card m-3 bg-info-subtle" style={{ width: '18rem' }} key={note.id}>
                        <div className="card-header">
                            <h5>{note.title}</h5>
                            {note.archived ? <span className="material-symbols-outlined">
                                archive
                            </span> : <></>}
                        </div>
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary"><cite title="Source Title">{(note.tag?.name)}</cite></h6>
                            <p className="card-text">{note.content}</p>
                            <div className="card-footer bg-transparent">
                            <a href="#" className="card-link text-success" onClick={() => handlerNoteSelectedForm(note)}><span className="material-symbols-outlined">
                                edit
                            </span></a>
                            <a href="#" className="card-link text-danger" onClick={() => handlerRemoveNote(note.id)}><span className="material-symbols-outlined">
                                delete
                            </span></a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
import { NoteForm } from "./NoteForm"

export const NoteModalForm = ({tags,handlerAddNote, initialNoteForm, noteSelected, handlerCloseForm}) => {

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {noteSelected.id > 0 ? 'Edit' : 'Create'} New Note
                            </h5>
                        </div>
                        <div className="modal-body">
                            <NoteForm
                                handlerAddNote={handlerAddNote}
                                initialNoteForm={initialNoteForm}
                                noteSelected={noteSelected}
                                handlerCloseForm={handlerCloseForm}
                                tags={tags} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
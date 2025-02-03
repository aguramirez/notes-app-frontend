import { useEffect, useState } from "react"
import { NoteModalForm } from "../components/NoteModalForm"
import { Notes } from "../components/Notes"
import { TagForm } from "../components/TagForm"
import { Tags } from "../components/Tags"
import { NavBar } from "../components/layout/NavBar"
import { useNotes } from "../hooks/useNotes"
import { findUnarchivedNotes } from "../services/NoteService"



export const ActiveDashboard = () => {

  const {
    notes,
    tags,
    noteSelected,
    tagSelected,
    initialNoteForm,
    initialTagForm,
    visibleForm,
    visibleTagForm,
    handlerAddNote,
    handlerAddTag,
    handlerRemoveNote,
    handlerRemoveTag,
    handlerNoteSelectedForm,
    handlerTagSelectedForm,
    handlerOpenForm,
    handlerOpenTagForm,
    handlerCloseForm,
    handlerCloseTagForm,
    getNotes,
    activeNotes,
    getUnarchivedNotes
  } = useNotes();

  useEffect(() => {
    getNotes();
    getUnarchivedNotes();
  }, [])

  return (
    <>
      <NavBar />
      {!visibleForm ||
        <NoteModalForm
          handlerAddNote={handlerAddNote}
          initialNoteForm={initialNoteForm}
          noteSelected={noteSelected}
          handlerCloseForm={handlerCloseForm}
          tags={tags}
        />
      }
      <div className="container my-4">
        <div className="row">
          <div className="col-2">
            {tags?.length == 0 ? <div className="alert alert-warning">No tags...</div> :
              <Tags
                tags={tags}
                handlerRemoveTag={handlerRemoveTag}
                handlerTagSelectedForm={handlerTagSelectedForm}
              />
            }
            {visibleTagForm ?
              <TagForm
                handlerAddTag={handlerAddTag}
                initialTagForm={initialTagForm}
                tagSelected={tagSelected}
                handlerCloseTagForm={handlerCloseTagForm}
              /> :
              <button
                className="btn btn-primary addTag my-4 w-100"
                onClick={handlerOpenTagForm}>
                <span className="material-symbols-outlined">
                  add_circle
                </span>
              </button>}
          </div>
          <div className="col">

            {notes?.length == 0 ? <div className="alert alert-warning">No notes...</div> :
              <Notes
                notes={activeNotes}
                handlerRemoveNote={handlerRemoveNote}
                handlerNoteSelectedForm={handlerNoteSelectedForm} />
            }
            <button
              className="btn btn-primary addNote my-4 w-100"
              onClick={handlerOpenForm}>
              <span className="material-symbols-outlined">
                add_circle
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

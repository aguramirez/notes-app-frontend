import { useReducer, useState } from "react";
import { notesReducer } from "../reducers/notesReducer";
import { tagsReducer } from "../reducers/tagsReducer";
import Swal from "sweetalert2";
import { findAll, findArchivedNotes, findNotesByTag, findUnarchivedNotes, remove, removeTag, save, saveTag, update } from "../services/NoteService";
import { useNavigate } from "react-router-dom";

const initialNotes = [];

const initialTags = []

const initialNoteForm = {
    id: 0,
    title: '',
    content: '',
    tag: null,
    archived: false
}

const initialTagForm = {
    id: 0,
    name: ''
}
export const useNotes = () => {

    const [notes, dispatch] = useReducer(notesReducer, initialNotes);
    const [tags, dispatchTag] = useReducer(tagsReducer, initialTags)
    const [noteSelected, setNoteSelected] = useState(initialNoteForm);
    const [tagSelected, setTagSelected] = useState(initialTagForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [visibleTagForm, setVisibleTagForm] = useState(false);

    const[archivedNotes, setArchivedNotes] = useState(initialNotes);
    const[activeNotes, setActiveNotes] = useState(initialNotes);
    const[filteredNotes, setFilteredNotes] = useState(initialNotes);

    const navigate = useNavigate();

    const getNotes = async () => {
        try {
            const result = await findAll();
            const { data } = result;
            const { notes, tags } = data;
            dispatch({
                type: 'loadingNotes',
                payload: {
                    notes: notes,
                },
            });
            dispatchTag({
                type: 'loadingTags',
                payload: {
                    tags: tags,
                }
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getArchivedNotes = async () => {
        try {
            const result = await findArchivedNotes();
            setArchivedNotes(result)
        } catch (error) {
            console.error('Error fetching archived notes:', error);
        }
    };

    const getUnarchivedNotes = async () => {
        try {
            const result = await findUnarchivedNotes();
            setActiveNotes(result)
        } catch (error) {
            console.error('Error fetching unarchived notes:', error);
        }
    };

    const getNotesByTag = async (tagId) => {
        try {
            const result = await findNotesByTag(tagId);
            setFilteredNotes(result)
        } catch (error) {
            console.error('Error fetching notes by tag:', error);
        }
    };

    const handlerAddNote = async (note) => {

        let response;

        if (note.id === 0) {
            response = await save(note);
        } else {
            response = await update(note);
        }

        dispatch({
            type: (note.id === 0) ? 'addNote' : 'updateNote',
            payload: response.data,
        });

        Swal.fire({
            title: (note.id === 0) ? "Note Created!" : "Note Edited!",
            text: (note.id === 0) ? "A new note has been added successfully." : "The note has been successfully edited.",
            icon: "success"
        });
        handlerCloseForm();
        navigate('/')
    }

    const handlerAddTag = async (tag) => {
        await saveTag(tag)
        dispatchTag({
            type: (tag.id === 0) ? 'addTag' : 'updateTag',
            payload: tag,
        });
        handlerCloseTagForm();
        navigate('/')
    }

    const handlerRemoveNote = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id);
                dispatch({
                    type: 'removeNote',
                    payload: id,
                })
                Swal.fire({
                    title: "Note Deleted!",
                    text: "Your note has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const handlerRemoveTag = (id) => {
        removeTag(id)
        dispatchTag({
            type: 'removeTag',
            payload: id,
        })
    }

    const handlerNoteSelectedForm = (note) => {
        setVisibleForm(true);
        setNoteSelected({ ...note });
    }

    const handlerTagSelectedForm = (tag) => {
        setTagSelected({ ...tag })
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }
    const handlerOpenTagForm = () => {
        setVisibleTagForm(true);
    }
    const handlerCloseForm = () => {
        setVisibleForm(false);
        setNoteSelected(initialNoteForm);
    }
    const handlerCloseTagForm = () => {
        setVisibleTagForm(false);
        setTagSelected(initialTagForm);
    }

    return {
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
        getArchivedNotes,
        getUnarchivedNotes,
        getNotesByTag,
        archivedNotes,
        activeNotes,
        filteredNotes
    }
}
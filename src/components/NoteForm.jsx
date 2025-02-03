import { useEffect, useState } from "react"
import Swal from "sweetalert2";


export const NoteForm = ({ tags, initialNoteForm, noteSelected, handlerCloseForm, handlerAddNote }) => {

    const [noteForm, setNoteForm] = useState(initialNoteForm);
    const { id, title, content, archived, tag } = noteForm;
    const [checked, setChecked] = useState(archived);
    const [tagValue, setTagValue] = useState(tag ? tag.id : 0);

    useEffect(() => {
        setNoteForm({ ...noteSelected })
        setTagValue(noteSelected.tag ? noteSelected.tag.id : 0);
    }, [noteSelected])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setNoteForm({
            ...noteForm,
            [name]: value,
        })
    }

    const onSelectChange = ({ target }) => {
        const { name, value } = target;
        setTagValue(value);

        if (name === "tag") {
            const selectedTag = value !== "" ? tags.find((tag) => tag.id === parseInt(value)) : null;
            setNoteForm((prevNoteForm) => ({
                ...prevNoteForm,
                tag: selectedTag || null,
            }));
        } else {
            setNoteForm((prevNoteForm) => ({
                ...prevNoteForm,
                [name]: value,
            }));
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!title || !content || id === 0) {
            Swal.fire({
                title: "Validation Error!",
                text: "Please complete all required fields.",
                icon: "error"
            });
        }
        handlerAddNote(noteForm);
        setNoteForm(initialNoteForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setNoteForm(initialNoteForm);
    }



    const onCheckboxChange = () => {
        setChecked(!checked);
        setNoteForm({
            ...noteForm,
            archived: checked,
        })
    }


    return (
        <form onSubmit={onSubmit}>
            <input
                className="form-control my-3 w-75"
                placeholder="Title"
                name="title"
                value={title}
                onChange={onInputChange} />
            <textarea
                className="form-control my-3 w-75"
                placeholder="notes..."
                name="content"
                value={content}
                onChange={onInputChange} />
            <select
                className="form-control my-3 w-75"
                name="tag"
                value={tagValue}
                onChange={onSelectChange}
            >
                <option value="">No tag</option>
                {tags?.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}
            </select>
            <div className="my-3 form-check">
                <input type="checkbox"
                    name="archived"
                    checked={archived}
                    className="form-check-input"
                    onChange={onCheckboxChange}
                />
                <label className="form-check-label">Archived</label>
            </div>
            <input
                type="hidden"
                name="id"
                value={id} />
            <button
                className="btn btn-secondary"
                type="submit">
                {id > 0 ? 'Edit' : 'Create'}
            </button>
            <button
                className="btn btn-danger mx-3"
                type="button"
                onClick={() => onCloseForm()} >
                Close
            </button>
        </form >
    )
}
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const TagForm = ({ handlerAddTag, initialTagForm, tagSelected, handlerCloseTagForm }) => {

    const [tagForm, setTagForm] = useState(initialTagForm);
    const { id, name } = tagForm;

    useEffect(() => {
        setTagForm({ ...tagSelected })
    }, [tagSelected])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setTagForm({
            ...tagForm,
            [name]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handlerAddTag(tagForm);
        setTagForm(initialTagForm);
    }

    const onCloseTagForm = () => {
        handlerCloseTagForm();
        setTagForm(initialTagForm);
    }
    return (
        <>
            <form onSubmit={onSubmit} className="my-4">
                <input
                    className="form-control my-3 w-100 inputTag"
                    placeholder="New Tag"
                    name="name"
                    value={name}
                    onChange={onInputChange} />
                <input
                    type="hidden"
                    name="id"
                    value={id} />
                <button
                    className="btn btn-secondary btn-sm"
                    type="submit">
                    <span className="material-symbols-outlined">
                        done
                    </span>
                </button>
                <button
                    className="btn btn-danger mx-3 btn-sm"
                    type="button"
                    onClick={() => onCloseTagForm()} >
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            </form>
        </>
    )
}

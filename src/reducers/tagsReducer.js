//cambiar al hace fetch
export const tagsReducer = (state =[], action) => {

    switch(action.type) {
        case 'addTag':
            return [
                ...state,
                {
                    ...action.payload
                }
            ];
        case 'removeTag':
            return state.filter(n => n.id !== action.payload)
        case 'loadingTags':
            return action.payload.tags
        default:
            return state;
    }
}
//cambiar al hace fetch
export const notesReducer = (state =[], action) => {

    switch(action.type) {
        case 'addNote':
            return [
                ...state,
                {
                    ...action.payload
                }
            ];
        case 'removeNote':
            return state.filter(n => n.id !== action.payload)
            case 'updateNote':
                return state.map(n => {
                  if (n.id === action.payload.id) {
                    return {
                      ...n,
                      ...action.payload,
                    };
                  }
                  return n;
                });              
        case 'loadingNotes':
            return action.payload.notes;
        case 'loadingFilteredNotes':
            return action.payload;
        default:
            return state;
    }
}
const initialState = {
    autoCompleteOptions: []
};

const autoCompleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case "COMPLETE":
            state = {
                autoCompleteOptions: [...action.payload.options]
            };
            return state;
        case "CLEAR":
            state = {
                autoCompleteOptions: []
            }
            return state;
        default:
            return state;
    }
}

export default autoCompleteReducer;
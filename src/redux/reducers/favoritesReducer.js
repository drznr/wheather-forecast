const initialState = {
    favorites: []
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE FAVORITE":  
        if (!state.favorites.some(city=> city.key === action.payload.key)) {
            state = {
                favorites: [...state.favorites, action.payload]
            }   
        } else {
            let newFavorites = state.favorites.filter(city=> city.key !== action.payload.key);
            state = {
                favorites: newFavorites
            }
        }  
            return state;
        default:
            return state;
    }
}

export default favoritesReducer;
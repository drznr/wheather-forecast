const initialState = {
    cityInfo: {},
    isCelsius: false
};

const forecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE FORECAST":
            if (state.isCelsius) {
                let daysArr = action.payload.details.DailyForecasts;
                for (let i = 0; i < daysArr.length; i++) {
                    daysArr[i].Temperature.Minimum.Value = Math.round((daysArr[i].Temperature.Minimum.Value - 32) * (5 / 9));
                    daysArr[i].Temperature.Maximum.Value = Math.round((daysArr[i].Temperature.Maximum.Value - 32) * (5 / 9));
                }
            }
            state = {
                cityInfo: { ...action.payload.details },
                isCelsius: state.isCelsius
            }
            return state;
        case "CHANGE UNITS":
            let daysArr = state.cityInfo.DailyForecasts;
            for (let i = 0; i < daysArr.length; i++) {
                if (!state.isCelsius) {
                    daysArr[i].Temperature.Minimum.Value = Math.round((daysArr[i].Temperature.Minimum.Value - 32) * (5 / 9));
                    daysArr[i].Temperature.Maximum.Value = Math.round((daysArr[i].Temperature.Maximum.Value - 32) * (5 / 9));
                } else {
                    daysArr[i].Temperature.Minimum.Value = Math.round((daysArr[i].Temperature.Minimum.Value * 1.8) + 32);
                    daysArr[i].Temperature.Maximum.Value = Math.round((daysArr[i].Temperature.Maximum.Value * 1.8) + 32);
                }
            }
            state = {
                cityInfo: { ...state.cityInfo },
                isCelsius: !state.isCelsius
            };
            return state;
        case "TOGGLE CITY":
            state = {
                cityInfo: {
                    ...state.cityInfo,
                    isFavorite: !state.cityInfo.isFavorite
                }
            }
            return state;
        default:
            return state;
    }
}

export default forecastReducer;
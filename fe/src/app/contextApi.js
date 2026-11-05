import { createContext } from "react";

export const loadingStates = {
    loading: "loading",
    idle: "idle",
    fulfilled: "fulfilled",
    rejected: "rejected",
}
export const crackersContext = createContext(null);

export const crackersInitialState = {
    getCrackersData: {
        loading: loadingStates?.idle,
        data: [],
        error: null,
    },
    loginUser:{
        loading: loadingStates?.idle,
        data: [],
        error: null,
    },
    settingsData:{
        loading: loadingStates?.idle,
        data: [],
        error: null,
    },

};

export const crackersReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_CRACKERS_DATA":
            return {
                ...state,
                getCrackersData: payload,
            };
            default:
                return state;
    }
};

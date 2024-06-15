import { ADD_GROUP, DELETE_GROUP, SET_GROUP_RANGE, FETCH_TODO_STATUS, SET_NEW_TO } from './action';

const initialState = {
    groups: [{ from: 1, to: 10 }],
    status: [],
    newFrom: 1,
    newTo: 10
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GROUP:
            return {
                ...state,
                groups: [...state.groups, { from: state.newFrom, to: state.newTo }],
                newFrom: state.newTo + 1,
                newTo: 10,
            };
        case DELETE_GROUP:
            const newGroups = state.groups.filter((_, i) => i !== action.index);
            const newStatus = state.status.filter((_, i) => i !== action.index);
            return {
                ...state,
                groups: newGroups,
                status: newStatus,
                newFrom: state.newTo + 1
            };
        case SET_GROUP_RANGE:
            const updatedGroups = state.groups.map((group, i) =>
                i === action.index ? { from: action.from, to: action.to } : group
            );
            return {
                ...state,
                groups: updatedGroups,
                newFrom: +(action.to) + 1,
                newTo: 10
            };
        case FETCH_TODO_STATUS:
            const updatedStatus = [...state.status];
            updatedStatus[action.index] = action.status;
            return { ...state, status: updatedStatus };
        case SET_NEW_TO:
            return {
                ...state,
                newTo: action.newTo
            };
        default:
            return state;
    }
};

export default rootReducer;

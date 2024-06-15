export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const SET_GROUP_RANGE = 'SET_GROUP_RANGE';
export const FETCH_TODO_STATUS = 'FETCH_TODO_STATUS';
export const SET_NEW_TO = 'SET_NEW_TO';

export const addGroup = () => ({ type: ADD_GROUP });
export const deleteGroup = (index) => ({ type: DELETE_GROUP, index });
export const setGroupRange = (index, from, to) => ({ type: SET_GROUP_RANGE, index, from, to });
export const fetchTodoStatus = (index, status) => ({ type: FETCH_TODO_STATUS, index, status });
export const setNewTo = (newTo) => ({
    type: SET_NEW_TO,
    newTo
});

import * as types from '../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status,
            }
            if (!task.id) {
                task.id = randomID();
                state.push(task);

            } else {
                var index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            var index = findIndex(state, action.id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];
        case types.DELETE_TASK:
            var index = findIndex(state, action.id);
            state.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];
        case types.EDIT_TASK:
            var index = findIndex(state, action.task.id);
            return [...state];
        default:
            return state;
    }
    return state;
}

var randomID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()

}

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}


export default myReducer;
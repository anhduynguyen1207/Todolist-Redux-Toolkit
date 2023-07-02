
// const initState = {
//     search: '',
//     status: 'All',
//     priority: [],
// }

// const filterReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'filter/searchTodo':
//             return {
//                 ...state,
//                 search: action.payload
//             };
//         case 'filter/Status':
//             return {
//                 ...state,
//                 status: action.payload
//             };
//         case 'filter/Priorities':
//             return {
//                 ...state,
//                 priority: action.payload
//             };

//         default:
//             return state;
//     }
// }

// export default filterReducer;

import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        priority: [],
    },
    reducers: {
        searchTodo: (state, action) => {
            state.search = action.payload
        },
        Status: (state, action) => {
            state.status = action.payload
        },
        Priorities: (state, action) => {
            state.priority = action.payload
        }
    }
})
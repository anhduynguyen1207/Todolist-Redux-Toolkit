
// const initState =
//     [
//         {
//             id: 1,
//             name: 'Learn HTML',
//             completed: false,
//             priority: 'Medium',
//         },
//         {
//             id: 2,
//             name: 'Learn CSS',
//             completed: true,
//             priority: 'Low',
//         },
//         {
//             id: 3,
//             name: 'Learn ReactJs',
//             completed: false,
//             priority: 'High',
//         }

//     ];


// const todoListReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'todoList/addTodo':
//             return [...state, action.payload]
//         case 'todoList/updateTodo':
//             return state.map((todo) =>
//                 todo.id === action.payload
//                     ? { ...todo, completed: !todo.completed }
//                     : todo
//             )
//         default:
//             return state;
//     }
// }

// export default todoListReducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const todosSlice = createSlice({
    name: 'todoList',
    initialState: { status: 'idle', todos: [] },
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        updateTodo: (state, action) => {
            const currentTodo = state.filter(todo => todo.id === action.payload);
            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodo.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = 'idle';
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodoThunk.fulfilled, (state, action) => {
                let currentTodo = state.todos.filter(todo => todo.id === action.payload);
                currentTodo = action.payload
            })

    }

})


export const fetchTodo = createAsyncThunk('todos/fetchTodo', async () => {
    const res = await fetch('api/todos');
    const data = await res.json();
    console.log(data);
    return data.todos;
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
    const res = await fetch('api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
    });
    const data = await res.json();
    console.log('[New]', data);
    return data.todos;
})

export const updateTodoThunk = createAsyncThunk('todos/updateTodoThunk', async (id) => {
    const res = await fetch('api/updateTodos', {
        method: 'POST',
        body: JSON.stringify(id)
    });
    const data = await res.json();
    console.log('[Update]', data);
    return data.todos;
})

/* 
3 trạng thái của action Thunk
=> pendding
=> fullfilled
=> rejected
*/
export default todosSlice;


//thunk function - thunk action
// export function addTodos(todo) {
//     return function addTodosThunk(dispatch, getState) {
//         console.log('[Before]', getState());
//         console.log(todo);
//         todo.name = 'Duy updated';
//         dispatch(todosSlice.actions.addTodo(todo));
//         console.log('[After]', getState());
//     }
// }
// import { createSelector } from 'reselect'
import { createSelector } from '@reduxjs/toolkit'

export const searchTxtSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const todoListSelector = (state) => state.todoList.todos;
export const filterPrioritySelector = (state) => state.filters.priority;
// {
//     const result = state.todoList.filter((todo) => {
//         return todo.name.includes(state.filter.search);
//     })
//     return result
// };

export const resultSelector = createSelector(
    todoListSelector,
    filterStatusSelector,
    searchTxtSelector,
    filterPrioritySelector,
    (todoList, status, searchText, priorities) => {
        return todoList.filter((todo) => {
            if (status === 'All') {
                return priorities.length ?
                    todo.name.includes(searchText) && (priorities.includes(todo.priority))
                    : todo.name.includes(searchText)
            }
            return (
                todo.name.includes(searchText) &&
                (status === 'Completed' ? todo.completed : !todo.completed) &&
                (priorities.length ? priorities.includes(todo.priority) : true)
            )
        })

    })
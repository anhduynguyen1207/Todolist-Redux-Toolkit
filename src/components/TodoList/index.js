import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
// import { addTodo } from '../../redux/actions'

import todosSlice, { addNewTodo, addTodos } from './todosSlice';
import { v4 as uuidv4 } from 'uuid';
import { resultSelector } from '../../redux/selector';
export default function TodoList() {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState('')
  const [priority, setPriority] = useState('Medium');
  const inputRef = useRef();
  const todoList = useSelector(resultSelector);

  const handleOnChangeInp = (e) => {
    setTodoName(e.target.value);
  }
  const handleOnChangeSelect = (value) => {

    setPriority(value);
  }
  const handleAddButton = () => {
    // dispatch(
    //   todosSlice.actions.addTodo({
    //     id: uuidv4(),
    //     name: todoName,
    //     priority: priority,
    //     completed: false,
    //   }))

    dispatch(addNewTodo({
      id: uuidv4(),
      name: todoName,
      priority: priority,
      completed: false,
    }))

    //Ví dụ về thunk action
    // dispatch(
    //   addTodos({
    //     id: uuidv4(),
    //     name: todoName,
    //     priority: priority,
    //     completed: false,
    //   }))

    setTodoName('')
    setPriority('Medium')
    inputRef.current.focus()
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {/* <Todo name='Learn React' priority='High' />
        <Todo name='Learn Redux' priority='Medium' />
        <Todo name='Learn JavaScript' priority='Low' /> */}
        {todoList.map(todo => (
          <Todo key={todo.id} id={todo.id} name={todo.name} priority={todo.priority} completed={todo.completed} />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input ref={inputRef} value={todoName} onChange={handleOnChangeInp} />
          <Select defaultValue="Medium" value={priority} onChange={handleOnChangeSelect}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddButton}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
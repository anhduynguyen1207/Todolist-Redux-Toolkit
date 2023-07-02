import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useState } from 'react';
import { useDispatch, } from 'react-redux';
// import { searchTodo, filterStatusTodo, filterPriorityTodo } from '../../redux/actions';
import filtersSlice from './filtersSlice';

const { Search } = Input;

export default function Filters() {
  const [srchText, setSrchText] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterPriority, setFilterPriority] = useState([])
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSrchText(e.target.value);
    dispatch(filtersSlice.actions.searchTodo(e.target.value));
  };

  const handleStatus = (e) => {
    setFilterStatus(e.target.value);
    dispatch(filtersSlice.actions.Status(e.target.value));
  }
  const handlePriorityChange = (value) => {
    setFilterPriority(value);
    dispatch(filtersSlice.actions.Priorities(value));
  }

  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search placeholder='input search text' value={srchText} onChange={handleSearch} />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={filterStatus} onChange={handleStatus}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          value={filterPriority}
          onChange={handlePriorityChange}
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
        >
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
      </Col>
    </Row>
  );
}

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteGroup, setGroupRange } from '../redux/action';
import '../styles/Group.css';
import { MdDelete } from "react-icons/md";

const Group = ({ group, index }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteGroup(index));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setGroupRange(index, name === 'from' ? value : group.from, name === 'to' ? value : group.to));
    };

    return (
      <div className="group">
        Group {index + 1}
        <input
          type="number"
          name="from"
          value={group.from}
          onChange={handleChange}
          placeholder="From"
        />
        <input
          type="number"
          name="to"
          value={group.to}
          onChange={handleChange}
          placeholder="To"
        />
        <button onClick={handleDelete} className="delete-btn">
          <MdDelete />
        </button>
      </div>
    );
};

export default Group;

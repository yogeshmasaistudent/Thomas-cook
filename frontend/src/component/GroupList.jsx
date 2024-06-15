import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGroup, fetchTodoStatus, setNewTo } from '../redux/action';
import Group from './Group';
import '../styles/GroupList.css';
import axios from 'axios';

const GroupList = () => {
    const groups = useSelector(state => state.groups);
    const newTo = useSelector(state => state.newTo);
    const dispatch = useDispatch();

    const [newFrom, setNewFrom] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (groups.length > 0) {
            const lastGroup = groups[groups.length - 1];
            setNewFrom(+(lastGroup.to) + 1);
            dispatch(setNewTo(10));
        } else {
            setNewFrom(1);
            dispatch(setNewTo(10));
        }
    }, [groups, dispatch]);

    const handleAddGroup = () => {
        let isValid = true;
        setError('');

        if (groups.length > 0) {
            const lastGroup = groups[groups.length - 1];
            if (newFrom !== +(lastGroup.to) + 1) {
                isValid = false;
                setError(`The starting value must be ${+(lastGroup.to) + 1}.`);
            }
        }

        if (newFrom > 10) {
            isValid = false;
            setError('The range exceeds the maximum value of 10.');
        }

        if (isValid) {
            dispatch(addGroup());
            setShowInput(false);
        }
    };

    const handleShowStatus = () => {
        groups.forEach((group, index) => {
            const promises = [];
            for (let i = group.from; i <= group.to; i++) {
                promises.push(axios.get(`https://jsonplaceholder.typicode.com/todos/${i}`));
            }
            Promise.all(promises).then(results => {
                const groupStatus = results.map(res => res.data.completed ? 'Done' : 'Not Done');
                dispatch(fetchTodoStatus(index, groupStatus));
            });
        });
    };

    const handleShowInput = () => {
        setShowInput(true);
        if (groups.length > 0) {
            const lastGroup = groups[groups.length - 1];
            setNewFrom(+(lastGroup.to) + 1);
            dispatch(setNewTo(10));
        } else {
            setNewFrom(1);
            dispatch(setNewTo(10));
        }
        setError('');
    };

    return (
        <div className="group-list">
            {groups.map((group, index) => (
                <Group key={index} group={group} index={index} />
            ))}
            {showInput && (
                <div className="new-group-inputs">
                    <input
                        type="number"
                        value={newFrom}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setNewFrom(value);
                            if (groups.length > 0) {
                                const lastGroup = groups[groups.length - 1];
                                if (value <= lastGroup.to) {
                                    setError(`The starting value must be greater than ${lastGroup.to}.`);
                                } else {
                                    setError('');
                                }
                            }
                        }}
                    />
                    <input
                        type="number"
                        value={newTo}
                        onChange={(e) => dispatch(setNewTo(parseInt(e.target.value)))}
                    />
                    {error && <span className="error">{error}</span>}
                    <button className="confirm-add-group-btn" onClick={handleAddGroup}>Confirm</button>
                </div>
            )}
            <button className="add-group-btn" onClick={handleShowInput}>Add Group</button>
            <button className="show-status-btn" onClick={handleShowStatus}>Show Status</button>
        </div>
    );
};

export default GroupList;

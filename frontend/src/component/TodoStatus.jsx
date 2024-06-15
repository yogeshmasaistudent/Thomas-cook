import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/TodoStatus.css';

const TodoStatus = () => {
    const status = useSelector(state => state.status);

    return (
        <div className="todo-status">
            {status.map((groupStatus, index) => (
                <div key={index} className="group-status">
                    <div className="status-body">
                        {groupStatus ? groupStatus.map((status, i) => (
                            <span key={i} className={`status-item ${status === 'Done' ? 'completed' : 'not-completed'}`}>
                                {console.log(status)}
                                ({i + 1}) {status === 'Done' ? "True" : "False"}
                            </span>
                        )) : 'Fetching...'}
                    </div>
                    <div className="status-icon">✔️</div>
                </div>
            ))}
        </div>
    );
};

export default TodoStatus;

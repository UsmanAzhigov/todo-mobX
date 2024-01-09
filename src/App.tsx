import React, { FC, useState } from 'react';
import * as styles from './styles/styles.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { ImRadioUnchecked } from 'react-icons/im';
import { IoLogoJavascript } from 'react-icons/io5';
import { FaCheckCircle, FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';

import { Button } from 'antd';
import { TaskStore } from './store/taskStore';

const App: FC = () => {
  const taskStore = new TaskStore();
  const [input, setInput] = useState('');

  const [parent, enableAnimations] = useAutoAnimate();

  const sortedTasks = [...taskStore.tasks].sort((a, b) => {
    if (taskStore.sortOrder === 'asc') {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  });

  const addTask = () => {
    taskStore.addTask();
  };

  const onChecked = (index: number) => {
    taskStore.onChecked(index);
  };

  const onDelete = (index: number) => {
    taskStore.onDelete(index);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <IoLogoJavascript />
          Список задач
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputStyle}
            placeholder="Введите текст...."
            value={taskStore.input}
            onChange={(event) => taskStore.setInput(event.target.value)}
          />
          <button className={styles.btnAdd} disabled={!taskStore.input} onClick={addTask}>
            +
          </button>
        </div>
      </div>
      <div>
        <h2 className={styles.allTask}>
          <span onClick={taskStore.toggleSortOrder} className={styles.sortOrder}>
            {taskStore.sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />}
          </span>
          Все задачи:
        </h2>
        <ul className={styles.listTask} ref={parent}>
          {sortedTasks.map((task, index) => (
            <li key={index} className={styles.task}>
              <div className={styles.taskName} onClick={() => onChecked(index)}>
                {taskStore.checkedTasks.includes(index) ? <FaCheckCircle /> : <ImRadioUnchecked />}
                {task}
              </div>
              <div className={styles.btnGroup}>
                <MdEdit style={{ cursor: 'pointer', width: '24px', height: '24px' }} />
                <MdDelete
                  style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                  onClick={() => onDelete(index)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.btnGroupDelete}>
        <Button type="primary" danger onClick={taskStore.allClear}>
          Очистить все
        </Button>
        <Button type="primary" danger onClick={taskStore.onDeleteSelected}>
          Удалить выбранное
        </Button>
      </div>
    </div>
  );
};

export default App;

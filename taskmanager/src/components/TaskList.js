import TaskItem from './TaskItem';

const TaskList = ({ tasks, reloadTasks }) => {
  return tasks.map(task => (
    <TaskItem key={task._id} task={task} reloadTasks={reloadTasks} />
  ));
};

export default TaskList;

import React from "react";
import { useParams } from "react-router-dom";

const TaskPage = () => {
  const { id } = useParams();
  return <h1>Task Details for ID: {id}</h1>;
};

export default TaskPage;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Read from './components/Read';
import Create from './components/Create';
import Edit from './components/Edit';
import CompletedTasks from './components/CompletedTasks';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/read" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/completed-tasks" element={<CompletedTasks />} />
      </Routes>
    </Router>
  );
}

export default App;

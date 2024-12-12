import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Read from './components/Read';
import Create from './components/Create';
import Edit from './components/Edit';
import HomePage from './components/HomePage';
import CompletedTasks from './components/CompletedTasks';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* Default route redirects from root (/) to /HomePage */}
        <Route path="/" element={<Navigate to="/HomePage" />} />
        
        {/* Other routes */}
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/read" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/completed-tasks" element={<CompletedTasks />} />
      </Routes>
    </Router>
  );
}

export default App;

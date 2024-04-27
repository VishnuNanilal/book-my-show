import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';
import { Provider } from 'react-redux'
import store from './redux/store'
import ProtectedRoute from './components/ProtectedRoute';
// import ShowRequestApproval from './components/business/ShowRequestApproval';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/*' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

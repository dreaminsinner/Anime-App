import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './Redux/reducers';
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/login/Register";
import {PrivateRoute} from "./utils/PrivateRoute";
import Logout from "./components/login/Logout";
import AnimePage from "./components/animePage/AnimePage";
import AnimeSearch from "./components/animeSearch/AnimeSearch";
import Profile from "./components/profile/Profile";
import AdminPage from "./components/adminPage/AdminPage";
import EditUser from "./components/adminPage/EditUser";
import AddUser from "./components/adminPage/AddUser";
import {AdminRoute} from "./utils/AdminRoute";

const store = createStore(rootReducer);

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Register/>}/>
                        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                        <Route path='/animes/*' element={<PrivateRoute><AnimePage/></PrivateRoute>}/>
                        <Route path='/anime' element={<PrivateRoute><AnimeSearch/></PrivateRoute>}/>
                        <Route path='/profile/*' element={<PrivateRoute><Profile/></PrivateRoute>}/>
                        <Route path='/adminPage' element={<AdminRoute><AdminPage/></AdminRoute>}/>
                        <Route path='/adminPage/editUser/*' element={<AdminRoute><EditUser/></AdminRoute>}/>
                        <Route path='/adminPage/addUser' element={<AdminRoute><AddUser/></AdminRoute>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;

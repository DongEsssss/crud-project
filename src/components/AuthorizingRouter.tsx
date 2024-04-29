import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Main from './Main'
import Home from './page/home/Home'
import User from './page/user/User';
import Userdetail from './page/userdetail/userdetail';

const AuthorizingRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />

                    <Route path='user' element={<Outlet />} >
                        <Route index element={<User />} />
                        <Route path=':id' element={<Outlet />}>
                            <Route
                                index
                                element={<Userdetail />}
                            />
                        </Route>
                    </Route>

                </Route>
            </Routes>
        </Router>
    )
}

export default AuthorizingRouter

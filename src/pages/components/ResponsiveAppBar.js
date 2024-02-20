import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../../auth";

const Navbar = () => {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        setLogin(isLoggedIn())
        setUser(getCurrentUserDetail())
    }, [login])

    const [toggleMenu, setToggleMenu] = useState(false);

    const logout = () => {
        doLogout(() => {
            setLogin(false)
        })

    }

    return (
        <div className="navbar">
            <div className="navbar_logo">
                <Link to='/' style={{ textDecoration: "none" }}>
                    <p>Blogit</p>
                </Link>
            </div>
            <div className="navbar_links">
                {login ? (<>

                    <NavLink to='/dashboard/feed' style={{ textDecoration: "none" }} >
                        <p>Blogs</p>
                    </NavLink>
                    <NavLink to='/dashboard/write' style={{ textDecoration: "none" }} >
                        <p>Publish</p>
                    </NavLink>
                    <NavLink to='/dashboard/myfeed' style={{ textDecoration: "none" }} >
                        <p>{user.name}</p>
                    </NavLink>
                    <NavLink to='/dashboard/profile' style={{ textDecoration: "none" }} >
                        <p>Profile</p>
                    </NavLink>
                    <NavLink onClick={logout} to='/home' style={{ textDecoration: "none" }} >
                        <p>Logout</p>
                    </NavLink>
                </>) :
                    (<>
                        <NavLink to='/home' style={{ textDecoration: "none" }} >
                            <p>Home</p>
                        </NavLink>
                        <NavLink to='/login' style={{ textDecoration: "none" }} >
                            <p>Login</p>
                        </NavLink>
                        <NavLink to='/signup' style={{ textDecoration: "none" }} >
                            <p>Signup</p>
                        </NavLink>
                        <NavLink to='/about' style={{ textDecoration: "none" }} >
                            <p>About</p>
                        </NavLink>
                    </>)}
            </div>

            <div className="navbar_menu">
                {toggleMenu ?
                    <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} /> :
                    <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
                }
                {toggleMenu && (
                    <div className="navbar_menu_container scale-up-center">
                        <div className="navbar_menu_container_links">
                            {login && <>

                                <NavLink to='/dashboard/feed' style={{ textDecoration: "none" }} >
                                    <p>Blogs</p>
                                </NavLink>
                                <NavLink to='/dashboard/write' style={{ textDecoration: "none" }} >
                                    <p>Publish</p>
                                </NavLink>
                                <NavLink to='/dashboard/myfeed' style={{ textDecoration: "none" }} >
                                    <p>{user.name}</p>
                                </NavLink>
                                <NavLink to='/dashboard/profile' style={{ textDecoration: "none" }} >
                                    <p>Profile</p>
                                </NavLink>
                                <NavLink onClick={logout} to="/home" style={{ textDecoration: "none" }} >
                                    <p>Logout</p>
                                </NavLink>
                            </>}
                            {!login && <>
                                <NavLink to='/home' style={{ textDecoration: "none" }} >
                                    <p>Home</p>
                                </NavLink>
                                <NavLink to='/login' style={{ textDecoration: "none" }} >
                                    <p>Login</p>
                                </NavLink>
                                <NavLink to='/signup' style={{ textDecoration: "none" }} >
                                    <p>Signup</p>
                                </NavLink>
                                <NavLink to='/about' style={{ textDecoration: "none" }} >
                                    <p>About</p>
                                </NavLink>
                            </>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}

export default Navbar
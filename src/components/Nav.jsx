import React from "react";
import Logo from '../assets/k.jpg'
import './Nav.css'

function Nav() {
    return (
        <nav className="nav-wrapper">
            <div className="nav-content">
                <ul className="list-styled">
                    <li>
                        <img src={Logo} alt='logo' />
                    </li>
                    {/* <li>
                        <a className="link-styled">About</a>
                    </li> */}
                    <li>
                        <a className="link-styled">Experience</a>
                    </li>
                    <li>
                        <a className="link-styled">Resume</a>
                    </li>
                    <li>
                        <a className="link-styled">Skills</a>
                    </li>
                    <li>
                        <a className="link-styled">Projects</a>
                    </li>
                    <li>
                        <a className="link-styled">Roles</a>
                    </li>
                    <li>
                        <a className="link-styled">Achievements</a>
                    </li>
                    <li>
                        <a className="link-styled">Certificates</a>
                    </li>
                    <li>
                        <a className="link-styled">Educations</a>
                    </li>
                </ul>
            </div>

        </nav>

    );
}

export default Nav;
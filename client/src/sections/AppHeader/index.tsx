import React from 'react'
import {Layout} from 'antd'
import {NavLink} from 'react-router-dom'
import logo from './assests/tinyhouse-logo.png'
import {MenuItems} from "./components/MenuItems";
import {Viewer} from "../../lib/types";

interface AppHeaderProps {
    viewer: Viewer
    setViewer: (viewer: Viewer) => void
}

const {Header} = Layout;

export function AppHeader({viewer, setViewer}: AppHeaderProps) {
    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                    <NavLink to="/">
                        <img src={logo} alt="TinyHouse logo"/>
                    </NavLink>
                </div>
            </div>
            <div className="app-header__menu-section">
                <MenuItems viewer={viewer} setViewer={setViewer} />
            </div>
        </Header>
    )
}

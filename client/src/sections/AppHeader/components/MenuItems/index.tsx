import React from 'react'
import {NavLink} from 'react-router-dom'
import {useMutation} from "@apollo/client";
import {Avatar, Button, Menu} from 'antd'
import {HomeOutlined, UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {Viewer} from "../../../../lib/types";
import {LOG_OUT} from "../../../../lib/graphql/mutations/LogOut";
import {LogOut as LogOutData} from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut'
import {displaySuccessNotification, displayErrorMessage} from "../../../../lib/utils";

interface MenuItemsProps {
    viewer: Viewer
    setViewer: (viewer: Viewer) => void
}

const {Item, SubMenu} = Menu

export function MenuItems({viewer, setViewer}: MenuItemsProps) {
    const [logOut] = useMutation<LogOutData>(LOG_OUT, {
        onCompleted: data => {
            if (data && data.logOut) {
                setViewer(data.logOut)
                displaySuccessNotification("You've successfully logged out!")
            }
        },
        onError: error => {
            displayErrorMessage("Sorry, we weren't able to to log you out. Please try again later!")
        }
    })

    const handleLogout = async () => {
        await logOut();
    }

    const subMenuLogin = viewer.id && viewer.avatar ? (
        <SubMenu title={<Avatar src={viewer.avatar} />}>
            <Item key="/user">
                <NavLink to={`/user/${viewer.id}`}>
                    <UserOutlined></UserOutlined>
                    Profile
                </NavLink>
            </Item>
            <Item key="/logout" onClick={handleLogout}>
                <LogoutOutlined></LogoutOutlined>
                Log out
            </Item>
        </SubMenu>
    ) : (
        <Item>
            <NavLink to="/login">
                <Button type="primary">Sign In</Button>
            </NavLink>
        </Item>
    );

    return (
        <Menu mode="horizontal" selectable={false} className="menu">
            <Item key="/host">
                <NavLink to="/host">
                    <HomeOutlined/>
                    Host
                </NavLink>
            </Item>
            {subMenuLogin}
        </Menu>
    )
}
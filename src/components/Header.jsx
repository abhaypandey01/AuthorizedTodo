import React from 'react'
import { useSelector } from 'react-redux'
import { Container, LogoutBtn } from "./index"
import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.user.status)

    const navItems = [
        {
            name: "Home",
            slug: "/",
            isActive: true
        },
        {
            name: "Login",
            slug: "/login",
            isActive: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            isActive: !authStatus
        }, {
            name: "List All Todos",
            slug: "/list-todos",
            isActive: authStatus
        }, {
            name: "Add Todo",
            slug: "/add-todo",
            isActive: authStatus
        },

    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container >
                <nav className='flex'>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.isActive ?
                                (
                                    <li key={item.name}>
                                        <button onClick={() => navigate(item.slug)} className='text-white inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-800 rounded-full'>{item.name}</button>
                                    </li>
                                ) : null)}
                        {<li>
                            <LogoutBtn />
                        </li>}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
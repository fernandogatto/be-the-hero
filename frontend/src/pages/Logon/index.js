import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './style.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
    const [id, setId] = useState('')
    const [isDark, setIsDark] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('theme-color')

        if(currentThemeColor === 'theme-dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
    }, [])

    async function handleLogin(event) {
        event.preventDefault()

        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch(err) {
            alert('Falha no Login')
        }
    }

    const handleSwitchClick = () => {
        if(isDark) {
            localStorage.setItem('theme-color', 'light-theme')
            setIsDark(false)
        } else {
            localStorage.setItem('theme-color', 'theme-dark')
            setIsDark(true)
        }
    }

    return (
        <div className={`app ${isDark ? 'theme-dark' : ''}`}>
            <Helmet bodyAttributes={{style: `${isDark ? 'background-color: #333;' : ''}`}}/>

            <div className="logon-container">
                <div className="theme-switcher-wrap">
                    <label className={`theme-switcher-label ${isDark ? 'active' : ''}`}
                        onClick={handleSwitchClick}
                    >
                        <div className="switch-path">
                            <div className="switch-handle"></div>
                        </div>
                    </label>
                </div>
                
                <div className="logon-content">
                    <section className="form">
                        <img src={logoImg} alt="Ne The Hero"/>

                        <form onSubmit={handleLogin}>
                            <h1>Faça seu logon</h1>

                            <input 
                                placeholder="Sua ID"
                                value={id}
                                onChange={event => setId(event.target.value)}
                            />
                            <button className="button" type="submit">Entrar</button>

                            <Link className="back-link" to="/register">
                                <FiLogIn size={16} color="#e02041"/>
                                Não tenho cadastro
                            </Link>
                        </form>
                    </section>
                    
                    <img src={heroesImg} alt="Heroes"/>
                </div>
            </div>
        </div>
    )
}
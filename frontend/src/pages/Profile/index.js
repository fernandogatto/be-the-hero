import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import './style.css'

export default function Profile() {
    const [incidents, setIncidents] = useState([])
    const [isDark, setIsDark] = useState(false)
    
    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('theme-color')

        if(currentThemeColor === 'theme-dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
    }, [])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err) {
            alert('Erro ao deletar caso')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
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

            <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem vinda, {ongName}</span>

                    <div className="theme-switcher-wrap">
                        <label className={`theme-switcher-label ${isDark ? 'active' : ''}`}
                            onClick={handleSwitchClick}
                        >
                            <div className="switch-path">
                                <div className="switch-handle"></div>
                            </div>
                        </label>
                    </div>

                    <Link className="button" to="/incidents/new">
                        Cadastrar novo caso
                    </Link>

                    <button onClick={handleLogout} type="button">
                        <FiPower size={18} color="#e02041"/>
                    </button>
                </header>

                <h1>Casos cadastrados</h1>

                <ul>
                    {incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>

                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
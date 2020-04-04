import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiArrowLeft } from 'react-icons/fi'

import './style.css'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [isDark, setIsDark] = useState(false)

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('theme-color')

        if(currentThemeColor === 'theme-dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
    }, [])

    async function handleNewIncident(event) {
        event.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile')
        } catch(err) {
            alert('Erro ao cadastrar caso')
        }
    }
    
    const handleSwitchClick = () => {
        if(isDark) {
            localStorage.setItem('theme-color', 'theme-light')
            setIsDark(false)
        } else {
            localStorage.setItem('theme-color', 'theme-dark')
            setIsDark(true)
        }
    }

    return (
        <div className={`app ${isDark ? 'theme-dark' : ''}`}>
            <Helmet bodyAttributes={{style: `${isDark ? 'background-color: #333;' : ''}`}}/>


            <div className="new-incident-container">
                <div className="theme-switcher-wrap">
                    <label className={`theme-switcher-label ${isDark ? 'active' : ''}`}
                        onClick={handleSwitchClick}
                    >
                        <div className="switch-path">
                            <div className="switch-handle"></div>
                        </div>
                    </label>
                </div>

                <div className="content">
                    <div className="card">
                        <section>
                            <img src={logoImg} alt="Ne The Hero"/>

                            <h1>Cadastrar novo caso</h1>
                            <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                            <Link className="back-link" to="/profile">
                                <FiArrowLeft size={16} color="#e02041"/>
                                Voltar para home
                            </Link>
                        </section>

                        <form onSubmit={handleNewIncident}>
                            <input type="text" 
                                placeholder="Título do caso"
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                            />

                            <textarea 
                                placeholder="Descrição"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />

                            <input type="number" 
                                placeholder="Valor em Reais"
                                value={value}
                                onChange={event => setValue(event.target.value)}
                            />


                            <button className="button" type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
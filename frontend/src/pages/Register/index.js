import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './style.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
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
    
    async function handleRegister(event) {
        event.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const response = await api.post('ongs', data)

            alert(`Seu ID de acesso: ${response.data.id}`)

            history.push('/')
        } catch(err) {
            alert('Erro ao cadastrar')
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
            
            <div className="register-container">
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

                            <h1>Cadastro</h1>
                            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

                            <Link className="back-link" to="/">
                                <FiArrowLeft size={16} color="#e02041"/>
                                Não tenho cadastro
                            </Link>
                        </section>

                        <form onSubmit={handleRegister}>
                            <input 
                                type="text" 
                                placeholder="Nome da ONG"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                            <input 
                                type="email" 
                                placeholder="E-mail"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <input 
                                type="tel" 
                                placeholder="WhatsApp"
                                value={whatsapp}
                                onChange={event => setWhatsapp(event.target.value)}
                            />
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Cidade"
                                    value={city}
                                    onChange={event => setCity(event.target.value)}
                                />
                                <input 
                                    type="text" 
                                    placeholder="UF" 
                                    style={{ width: 80 }}
                                    value={uf}
                                    onChange={event => setUf(event.target.value)}    
                                />
                            </div>

                            <button className="button" type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLocalStorage, useAsyncFn } from 'react-use'
import axios from 'axios'
import { format, formatISO } from 'date-fns'

import { Icon, Card, DateSelect} from '~/components'

import.meta.env.VITE_API_URL

export const Profile = () => {
    const navigate = useNavigate ()
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [auth, setAuth] = useLocalStorage ('auth', {})

    const [hunches, fetchHunches] = useAsyncFn(async() =>{
        const res = await axios ({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${auth.user.username}`
        })

        const hunches = res.data.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})
        return hunches

    })
    const [games, fetchGames] = useAsyncFn (async(params) => {
        const res = await axios ({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })

        return res.data
})

const logout = () => {
    setAuth({})
    navigate('/')
}

const isLoading = games.loading || hunches.loading 
const hasError = games.error || hunches.error
const isDone = !isLoading && !hasError

useEffect(() => {
    fetchHunches()
},[])

useEffect(() => {
    fetchGames({gameTime: currentDate})
    
}, [currentDate])
    
    //if (!auth?.user?.id) {
    //    return <Navigate to= "/" replace={true} />
    //}

    
    return (
        <>
            <header className="bg-red-500 text-white p-4">
                <div className="container max-w-3xl p-4 flex justify-between p-4">
                    <img src="/imgs/logo_white.svg" className="w-28 md:w-40"/>
                    
                    {auth?.user?.id &&(
                    <div onClick={logout} className="p-2 cursor-pointer">
                        <Icon name="back" />
                        Sair
                    </div>)}
                </div>
            </header>
            <main className="space-y-6">
                <section id="header" className="bg-red-500 text-white ">
                    <div className='container max-w-3xl space-y-2 p-4'>
                        
                    <h3 className='text-2xl font-bold'>{auth.user.name}</h3>
                    </div>
                </section>
                    

                <section id="content" className='container max-w-3xl p-4 space-y-4'>
                    <h2 className="text-red-500 text-xl font-bold">Seus palpites</h2>

                    <DateSelect  currentDate={currentDate} onChange={setDate}/>
                    
                    <div className='space-y-4'>
                        {isLoading && 'Carregando jogos ...'}
                        {hasError && 'Ops, acho que deu algo errado...'}

                        


                        {isDone && games.value?.map(game =>(
                            <Card 
                                key={game.id}
                                gameId={game.id}
                                homeTeam={game.homeTeam }
                                awayTeam={game.awayTeam }
                                gameTime={format(new Date(game.gameTime), 'H:mm')}
                                homeTeamScore={hunches?.value?.[game.id]?.homeTeamScore || ''}
                                awayTeamScore={hunches?.value?.[game.id]?.awayTeamScore || ''}
                                disabled={true}
                                />
                            ))}
                        
                    </div>
                    <div className='p-4 flex space-x-4 items-center'>
                        <a href="/dashboard">
                            <Icon name="back" className="h-5 text-red-500"/>
                        </a>
                        <h2 className="text-red-500 text-xl font-bold"> voltar</h2>
                    </div>
                </section>
            </main>
        </>

    )
}
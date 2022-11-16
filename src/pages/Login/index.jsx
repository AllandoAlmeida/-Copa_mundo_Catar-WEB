import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useLocalStorage} from 'react-use'
import {Navigate} from 'react-router-dom'
import {Icon, Input } from '~/components'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('🟥 Esse e-mail não é válido!').required('🟥 Preencher seu e-emil'),
    password: Yup.string().required('🟥 Digite uma senha')
  })

export const Login = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})

        
    const formik = useFormik({
        onSubmit: async (values) => {
            const res = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/login',
                auth: {
                    username: values.email,
                    password: values.password
                }

            })
            
            setAuth(res.data)

            //const auth = localStorage.getItem('auth')
            //console.log(res.data)
            //console.log(JSON.parse(auth))

        },
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema
    })

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" repalce={true} />
    }

     return(
        <div>
            <header className="flex p-4 border-b border-red-300">
            
                    <div className="container max-w-xl flex justify-center">
                        <img src="/imgs/logo_red.svg" alt="logo" className="w-32 md:w-40"/>
                    </div>
            </header>

            <main className="container max-xl p-4">
                <div className="p-4">
                    
                    <h2 className="text-xl font-bold">Acesse a sua conta</h2>
                </div>
                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    
                  
                    <Input
                            type="text"
                            name="email"
                            label="Seu e-mail"
                            placeholder="Digite o Seu e-mail"
                            error={formik.touched.email && formik.errors.email}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                    />
                    <Input
                            type="password"
                            name="password"
                            label="Sua Senha"
                            placeholder="Digite sua senha"
                            error={formik.touched.password &&formik.errors.password}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                    />
                    <button 
                        className="block w-full text-center text-white bg-red-500 px-6 py-3 rounded-xl disabled:opacity-20"
                        type="submit" 
                        disabled={!formik.isValid || formik.isSubmitting}>
                        {formik.isSubmitting ? 'Carregando...' :'Acesse a sua Conta'}
                    </button>
                    <div className='p-4 flex space-x-4 items-center'>
                        <a href="/">
                            <Icon name="back" className="h-6"/>
                        </a>
                        <h2 className="text-xl font-bold">Retornar</h2>
                    </div>
                 </form>
            </main>
        </div>
    )
}
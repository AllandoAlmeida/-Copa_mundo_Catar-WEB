import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {Navigate} from 'react-router-dom'
import {useLocalStorage} from 'react-use'
import {Icon, Input} from '~/components'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Prencha seu nome'),
    username: Yup.string().required('Prencha seu nome de usuário'),
    email: Yup.string().email('informe um e-mail válido ').required('informe seu e-mail'),
    password: Yup.string().required('Digite uma senha')
  })

export const Signup = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})
    
    const formik = useFormik({
        onSubmit: async (values) => {
            const res = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/users',
                data: values

            })
            
            console.log(res.data)
        },
        initialValues: {
            name: '',
            username: '',
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
                    
                    <h2 className="text-xl font-bold">Crie a sua Conta</h2>
                </div>
                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input
                            type="text"
                            name="name"
                            label="seu nome"
                            placeholder="Digite seu nome"
                            error={formik.touched.name && formik.errors.name}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                    />
                    <Input
                            type="text"
                            name="username"
                            label="Seu nome de Usuário"
                            placeholder="Digite um nome de usuário"
                            error={formik.touched.username && formik.errors.username}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                    />
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
                        {formik.isSubmitting ? 'Carregando...' :'Criar minha conta'}
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
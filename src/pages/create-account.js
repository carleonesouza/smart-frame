import React, { useState } from 'react'
import Layout from '../components/Layout'
import firebase from '../lib/firebase'
import { navigateTo, Link } from 'gatsby'
const CreateAccount = () => {
    const [form, setForm] = useState({
        email:'',
        passwd:'',
        passwdConf:''
    })
    const onChange = evt => {
        const value = evt.target.value
        const field = evt.target.name
        setForm(oldForm => ({
            ...oldForm,
            [field]: value

        }))
        setError('')
    }
const [error, setError] = useState('')

const create = () => {
    setError('')
    if(form.passwd.length >= 6 && form.passwd === form.passwdConf){
        firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.passwd)
        .then(() =>{
            navigateTo('/app')
        })
        .catch(function(error) {
            setError(error.message)
          });
    }
   
}

let classError = ''
let classIcon = ' rounded-full p-1 fill-current mr-2 '

if(form.passwd ===  form.passwdConf && form.passwd.length >=6 ){
classError += ' text-green-700 '
classIcon += ' bg-green-200 text-green-700 '
}
if(form.passwd !== form.passwdConf || form.passwd.length < 6){
classError += ' text-red-700 '
classIcon += ' bg-red-200 text-red-700 '
}
    return (
        <Layout>
            <div className='container max-w-full mx-auto md:py-24 px-6'>
                <div className='max-w-sm mx-auto px-6'>
                    <div className='relative flex flex-wrap'>
                        <div className='w-full relative'>
                            <div className='md:mt-6'>
                                <div className='text-center font-semibold text-black'>Create Account</div>
                                <div className='text-center font-base text-black'>start to use SmartFrame for free</div>
                                <form className='mt-8'>
                                    <div className='mx-auto max-w-lg '>
                                        <div className='py-1'>
                                            <span className='px-1 text-sm text-gray-600'>Email</span>
                                            <input placeholder='' type='email'
                                                value={form.email}
                                                onChange={onChange}
                                                name='email'
                                                className='text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none' /></div>
                                        <div className='py-1'>
                                            <span className='px-1 text-sm text-gray-600'>Password</span>
                                            <input placeholder='' type='password' x-model='password'
                                                value={form.passwd}
                                                onChange={onChange}
                                                name='passwd'
                                                className='text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none' />
                                        </div>
                                        <div className='py-1'>
                                            <span className='px-1 text-sm text-gray-600'>Password Confirm</span>
                                            <input placeholder='' type='password' x-model='password_confirm'
                                                value={form.passwdConf}
                                                onChange={onChange}
                                                name='passwdConf'
                                                className='text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none' />
                                        </div>
                                        <div className='flex justify-start mt-3 ml-4 p-1'>
                                            <ul>
                                                <li className='flex items-center py-1'>
                                                    <div className={classIcon}>
                                                        <svg className='w-4 h-4' 
                                                        fill='none' 
                                                        viewBox='0 0 24 24' 
                                                        stroke='currentColor'>
                                                        {form.passwd === form.passwdConf &&
                                                            <path strokeLinecap='round'
                                                                strokeLinejoin='round' strokeWidth='2'
                                                                d='M5 13l4 4L19 7' />
                                                                }
                                                        {form.passwd !== form.passwdConf && 
                                                            <path strokeLinecap='round'
                                                                strokeLinejoin='round' strokeWidth='2'
                                                                d='M6 18L18 6M6 6l12 12' />}
                                                        </svg>
                                                    </div>
                                                    <span className = {classError}>
                                                            {form.passwd === form.passwdConf && form.passwd.length >= 6 && 'Passwords match'}
                                                            {form.passwd === form.passwdConf && form.passwd.length < 6 && 'Passwords must be at least 6 characters long'}
                                                            {form.passwd !== form.passwdConf && 'Passwords do not match'}
                                                        </span>
                                                </li>

                                               {error && <li className='flex items-center py-1'>
                                                    <div className={'rounded-full p-1 fill-current bg-red-200 text-red-700 mr-2'}>

                                                        <svg className='w-4 h-4' 
                                                        fill='none' 
                                                        viewBox='0 0 24 24'
                                                         stroke='currentColor'>
                                                            <path strokeLinecap='round'
                                                                strokeLinejoin='round' strokeWidth='2'
                                                                d='M6 18L18 6M6 6l12 12' />
                                                        </svg>
                                                    </div>
                                                    <span className = {classError}>
                                                        {error}
                                                    </span>
                                                </li>}
                                            </ul>
                                        </div>
                                        <button type='button' className='mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black'
                                        onClick = {create} >Register</button>
                                    </div>
                                </form>

                                <div className='text-sm font-semibold block py-6 flex justify-center'>
                                    <Link to='/sign-in' className='text-black font-normal border-b-2 border-gray-200 hover:border-teal-500'>You're already member?
                                        <span className='text-black font-semibold'>{' '}Login</span>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default CreateAccount
import React, { useState } from 'react'
import firebase from '../../../lib/firebase'
import { useAuth } from '../../../lib/AuthContext'


const Alert = () => {
    return(
        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div className="flex">
                <div className="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                <div>
                    <p className="font-bold">Your password has changed successfully!</p>
                </div>
            </div>
        </div>
    )
}

const UpdatePassword = () => {
    const auth = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({
        currentPasswd:'',
        newPasswd:'',
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


const updatePassword = async() => {
    setError('')
    if(form.newPasswd.length >= 6 && form.newPasswd === form.passwdConf){
        try{ 
        const user = firebase.auth().currentUser;
        const credential = firebase
        .auth.EmailAuthProvider.credential(
            auth.email,
            form.newPasswd
            );
        await user.reauthenticateWithCredential(credential)
        await user.updatePassword(form.newPasswd)
        setSuccess(true)

    } catch(err) {
        setError(err.message)
    }
    }
   
}

let classError = ''
let classIcon = ' rounded-full p-1 fill-current mr-2 '

if(form.newPasswd ===  form.passwdConf && form.newPasswd.length >=6 ){
classError += ' text-green-700 '
classIcon += ' bg-green-200 text-green-700 '
}
if(form.newPasswd !== form.passwdConf || form.newPasswd.length < 6){
classError += ' text-red-700 '
classIcon += ' bg-red-200 text-red-700 '
}
    return (
            <div className='container max-w-full mx-auto md:py-10 px-6'>
                <div className='max-w-sm mx-auto px-6'>
                    <div className='relative flex flex-wrap'>
                        <div className='w-full relative'>
                            <div className='md:mt-6'>
                                {success && <Alert/>}
                                {!success && 
                                    <>
                                    <div className='text-center font-semibold text-black'>Chenge your Password</div>
                                    <form className='mt-8' x-data="{currentPassword: '',password_confirm: ''}">
                                        <div className='mx-auto max-w-lg '>
                                        <div className='py-1'>
                                                <span className='px-1 text-sm text-gray-600'>Current Password</span>
                                                <input placeholder='' type='password' x-model='password'
                                                    value={form.currentPasswd}
                                                    onChange={onChange}
                                                    name='currentPasswd'
                                                    className='text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none' />
                                            </div>
                                            <div className='py-1'>
                                                <span className='px-1 text-sm text-gray-600'>New Password</span>
                                                <input placeholder='' type='password' x-model='password'
                                                    value={form.newPasswd}
                                                    onChange={onChange}
                                                    name='newPasswd'
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
                                                            {form.newPasswd === form.passwdConf &&
                                                                <path strokeLinecap='round'
                                                                    strokeLinejoin='round' strokeWidth='2'
                                                                    d='M5 13l4 4L19 7' />
                                                                    }
                                                            {form.newPasswd !== form.passwdConf && 
                                                                <path strokeLinecap='round'
                                                                    strokeLinejoin='round' strokeWidth='2'
                                                                    d='M6 18L18 6M6 6l12 12' />}
                                                            </svg>
                                                        </div>
                                                        <span className = {classError}>
                                                                {form.newPasswd === form.passwdConf && form.newPasswd.length >= 6 && 'Passwords match'}
                                                                {form.newPasswd === form.passwdConf && form.newPasswd.length < 6 && 'Passwords must be at least 6 characters long'}
                                                                {form.newPasswd !== form.passwdConf && 'Passwords do not match'}
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
                                            onClick = {updatePassword} >Register</button>
                                        </div>
                                    </form>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}


export default UpdatePassword
import React from 'react'
import { Link, navigate } from 'gatsby'
import { useAuth } from '../../lib/AuthContext'
import Loading from '../loading/loading-spinner'
import './styles.css'

const MyAccount = ({ signOut }) => {
    const auth = useAuth()
    return (
        <div className='dropdown inline-block py-2 px-4 rounded-lg'>
            <button className='bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center'>
                <span>{auth.name}</span>
            </button>
            <ul className='dropdown-content absolute hidden text-gray-700 pt-1'>
                <li><Link to='/app' className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>Home</Link></li>
                <Link to='/app/device' className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>Device</Link>
                <li><Link to='/app/update-password' className='bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>Update Password</Link></li>
                <li><button onClick={signOut} className='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>
                    Sign Out</button></li>
            </ul>
        </div>
    )
}

const Header = ({ app }) => {
    const auth = useAuth()
    const signOut = async () => {
        await auth.signOut()
        navigate('/')
    }
    return (
        <div className='bg-gray-200 px-4 py-4'>
            {!auth.isAuthReady && <div className='center'>
                <div className='mx-auto max-w-lg '>
                    <div className='py-1'>
                        {<Loading />}
                    </div>
                </div>
            </div>
            }
            {auth.isAuthReady &&
                <div className='bg-gray-200 px-4 py-4'>
                    <div className='w-full md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between'>
                        <div>
                            <Link to='/' className='inline-block py-2 text-gray-800 text-2xl font-bold'>SmartFrame</Link>
                        </div>

                        <div>
                            <div className='md:block'>
                                <Link to='/d' className='inline-block py-1 md:py-4 text-gray-600 mr-6 font-bold'>Open Player</Link>
                            </div>
                        </div>

                        <div className='md:block'>
                            {!auth.isAuth && <React.Fragment>
                                <Link to='/sign-in' className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6 '>Sign-in</Link>
                                <Link to='/create-account' className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'>Create account</Link>
                            </React.Fragment>}
                            {auth.isAuth && <React.Fragment>
                                {!app && <Link to='/app' className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'>Go to App</Link>}{' '}
                                <MyAccount signOut={signOut} />
                            </React.Fragment>}
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default Header
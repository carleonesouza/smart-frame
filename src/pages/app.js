import React, { useEffect, useState } from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import { useAuth } from '../lib/AuthContext'
import { navigate } from 'gatsby'
import CreateScene from '../client-side/app/CreateScene'
import Scenes from '../client-side/app/Scenes'
import UpdatePassword from '../client-side/app/UpdatePassword'
import Scene from '../client-side/app/Scene'
import Devices from '../client-side/app/Devices'


const ShowEmailNothification = () => {
    const auth = useAuth()
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        if(auth.isAuthReady && !auth.isAuth) {
            navigate('/sign-in')
        }
    },[auth])

    const resendEmailVerification = async() => {
        try{
            setError(false)
            await auth.resendEmailVerification()
            setEmailSent(true)
        }
        catch(err) {
            setError(true)
            setEmailSent(false)
        }
    }

    if (!auth.emailVerified){
        return (
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">Alert!</p>
                <p>Please, confirm your email address ({auth.email}) !</p>
                { !emailSent && <button onClick ={resendEmailVerification}>Click here to resend email confirmation</button>}
                { emailSent && 
                <React.Fragment>
                    <br/> Verification e-mail sent. Please, check your inbox and follow the instructions.
                </React.Fragment> 
                }
                { error && 
                <React.Fragment>
                    <br/> Error, try again in few minutes.
                </React.Fragment> 
                }
            </div>
        )
    }
    return null
} 

const App = () => {
    return (
            <Layout app>
                 <ShowEmailNothification/>
                <div className='container mx-auto mt-12'>
                    <Router basepath ='/app'>
                        <CreateScene path='/create-scene'/>
                        <Scenes path='/'/>
                        <Scene path='/scene/:sceneId'/>
                        <UpdatePassword path='update-password'/>
                        <Devices path='/device'/>
                    </Router>
                </div>
            </Layout>
    )
}

export default App
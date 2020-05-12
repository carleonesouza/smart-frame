import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../lib/AuthContext'
import firebase from '../../../lib/firebase'
import Loading from '../../../components/loading/loading-spinner'
import './styles.css'
import { Link } from 'gatsby'

const SceneF = ({ scene }) => {
    return (
        <div className='max-w-sm rounded overflow-hidden shadow-lg m-5'>
            <img className='w-full' src='https://source.unsplash.com/random/384x234' alt='Sunset in the mountains' />
            <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'><Link className='hover:underline' to={'/app/scene/' + scene.id} >{scene.name}</Link></div>
            </div>
        </div>
    )
}
const Scenes = () => {
    const auth = useAuth()
    const db = firebase.firestore()
    const [scenes, setScenes] = useState([])
    const [form, setForm] = useState({
        sceneName: '',
    })
    useEffect(() => {
        if (auth.isAuth) {
            db
            .collection('scenes')
            .doc(auth.uid)
            .collection('scenes')
            .onSnapshot(querySnapshot => {
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setScenes(docs)
            })
                
        }
    }, [db, auth])

    const createScene = () => {
        const newSceneRef = db
            .collection('scenes')
            .doc(auth.uid)
            .collection('scenes')
            .doc()
        newSceneRef.set({
            name: form.sceneName,
        })
    }

    const onChange = evt => {
        const value = evt.target.value
        const field = evt.target.name
        setForm(oldForm => ({
            ...oldForm,
            [field]: value

        }))
    }

    return (
        <>
            <div>
                {!auth.isAuthReady && <div className='center'>
                    <div className='mx-auto max-w-lg '>
                        <div className='py-1'>
                            {<Loading />}
                        </div>
                    </div>
                </div>
                }
                {auth.isAuthReady && <div className='container max-w-full mx-auto md:py-10 px-6'>
                    <div className='max-w-sm mx-auto px-6'>
                        <form className='w-full max-w-sm'>
                            <div className='mx-auto max-w-lg '>
                                <div className='py-1'>
                                    <input type='text' placeholder='' value={form.sceneName}
                                        onChange={onChange}
                                        name='sceneName' aria-label='Scene name'
                                        className='text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none' />
                                </div>
                                <button type='button' className='mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black'
                                    onClick={createScene} >Create Scene</button>
                            </div>
                        </form>
                    </div>
                </div>}
                <div className='grid grid-cols-3 gap-4'>
                    {
                        scenes.map(scene => <SceneF key={scene.id} scene={scene} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Scenes
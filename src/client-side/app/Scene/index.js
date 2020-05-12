import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../lib/AuthContext'
import firebase from '../../../lib/firebase'
import ChromaKey from './types/Chromakey'
import Image from './types/Image'

const FRAME_TYPES = { 
    chromakey:{ 
        key: 'chromakey',
        label: 'Add chromakey'
    },
    image:{
        key: 'image',
        label: 'Add image'
    },

}
const FrameComponents = {
    [FRAME_TYPES.chromakey.key]: ChromaKey,
    [FRAME_TYPES.image.key]: Image

}

const Scene = ({ sceneId }) => {
    const auth = useAuth()
    const db = firebase.firestore()
    const [scene, setScene] = useState([])
    const [frames, setFrames] = useState([])
    useEffect(() => {
        if (auth.isAuthReady) {
            db
                .collection('scenes')
                .doc(auth.uid)
                .collection('scenes')
                .doc(sceneId)
                .onSnapshot(querySnapshot => {
                    setScene({
                        ...querySnapshot.data(),
                        id: sceneId
                    })
                })
                db
                .collection('frames')
                .doc(auth.uid)
                .collection(sceneId)
                .onSnapshot(querySnapshot => {
                    const currentFrames = []
                    querySnapshot.forEach(doc => {
                        currentFrames.push({
                            ...doc.data(),
                            id: doc.id
                        })
                      
                    })
                    setFrames(currentFrames)
                })
        }
    }, [db, auth, sceneId])
    const onKeyDown = (type) => evt => {
        if (evt.keyCode === 13) {
            createFrame(type)()
        }
        
    }
    const createFrame = (type) => () => {
        const newSceneRef = db
            .collection('frames')
            .doc(auth.uid)
            .collection(sceneId)
            .doc()
        newSceneRef.set({
            type
        })
    }
    return (
        <div>
            <h1 className='pb-3 font-bold'> Scene: {scene.name}</h1>
            <div className='grid grid-cols-4 gap-4'>
                {Object.keys(FRAME_TYPES).map(key => {
                    return (
                        <button key={key} tabIndex='0' onClick={createFrame(key)} onKeyDown={onKeyDown(key)} 
                            className='bg-transparent hover:bg-blue-500 text-blue-700  h-32 w-32 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                            {FRAME_TYPES[key].label}
                        </button>
                    )
                }
                )}
            </div>
            <div>
                {
                    frames.map(frame => {
                        const CurrentComp = FrameComponents[frame.type]
                       return <CurrentComp key={frame.id} id={frame.id } frame={frame} uid={auth.uid} sceneId={sceneId} />
                    })
                }
            </div>
        </div>
    )
}

export default Scene
import React, { useEffect, useState } from 'react'
import firebase from '../lib/firebase'
import ChromaKeyView from '../client-side/app/Scene/types/Chromakey/chromaKeyView'
import ImageView from '../client-side/app/Scene/types/Image/imageView'
const db = firebase.firestore()


const D = () => {
    const [isReady, setIsReady] = useState(false)
    const [activated, setActivated] = useState(false)
    const [number, setNumber] = useState(0)
    const [device, setDevice] = useState({})
    const [currentDevice, setCurrentDevice] = useState({})
    const [frames, setFrames] = useState([])
    const [currentFrame, setCurrentFrame] = useState(0)

    useEffect(() => {
        if (!localStorage.getItem('deviceNumber')) {
            const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
            localStorage.setItem('deviceNumber', random)
            setNumber(localStorage.getItem(random))
        } else {
            setNumber(localStorage.getItem('deviceNumber'))
        }

    }, [])

    useEffect(() => {
        const alreadyActivated = !!localStorage.getItem('deviceNumber') && localStorage.getItem('owner')
        if (alreadyActivated) {
            setActivated(alreadyActivated)
        }
    }, [])

    useEffect(() => {
        if (!activated && number > 0) {
            db
                .collection('temp-devices')
                .doc(number)
                .set({
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    setIsReady(true)
                })
        }
    }, [activated, number])

    // Ativação
    useEffect(() => {
        let unsubscribe = null
        if (isReady && !activated && number > 0) {
            unsubscribe = db
                .collection('temp-devices')
                .doc(number)
                .onSnapshot(snap => {
                    const deviceData = snap.data()
                    if (deviceData) {
                        setDevice(deviceData)
                    }
                })
        }
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [isReady, activated, number])

    useEffect(() => {
        if (device && device.owner) {
            db
                .collection('devices')
                .doc(device.owner)
                .collection('devices')
                .doc(number)
                .set({
                    activated: true
                })
                .then(() => {
                    localStorage.setItem('owner', device.owner)
                    setActivated(true)
                    db
                        .collection('temp-devices')
                        .doc(number)
                        .delete()
                        .then(() => {
                            console.log('temp-device deleted!')
                        })
                })
        }
    }, [device, number])
    useEffect(() => {
        let unsubscribe = null

        if (activated) {
            unsubscribe = db
                .collection('devices')
                .doc(localStorage.getItem('owner'))
                .collection('devices')
                .doc(localStorage.getItem('deviceNumber'))
                .onSnapshot(snap => {
                    setCurrentDevice(snap.data())
                })
        }
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }

    }, [device, activated])

    useEffect(() => {
        let unsubscribe = null
        if(currentDevice.scene){ 
        if (activated) {
            unsubscribe = db
                .collection('frames')
                .doc(localStorage.getItem('owner'))
               .collection(currentDevice.scene)
                .onSnapshot(querySnapshot => {
                    const docs = []
                    querySnapshot.forEach(doc => {
                        docs.push({
                            ...doc.data(),
                            id: doc.id
                        })
                      
                    })
                    setFrames(docs)
                }) 
            }
            return () => {
                if (unsubscribe) {
                    unsubscribe()
                }
            }
    }

    }, [currentDevice.scene, activated])

    useEffect(() => {
        let timer = null
        if(activated && frames && frames.length > 0){
            timer = setInterval(() => {
                setCurrentFrame(old => (old+1)%frames.length)
            }, 3000)
        }
        return () => {
            if (timer) {
                clearInterval(timer)
            }
        }
    }, [activated, frames])

    let CurrentView = null
    if( frames && frames[currentFrame] && frames[currentFrame].type === 'chromakey'){
        CurrentView = ChromaKeyView
    }
    if( frames && frames[currentFrame] && frames[currentFrame].type === 'image'){
        CurrentView = ImageView
    }

    return (
        <div>
            <div className='container max-w-full mx-auto md:py-10 px-6 mt-10'>
                <div className='max-w-sm mx-auto px-6'>
                    {!activated && <h1>Device without authentiction: {number}</h1>}
                    {activated && <div className='absolute bottom-0 text-white right-0 bg-gray-800 p-2 text-xs font-bold'>Device ID: {number}</div>}
                    {activated && frames && CurrentView && <CurrentView frame={frames[currentFrame]}/>}
                    {
                        JSON.stringify(frames, null, 2)
                    }
                </div>
            </div>
        </div>
    )
}

export default D
import React, { useState, useEffect, useRef } from 'react'
import firebase from '../../../lib/firebase'
import { useAuth } from '../../../lib/AuthContext'


const ContentDevice = ({device, setSceneOnDevice, scenes}) => {
    const selectRef = useRef()
    const setScene = () => {
        setSceneOnDevice(device.id, selectRef.current.value)
    }
    return (
        <div className='p-6 border rounded'>
            <h4 className='font-bold'>Device: {device.id}</h4>
            <div className='w-full mb-6 '>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'  htmlFor={'select-'+device.id} >
                    Scene
        </label>
                <div className='relative'>
                <select ref={selectRef} className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id={'select-'+device.id}>
                        {scenes.map(scene => <option value={scene.id} key={scene.id}> {scene.name} </option>)}
                    </select>
                    <button onClick={setScene} className='mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block hover:text-white hover:bg-black'>
                        Define scene</button>
                </div>
            </div>
        </div>
    )
}

const Alert = ({ status }) => {
    return (
        <div className='mt-5'>
            {status && <div className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md' role='alert'>
                <div className='flex'>
                    <div className='py-1'><svg className='fill-current h-6 w-6 text-teal-500 mr-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' /></svg></div>
                    <div>
                        <p className='font-bold'> VALID </p>
                    </div>
                </div>
            </div>
            }
            {!status && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                <strong className='font-bold'> INVALID </strong>
                <span className='block sm:inline'>Something bad happened.</span>
            </div>}
        </div>
    )
}

const Device = () => {
    const auth = useAuth()
    const db = firebase.firestore()
    const [deviceStatus, setDeviceStatus] = useState(false)
    const [devices, setDevices] = useState([])
    const [scenes, setScenes] = useState([])
    const [form, setForm] = useState({
        deviceId: ''
    })
    useEffect(() => {
        if (auth.isAuthReady) {
            db
                .collection('devices')
                .doc(auth.uid)
                .collection('devices')
                .onSnapshot(querySnapshot => {
                    const docs = []
                    querySnapshot.forEach((doc) => {
                        docs.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    })
                    setDevices(docs)
                })
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
    }, [auth, db])
    const activateDevice = async () => {
        const docRef = db
            .collection('temp-devices')
            .doc(form.deviceId)

        const doc = await docRef.get()
        const deviceData = doc.data()


        if (deviceData) {
            setDeviceStatus(true)
            docRef.update({
                owner: auth.uid
            })
        } else {
            setDeviceStatus(false)
        }
    }
    const setSceneOnDevice = (deviceId, value )=> {
        db
        .collection('devices')
        .doc(auth.uid)
        .collection('devices')
        .doc(deviceId)
        .update({
            scene: value
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
        <div className='container max-w-full mx-auto md:py-10 px-6'>
            <div className='max-w-sm mx-auto px-6'>
                <div className='relative flex flex-wrap'>
                    <div className='w-full relative'>
                        <div className='md:mt-6'>
                            <form className='mt-8'>
                                <div className='mx-auto max-w-lg '>
                                    <div className='py-1'>
                                        <span className='px-1 text-sm text-gray-600'>Device ID</span>
                                        <input placeholder='' type='text'
                                            value={form.deviceId}
                                            onChange={onChange}
                                            name='deviceId'
                                            className='text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none' />
                                    </div>
                                    <button onClick={activateDevice} type='button' className='mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black'
                                    >Activate Device</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Alert status={deviceStatus} />
                <pre>{JSON.stringify(devices, null, 2)} </pre>
                <br />
                <div className='max-w-sm rounded overflow-hidden shadow-lg'>
                    <p className='p-4 text-center'>Devices</p>
                    <div className='border-b-2 m-0'></div>
                    {
                        devices.map(device => {
                                return <ContentDevice key={device.id} device={device} scenes={scenes} setSceneOnDevice={setSceneOnDevice} />
                        })
                    }

                </div>
            </div>
        </div>

    )
}


export default Device
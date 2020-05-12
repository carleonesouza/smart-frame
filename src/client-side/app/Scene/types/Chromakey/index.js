import React, { useState } from 'react'
import firebase from '../../../../../lib/firebase'

const COLORS = [
    { value: 'green', label: 'Green' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' }
]

const Chromakey = ({ id, uid, sceneId, frame }) => {
    const db = firebase.firestore()
    const [settings, setSettings] = useState({
        color: 'green',
        showMarkers: false
    })

    const onChange = (evt) => {
        const name = evt.target.name
        const value = (evt.target.type === 'checkbox') ? evt.target.checked : evt.target.value
        setSettings(oldSettings => {
            return {
                ...oldSettings,
                [name]: value
            }
        })
    }

    const onSave = () => {
        const frame = db
            .collection('frames')
            .doc(uid)
            .collection(sceneId)
            .doc(id)
        frame.update({
            settings
        })
            .then(() => {
                console.log('Document successfully written!');
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
            });
    }
    return (
        <div className='border-solid border-grey-200 border-2 m-8 p-8 rounded'>
            <h1 className='font-bold'>Chromakey</h1>
            <div className='relative w-64'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor={'select-' + frame.id}>
                    <select id={'select-' + frame.id} onBlur={onChange} onChange={onChange} name='color' value={settings.color} className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                        {COLORS.map(color => <option key={color.value} value={color.value} >{color.label}</option>)}
                    </select>
                </label>
            </div>
            <div className='md:w-1/3'></div>
            <label className='md:w-2/3 block text-gray-500 font-bold'>
                <input className='mr-2 leading-tight' type='checkbox' onChange={onChange} checked={settings.showMarkers} name='showMarkers' value={true} /><span className='text-sm'>Show tracking markers</span></label>
            <div className='relative'>
                <button onClick={onSave} className='bg-transparent mt-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded absolute bottom-0 right-0'>
                    Save</button>
            </div>
        </div>
    )
}

export default Chromakey
import React from 'react'
import Layout from '../components/Layout'
import '../pages/styles/styles.css'

const NotFoundPage = () => {
    return (
        <Layout>
            <div>
                <div class="h-screen w-screen bg-blue-600 flex justify-center content-center flex-wrap">
                    <p class="font-sans text-white error-text">Page not Found</p>
                </div>
            </div>
        </Layout>
    )
}

export default NotFoundPage
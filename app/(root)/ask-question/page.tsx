import { Question } from '@/components/forms/Question'
import React from 'react'

const page = () => {
    return (
        <div>
            <h1 className='h1-bold text-dark200_light900'>
                Ask a question
            </h1>
            <div>
                <Question />
            </div>
        </div>
    )
}

export default page

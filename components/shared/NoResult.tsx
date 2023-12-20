import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface Props {
    title: string,
    description: string,
    link: string,
    LinkTitle: string
}

const NoResult = ({ title, description, link, LinkTitle }: Props) => {
    return (
        <div className='mt-10 flex w-full flex-col items-center justify-center'>
            <Image
                src='/assets/images/light-illustration.png'
                alt='no-result'
                height={270}
                width={200}
                className='block object-contain dark:hidden'
            />
            <Image
                src='/assets/images/dark-illustration.png'
                alt='no-result'
                height={270}
                width={200}
                className='hidden object-contain dark:flex'
            />
            <div className='flex flex-col items-center justify-center'>
                <h2 className='text-dark200_light900 h2-bold mt-8'>
                    {title}
                </h2>
                <p className='text-dark500_light700 body-regular my-3.5  max-w-md text-center'>
                    {description}
                </p>
                <Link href={link}>

                    <Button className='paragraph-medium primary-gradient mt-5 min-h-[46px] rounded-lg px-4 py-3 text-light-900'>
                        {LinkTitle}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NoResult

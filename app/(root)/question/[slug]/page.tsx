import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import { getQuestionById } from '@/lib/actions/question.action'
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const Page = async ({ params }: { params: { slug: string } }) => {
    const questionId = params.slug;
    const result = await getQuestionById({ questionId });
    console.log(result.question);
    return (
        <>
            <div className=' flex-start w-full flex-col'>
                <div className=' flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                    <Link
                        href={`/profile/${result.question.author.clerk_id}`}
                        className='flex items-center justify-start gap-1'
                    >
                        <Image
                            src={result.question.author.picture}
                            alt={`Profile Picture`}
                            width={25}
                            height={25}
                            className=' h-[25px] w-[25px] rounded-full object-cover'
                        />
                        <p className=' paragraph-semibold text-dark300_light700'>
                            {result.question.author.name}
                        </p>

                    </Link>
                    <div className='flex justify-end text-white'>
                        VOTING
                    </div>
                </div>
                <div className=' flex flex-col'>
                    <h2 className=' h2-semibold text-dark200_light900 mt-3.5 w-full text-left'>
                        {result.question.title}
                    </h2>
                    <div className=' mb-8 mt-5 flex flex-wrap gap-4'>
                        <Metric
                            imgUrl="/assets/icons/clock.svg"
                            alt="clockIcon"
                            value={`asked ${getTimestamp(result.question.createdAt)}`}
                            title="Asked"
                            textStyles="small-medium text-dark400_light800"
                        />
                        <Metric
                            imgUrl="/assets/icons/message.svg"
                            alt="Message"
                            value={formatAndDivideNumber(result.question.answers.length)}
                            title="Answers"
                            textStyles="small-medium text-dark400_light800"
                        />
                        <Metric
                            imgUrl="/assets/icons/eye.svg"
                            alt="eye"
                            value={formatAndDivideNumber(result.question.views)}
                            title="Views"
                            textStyles="small-medium text-dark400_light800"
                        />
                    </div>
                    <ParseHTML />

                </div>

            </div>
        </>
    )
}

export default Page

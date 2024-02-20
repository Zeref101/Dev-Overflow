import React from 'react'
import Filter from './Filter';
import { AnswerFilters } from '@/constants/filter';
import { getAnswers } from '@/lib/actions/answer.action';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import ParseHTML from './ParseHTML';

interface Props {
    questionId: string;
    userId: string;
    totalAnswers: number;
    page?: number;
    filter?: number;
}

const AllAnswers = async ({ questionId, userId, totalAnswers, page, filter }: Props) => {
    const result = await getAnswers({ questionId });
    return (
        <div className=' mt-11'>
            <div className=' flex items-center justify-between'>
                <h3 className=' primary-text-gradient'>
                    {totalAnswers} Answers
                </h3>
                <Filter
                    filters={AnswerFilters}
                />
            </div>
            <div>
                {result.map((answer) => {
                    console.log(answer)
                    return (
                        <article
                            key={answer._id}
                            className=' light-border border-b py-10'
                        >
                            <div className=' flex items-center justify-between'>
                                <Link
                                    href={`/profile/${answer.clerkId}`}
                                    className=' flex flex-1 items-start gap-1 sm:items-center'
                                >
                                    <Image
                                        src={answer.author.picture}
                                        alt="profile"
                                        width={25}
                                        height={25}
                                        className=' h-[25px] w-[25px] rounded-full object-cover max-sm:mt-0.5'
                                    />
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <p className="body-semibold text-dark300_light700">
                                            {answer.author.name}
                                        </p>

                                        <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                                            answered {" "}
                                            {getTimestamp(answer.createdAt)}
                                        </p>
                                    </div>

                                </Link>
                            </div>
                            <div className=' text-dark200_light900 mt-8'>

                                <ParseHTML data={answer.content} />
                            </div>

                        </article>
                    )
                })}
            </div>

        </div>
    )
}

export default AllAnswers

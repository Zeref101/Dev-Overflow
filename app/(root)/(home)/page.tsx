
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const questions = [
    {
        _id: '1',
        title: "Cascading deletes in sqlAlchemy",
        tags: [
            {
                _id: '1',
                name: 'python'
            },
            {
                _id: '2',
                name: 'sql'
            }
        ],
        author: {
            _id: '3',
            name: 'Shreyas',
            picture: 'url_to_picture'
        },
        upvotes: 10,
        views: 500000,
        answers: [],
        createdAt: new Date('2023-12-19T14:35:00Z'),
    },
    {
        _id: '2',
        title: "Working with async/await in JavaScript",
        tags: [
            {
                _id: '3',
                name: 'javascript'
            },
            {
                _id: '4',
                name: 'async/await'
            }
        ],
        author: {
            _id: '5',
            name: 'John Doe',
            picture: 'url_to_picture'
        },
        upvotes: 20,
        views: 784002,
        answers: [],
        createdAt: new Date('2022-03-20T10:45:00Z'),
    },
    {
        _id: '3',
        title: "Introduction to React Hooks",
        tags: [
            {
                _id: '6',
                name: 'react'
            },
            {
                _id: '7',
                name: 'react-hooks'
            }
        ],
        author: {
            _id: '8',
            name: 'Jane Smith',
            picture: 'url_to_picture'
        },
        upvotes: 15,
        views: 120,
        answers: [],
        createdAt: new Date('2022-05-10T08:20:00Z'),
    }
    // Add more questions as needed
];



export default function Home() {
    return (
        <>
            <div className="flex w-full justify-between max-sm:flex-col-reverse sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>
                <Link href='/ask-questions' className="flex justify-end max-sm:w-full">
                    <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900">
                        Ask a Question
                    </Button>
                </Link>
            </div>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchbar
                    route='/'
                    iconPosition='left'
                    imgsrc='/assets/icons/search.svg'
                    placeholder='Search for questions'
                    otherClasses='flex-1'
                />
                <Filter
                    filters={HomePageFilters}
                    otherClasses='min-h-[56px] sm:min-w-[170px]'
                    containerClasses='hidden max-md:flex'
                />
            </div>
            <HomeFilters />
            <div className="mt-10 flex flex-col gap-6 ">
                {questions.length > 0 ? (questions.map((question) => {
                    return (
                        <div key={question._id}>
                            <QuestionCard
                                key={question._id}
                                _id={question._id}
                                title={question.title}
                                tags={question.tags}
                                author={question.author}
                                upvotes={question.upvotes}
                                views={question.views}
                                answers={question.answers}
                                createdAt={question.createdAt}
                            />
                        </div>
                    )
                })) : <NoResult
                    title='There’s no question to show'
                    description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
                    link='/ask-question'
                    LinkTitle='Ask a Question'
                />}
            </div>
        </>
    )
}
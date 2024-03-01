import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { HomePageFilters } from "@/constants/filter";
import { getSavedQuestions, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const Page = async ({ params }: { params: { slug: string } }) => {
    const userId = auth();
    const mongouserId = await getUserById(userId);
    const saved = await getSavedQuestions({ clerkId: mongouserId.clerkId });

    return (
        <>
            <div className="flex w-full justify-between max-sm:flex-col-reverse sm:items-center">
                <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
                <Link
                    href="/ask-question"
                    className="flex justify-end max-sm:w-full"
                ></Link>
            </div>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchbar
                    route="/"
                    iconPosition="left"
                    imgsrc="/assets/icons/search.svg"
                    placeholder="Search for questions"
                    otherClasses="flex-1"
                />
                <Filter
                    filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                    containerClasses="hidden max-md:flex"
                />
            </div>
            <HomeFilters />
            <div className="mt-10 flex flex-col gap-6 ">
                {saved.length > 0 ? (
                    saved.map((question: any) => {
                        return (
                            <div key={question._id}>
                                <QuestionCard
                                    key={question._id}
                                    _id={question._id}
                                    title={question.title}
                                    tags={question.tag}
                                    author={question.author}
                                    upvotes={question.upvotes.length}
                                    views={question.views}
                                    answers={question.answers}
                                    createdAt={question.createdAt}
                                />
                            </div>
                        );
                    })
                ) : (
                    <NoResult
                        title="There's no question to show"
                        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                        link="/ask-question"
                        LinkTitle="Ask a Question"
                    />
                )}
            </div>
        </>
    );
};
export default Page;

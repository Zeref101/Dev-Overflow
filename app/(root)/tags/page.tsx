import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { TagFilters } from '@/constants/filter'
import { getAllTags } from '@/lib/actions/tag.action'
import React from 'react'

const Page = async () => {
    const result = await getAllTags({});

    return (
        <>
            <div className="flex w-full justify-between max-sm:flex-col-reverse sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Tags</h1>
            </div>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchbar
                    route="/tags"
                    iconPosition="left"
                    imgsrc="/assets/icons/search.svg"
                    placeholder="Search for good stuff"
                    otherClasses="flex-1"
                />
                <Filter
                    filters={TagFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {result.tags.length > 0 ? (
                    result.tags.map((tag) => {
                        console.log(tag);
                        return (
                            <div key={tag._id}>
                                Tag Card
                            </div>

                        )
                    })
                ) : (
                    <NoResult
                        title='No Tags Found'
                        description='It looks like there are no tags found'
                        link='/ask-question'
                        LinkTitle='ask a question'
                    />
                )}
            </section>
        </>

    )
}

export default Page
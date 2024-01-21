import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";

import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/actions/user.action";
import { resultProp } from "@/types";
import React from "react";




const Page = async () => {
    const result: resultProp[] = await getAllUsers({});

    return (
        <>
            <div className="flex w-full justify-between max-sm:flex-col-reverse sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Users</h1>
            </div>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchbar
                    route="/community"
                    iconPosition="left"
                    imgsrc="/assets/icons/search.svg"
                    placeholder="Search for amazing minds!"
                    otherClasses="flex-1"
                />
                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {result.length > 0 ? (
                    result.map((user) => {
                        return (
                            <div key={user.name}>
                                {user.name}
                            </div>
                        )
                    })
                ) : (
                    <div>
                        No Users Found
                    </div>
                )}
            </section>
        </>
    );
};

export default Page;

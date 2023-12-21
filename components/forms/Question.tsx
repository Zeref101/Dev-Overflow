"use client"
import React, { useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionSchema } from "@/lib/validations"


export function Question() {
    const editorRef = useRef(null);
    // 1. Define your form.
    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            title: "",
            explaination: "",
            tags: [],
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof QuestionSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex w-full flex-col gap-10 items-center">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800 ">Question Title <span className="text-primary-500">
                                *</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light900 min-h-[56px] border" />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Remember, no question is too basic or too advanced. Ask away, and let&apos;s grow together!
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="explaination"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800 ">Detailed explaination of your query<span className="text-primary-500">
                                *</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Editor
                                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                                    onInit={(evt, editor) =>
                                        // @ts-ignore
                                        (editorRef.current = editor)
                                    }
                                    init={{
                                        height: 350,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "preview",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                        ],
                                        toolbar:
                                            "undo redo |  " +
                                            "codesample | bold italic forecolor | alignleft aligncenter |" +
                                            "alignright alignjustify | bullist numlist",
                                        content_style: "body { font-family:Inter; font-size:16px }",
                                    }}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Craft your question thoughtfully—no detail is too small. Help us understand your query, and let&apos;s unravel solutions together!
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800 ">Tags <span className="text-primary-500">
                                *</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light900 min-h-[56px] border"
                                    placeholder="Add tags..."
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Enhance your question with relevant tags! Include at least 1 tag, and for specificity, limit yourself to a maximum of 3 tags.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <div className="flex w-full justify-end">
                    <Button
                        type="submit"
                        className="primary-gradient max-h-[56px] w-[173px]"
                    >
                        Submit
                    </Button>
                </div>

            </form>
        </Form>
    )
}

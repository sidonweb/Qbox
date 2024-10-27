'use client'

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signupSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/apiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const page = () => {
    const [username, setUsername] = useState("")
    const [usernameMessage, setUsernameMessage] = useState("")
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const debounced = useDebounceCallback(setUsername, 300)
    const { toast } = useToast()
    const router = useRouter();
    //zod implementation
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })
    useEffect(() => {
        const checkUniqueUser = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage('')
                try {
                    const response = await axios.get<ApiResponse>(`/api/check-unique-username?username=${username}`);
                    setUsernameMessage(response.data.message)
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(
                        axiosError.response?.data.message ?? "Error checking username"
                    )
                } finally {
                    setIsCheckingUsername(false)
                }
            }
        }
        checkUniqueUser()
    }, [username])
    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)
        try {
            //response print kara ke dekho
            const response = await axios.post<ApiResponse>('/api/signup', data)
            toast({
                title: "Success",
                description: response.data.message
            })
            router.replace(`/verify/${username}`)
            setIsSubmitting(false)
        } catch (error) {
            console.error("Error during signup:", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errMessage = axiosError.response?.data.message
            toast({
                title: "Sign Up failed",
                description: errMessage,
                variant: "destructive"
            })
            setIsSubmitting(false)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tighter lg:text-5xl mb-6">Join QBox</h1>
                    <p className="mb-4">Anonymous questions, authentic answers. Sign up now!</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="username"
                            control={form.control}

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                debounced(e.target.value)
                                            }}
                                        />
                                        
                                    </FormControl>
                                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                                    <p className={`text-sm ${usernameMessage === "Username available" ? 'text-green-500' : 'text-red-500'}`}>
                                        {usernameMessage}
                                    </p>
                                    <FormMessage />
                                </FormItem>)}
                        />
                        <FormField
                            name="email"
                            control={form.control}

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {
                                isSubmitting ? (
                                    <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
                                    </>
                                ) : ("Sign Up")
                            }
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                    Already have an account?{' '}
                        <Link href='/signin' className="text-blue-600 hover:text-blue-800">
                        Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page
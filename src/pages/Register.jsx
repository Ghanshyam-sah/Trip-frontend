import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(3,"Name must be at least 3 characters"),
    email: z.string().email().min(5,"Email must be at least 5 characters"),
    password: z.string().min(8, "password must be at least 8 characters"),
    confirmPassword: z.string().min(8,"password must be at least 8 characters")
}).refine((data)=>{
    data.password === data.confirmPassword
},
{
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

const Register = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const onSubmit = (data) =>{
        console.log(data)
    }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>

    </form>
  )
}

export default Register
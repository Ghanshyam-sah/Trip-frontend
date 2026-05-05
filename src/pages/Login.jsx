import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/common/CustomButton";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import { toast } from "sonner";
import api from "@/api/axios";

const formSchema = z.object({
  email: z.string().email().min(5, "Email must be at least 5 charecters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {

    const navigate = useNavigate();
    const { token, login } = useAuth();

    if(token){
      return(
        <Navigate to="/dashboard" />
      )
    }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValue: {
      email: "",
      password: "",
    },
  });

    const onSubmit = async (data) => {
        console.log(data)
        
        try{
            const response = await api.post("/auth/login", data);
            console.log(response);  

            if(response.status === 200){
                toast.success("Login Successful!")
                login(data, response.data.accessToken) 
                navigate("/dashboard");
            }else{
                toast.error("Login failed. Please try again.")
            }
        }catch (error){
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.")
        }
    }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-1/4 mx-auto mt-30  ">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-shadow-sky-500">Login to WorldTrip</CardTitle>
              <CardDescription>Enter your details to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
    
             
    
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input type="email" placeholder="abc@gmail.com"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input type="password" placeholder="Minimum 8 characters"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              
            
    
            </CardContent>
    
            <CardFooter className={"block"}>
                <Button className="w-full" type="submit">
                    Submit
                </Button>
                <div className="mt-4 text-center">
                  Don't have an account? <a className="text-blue-600 font-medium " href="/register">Register</a>
                </div>
            </CardFooter>
          </Card>
        </form>
  )

};

export default Login;

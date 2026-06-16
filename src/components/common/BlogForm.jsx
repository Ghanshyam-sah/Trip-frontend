import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/api/axios";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// const durationSchema = z.object({
//   days: z.coerce.number().positive("Days must be a positive numbers"),
//   nights: z.coerce.number().positive("Nights must be a positive numbers"),
// });

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").transform((val) => val.toUpperCase()),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().min(10,"Excerpt must be characters"),
  publishedDate: z.coerce.date(),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  bannerUrl: z.string()
});

const BlogForm = ({blogData}) => {

   // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dqh6d7scu'
    }
  });

  // cld.image returns a CloudinaryImage with the configuration set.
  const myImage = cld.image('sample');

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: blogData ||{
      title: " ",
      content: "",
      excerpt: "",
      publishedDate: new Date(),
      slug: " ",
      bannerUrl: null,
    },
  });
  const onAdd = async (data) => {
    console.log(data)
    try{
      const response = await api.post("/client/blogs",data);
      console.log(response);
      if(response.status === 201){
        toast.success("Blog created successfully!");
        navigate("/client/blogs");
      }else{
        toast.error("Failed to create blog. please try again.");
      }
    }catch(error){
      console.log(error)
      toast.error(error.message || "An error occured while creating the blog. please try again.")

    }
  };

  const onEdit = async (data) => {
    console.log(data)
    try{
      const response = await api.patch(`/client/blogs/${blogData._id}`,data);
      console.log(response);
      if(response.status === 200){
        toast.success("Blog Updated successfully!");
        navigate("/client/blogs");
      }else{
        toast.error("Failed to update blog. please try again.");
      }
    }catch(error){
      console.log(error)
      toast.error(error.message || "An error occured while updating the blog. please try again.")

    }
  };

  const handleImageUpload = async(e) =>{
    const file = e.target.files[0];

    if(!file){
      toast.error("No files selected.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "trip_sathi");
    formData.append("cloud_name", "dqh6d7scu");


    const response = await fetch("https://api.cloudinary.com/v1_1/dqh6d7scu/image/upload",{
      method: "POST",
      body: formData
    })

    const uploadedImage = await response.json();
    console.log(uploadedImage);

    if(uploadedImage.url){
      form.setValue("imageUrl",uploadedImage.url);
    }

  }


  return (
    <form onSubmit={form.handleSubmit(blogData? onEdit : onAdd)}>
      <Card>
        <CardHeader>
          <CardTitle>Blog info</CardTitle>
          <CardDescription>Enter blog information below</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  type="text"
                  placeholder=""
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                <Textarea
                  type="text"
                  placeholder="Beautiful Place"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          
            <Controller
              name="excerpt"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Excerpt</FieldLabel>
                  <Textarea
                    type="text"
                    placeholder=""
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
            <Controller
              name="publishedDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Published Date</FieldLabel>
                  <Input
                    type="date"
                    placeholder=""
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

             <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                  <Input
                    type="text" placeholder="10"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

              <Controller
              name="bannerUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>BannerURL</FieldLabel>
                  <Input
                    type="string" placeholder="https://image.com"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


          </div>

          {/* <Card className="mt-6">
            <CardHeader>
              <CardTitle>Trip Duration</CardTitle>
              <CardDescription>Enter trip duration details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
          
          
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
            <CardTitle>Seats & Participants</CardTitle>
            <CardDescription>Enter seats and participants</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">
            
              </div>
          <Input type="file" onChange={handleImageUpload} />
                <AdvancedImage  />
            </CardContent>
          </Card> */}

        </CardContent>
      </Card>
      <div className="float-right">
        <Button type="submit" className={"mt-6"}>Submit</Button>
      </div>
    </form>
  );
};

export default BlogForm;

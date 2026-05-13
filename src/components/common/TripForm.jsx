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

const durationSchema = z.object({
  days: z.coerce.number().positive("Days must be a positive numbers"),
  nights: z.coerce.number().positive("Nights must be a positive numbers"),
});

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").transform((val) => val.toUpperCase()),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  duration: durationSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  location: z.string().min(3, "Location must be at least 3 characters"),
  maxParticipants: z.coerce.number().positive("Max Participants must be a positive numbers"),
  availableSeats: z.coerce.number().positive("Availabel seats must be a positive number"),
  imageUrl: z.string()
});

const TripForm = ({tripData}) => {

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: tripData ||{
      title: " ",
      description: "",
      price: "",
      duration: {
        days: "",
        nights: "",
      },
      startDate: new Date(),
      endDate: new Date(),
      location: " ",
      maxParticipants: "",
      availableSeats: "",
      imageUrl: null,
    },
  });
  const onAdd = async (data) => {
    console.log(data)
    try{
      const response = await api.post("/trips",data);
      console.log(response);
      if(response.status === 201){
        toast.success("Trip created successfully!");
        navigate("/trips");
      }else{
        toast.error("Failed to create trip. please try again.");
      }
    }catch(error){
      console.log(error)
      toast.error(error.message || "An error occured while creating the trip. please try again.")

    }
  };

  const onEdit = async (data) => {
    console.log(data)
    try{
      const response = await api.patch(`/trips/${tripData._id}`,data);
      console.log(response);
      if(response.status === 200){
        toast.success("Trip Updated successfully!");
        navigate("/trips");
      }else{
        toast.error("Failed to update trip. please try again.");
      }
    }catch(error){
      console.log(error)
      toast.error(error.message || "An error occured while updating the trip. please try again.")

    }
  };


  return (
    <form onSubmit={form.handleSubmit(tripData? onEdit : onAdd)}>
      <Card>
        <CardHeader>
          <CardTitle>Trip info</CardTitle>
          <CardDescription>Enter trip information below</CardDescription>
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
                  placeholder="Trip to Mustang"
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
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
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

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                  <Input
                    type="number"
                    placeholder="5000"
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
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Muktinath"
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

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Trip Duration</CardTitle>
              <CardDescription>Enter trip duration details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>StartDate</FieldLabel>
                  <Input
                    type="date"
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
              name="endDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>EndDate</FieldLabel>
                  <Input
                    type="date"
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
              name="duration.days"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Days</FieldLabel>
                  <Input
                    type="number" placeholder="5"
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
              name="duration.nights"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nights</FieldLabel>
                  <Input
                    type="number" placeholder="5"
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
            <CardTitle>Seats & Participants</CardTitle>
            <CardDescription>Enter seats and participants</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">

                <Controller
              name="availableSeats"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>AvailableSeats</FieldLabel>
                  <Input
                    type="number" placeholder="10"
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
              name="maxParticipants"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>MaxParticipants</FieldLabel>
                  <Input
                    type="number" placeholder="10"
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
              name="imageUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>ImageURL</FieldLabel>
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
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <div className="float-right">
        <Button type="submit" className={"mt-6"}>Submit</Button>
      </div>
    </form>
  );
};

export default TripForm;

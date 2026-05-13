import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/Hooks/useApi";
import { formatDate } from "@/lib/formatter";
import { Calendar, MapPin, Users } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { size } from "zod";

const ViewTrips = () => {
  const { data, error, loading } = useApi("/trips");

  if (loading) {
    return <div>Loading...</div>;
  }


  const onSubmit = async(tripId) =>{


    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const numberofPeople = document.getElementById("numberofPeople").value;



    const data ={
      customerEmail: email,
      customerPhone: phone,
      numberOfPeople: numberofPeople,
      tripId: tripId
    }

    try{
      const response = await api.post("/booking", data);

      if(response.status === 201){
        toast.success("Booking created Successfully!!")
      }else{
        toast.error("Some Error Occured.")
      }

    }catch(error){
      toast.error(error.message || "Some Error Occured")
    }

  }

  return (
    <main className="px-20 py-8 ">
      <h1 className="text-3xl font-bold">Available Trips Package</h1>

      <section className="mt-8 grid grid-cols-3 gap-6 ">
        {data && data.length == 0 ? (
          <div>No trips available at the momont</div>
        ) : (
          data.map((trip, index) => {
            return (
              <Card key={trip._id}>
                <CardHeader className={"border-b"}>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1527206363095-ca2f054128b0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="trip image"
                      className="rounded-md"
                    ></img>
                  </div>
                  <CardTitle>{trip.title}</CardTitle>
                  <CardDescription>{trip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 space-y-4">
                      {/* Details Grid */}
                      <div className="space-y-2">
                        {/* Location and Date */}
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-foreground">{trip.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-foreground">{formatDate(trip.startDate)}</span>
                        </div>

                        {/* Duration and Availability */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium text-foreground">
                              {trip.duration.days}D/{trip.duration.nights}N
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className={(trip.availableSeats === 0) ? 'text-red-500 font-medium' : 'text-foreground'}>
                              {trip.availableSeats} left
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-foreground">
                            रू {trip.price}
                          </span>
                          <span className="text-xs text-muted-foreground">per person</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild >
                      <Button size="lg" className={"w-full"}>Book Trip</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enter Conatact Information</DialogTitle>
                        <DialogDescription>
                         Please provide your contact details and number of Participants to book the trip.
                        </DialogDescription>
                      </DialogHeader>

                        <form action="">

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="abc@gmail.com"/>
                          </div>
                          <div className="space-y-2 mb-4">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="9800000000"/>
                          </div>
                          <div className="space-y-2 mb-4">
                            <Label htmlFor="numberofpeople">Number of People</Label>
                            <Input id="numberofPeople" type="number" placeholder="0"/>
                          </div>
                          <Button type="button" onClick={()=>{onSubmit(trip._id)}} className={"w-full"} size="lg">Confirm</Button>

                        </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            );
          })
        )}
      </section>
    </main>
  );
};

export default ViewTrips;

import { Button } from "@/components/ui/button";
import { Edit, Eye, Plus, Trash, Trash2, View, ViewIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useApi from "@/Hooks/useApi";



const Trips = () => {
  const navigate = useNavigate();

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toDateString();
}

  const {data, error, loading} = useApi('/trips');

  if(loading){
    return<div>Loading...</div>
  }

  return (
    <main className="px-20 py-8">
      <Card className={"bg-lime-100"}>

        <CardHeader className={"border-b"}>
          <CardTitle calssName={"text-3xl"}>Trips Page</CardTitle>
          <CardDescription>view and manage your trips</CardDescription>
          <CardAction><Button onClick={() => {navigate("/trips/add");}}><Plus />Add Trip</Button></CardAction>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>S.N.</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>startDate</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((trip, index)=>{
                        return(
                            <TableRow key={trip._id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{trip.title}</TableCell>
                                <TableCell>रु {trip.price}</TableCell>
                                <TableCell>{formatDate(trip.startDate)}</TableCell>
                                <TableCell>{trip.duration.days} days {trip.duration.nights} nights</TableCell>
                                <TableCell>{trip.availableSeats} available (Max:{trip.maxParticipants})</TableCell>
                                <TableCell  className={"space-x-2"}>
                                    <Button size="icon" variant="outline" className={"text-blue-600 hover:bg-blue-300"}><Edit /></Button>
                                    <Button size="icon" variant="outline" className={"text-red-600 hover:bg-red-300"}><Trash2 /></Button>
                                    <Button size="icon" variant="outline" className={"text-green-600 hover:bg-green-300"}><Eye /></Button>
                                    
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Trips;

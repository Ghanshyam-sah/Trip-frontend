import React from "react";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useApi from "@/Hooks/useApi";
import { formatDate } from "@/lib/formatter";

const bookings = () => {

    const {data, error, loading} = useApi("/booking");


    const badgeColor = (status) =>{
        switch(status){
            case "pending": 
                return "bg-orange-500";
            case "confirmed":
                return "bg-green-500";
            case "cancelled":
                return "bg-red-500";
        }
    }

    if(loading){
        return <div>Loading...</div>
    }


  return (
    <main className="px-20 py-8">
      <Card>
        <CardHeader className={"border-b"}>
          <CardTitle>Bookings Page</CardTitle>
          <CardDescription>show all your bookings for trip.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent Bookings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>S.N</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Trip</TableHead>
                <TableHead>No. of people</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Booking Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                data && data.length == 0 ? 
                <div>You do not have any bookings</div>
                :
                data.map((booking, index)=>{
                    return(

                    <TableRow key={booking._id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.customerPhone}</TableCell>
                        <TableCell>{booking.tripId.title}</TableCell>
                        <TableCell>{booking.numberOfPeople}</TableCell>
                        <TableCell>{booking.totalPrice}</TableCell>
                        <TableCell>
                            <span className={` ${badgeColor(booking.status)} text-white px-4 py-2 rounded-full uppercase`}>{booking.status}</span>
                        </TableCell>
                        <TableCell className="text-right">{formatDate (booking.bookingDate)}</TableCell>
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

export default bookings;

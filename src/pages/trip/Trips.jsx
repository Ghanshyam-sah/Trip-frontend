import { Button } from "@/components/ui/button";
import { Edit, Eye, Plus, Trash, Trash2, View, ViewIcon } from "lucide-react";
import React, { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useApi from "@/Hooks/useApi";
import api from "@/api/axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Trips = () => {
  const navigate = useNavigate();

  const [dependency, setDependency] = useState(0);

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toDateString();
  }

  const { data, error, loading } = useApi("/trips", {}, [dependency]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (tripId) => {
    try {
      const response = await api.delete(`/trips/${tripId}`);
      console.log(response);
      if (response.status === 200) {
        toast.success("Trip deleted successfully!");
        setDependency((prev) => prev + 1);
      } else {
        toast.error("Failed to delete trip. please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.message ||
          "An error occured while deleting the trip. please try again.",
      );
    }
  };

  return (
    <main className="px-20 py-8 bg-[url('/beach.png')] bg-cover bg-center overflow-hidden">
      <Card
        className={
          "bg-cyan-50 "
        }
      >
        <CardHeader className={"border-b"}>
          <CardTitle calssName={"text-3xl"}>Trips Page</CardTitle>
          <CardDescription>view and manage your trips</CardDescription>
          <CardAction>
            <Button
              onClick={() => {
                navigate("/trips/add");
              }}
            >
              <Plus />
              Add Trip
            </Button>
          </CardAction>
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
              {data && data.length == 0 ? (
                <div className="text-center py-10 text-2xl">
                  No Trips Found !! Please Add Some Trips.{" "}
                </div>
              ) : (
                data.map((trip, index) => {
                  return (
                    <TableRow key={trip._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{trip.title}</TableCell>
                      <TableCell>रु {trip.price}</TableCell>
                      <TableCell>{formatDate(trip.startDate)}</TableCell>
                      <TableCell>
                        {trip.duration.days} days {trip.duration.nights} nights
                      </TableCell>
                      <TableCell>
                        {trip.availableSeats} available (Max:
                        {trip.maxParticipants})
                      </TableCell>
                      <TableCell className={"space-x-2"}>

                        <Dialog>
                          <DialogTrigger>
                            <Button size="icon"
                          variant="outline"
                          className={"text-green-600 hover:bg-green-300"}><Eye/></Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {trip.title}
                              </DialogTitle>
                              <DialogDescription>
                                {trip.description}
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>

                        <Button
                          onClick={() => {
                            navigate(`/trips/edit/${trip._id}`);
                          }}
                          size="icon"
                          variant="outline"
                          className={"text-blue-600 hover:bg-blue-300"}>
                          <Edit />
                        </Button>

                        <Button
                          onClick={() => {
                            handleDelete(trip._id);
                          }}
                          size="icon"
                          variant="outline"
                          className={"text-red-600 hover:bg-red-300"}
                        >
                          <Trash2 />
                        </Button>

                      </TableCell>
                    </TableRow>
                  );
                })
              )}
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

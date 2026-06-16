import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { toast } from "sonner";

const ContactList = () => {

    const [dependency, setDependency] = useState(0)

    const {data, error, loading} = useApi("/contacts",{},[dependency]);


    const badgeColor = (status) =>{
        switch(status){
            case "pending": 
                return "bg-orange-500";
            case "resolved":
                return "bg-green-500";
        }
    }

    if(loading){
        return <div>Loading...</div>
    }

    const handleStatusChange = async(contactId, newStatus)=>{

        try {
      const response = await api.put(`/contacts/${contactId}`, {status: newStatus});
      console.log(response);

      if (response.status === 200) {
        toast.success("Contact status updated!");
        setDependency(prev => prev + 1)
      } else {
        toast.error("Contact status failed to update. Please try again.");
      }
    } catch (error) {
      console.error("status update failed:", error);
      toast.error("Contact status failed. Please try again.");
    }
  };

    


  return (
    <main className="px-20 py-8">
      <Card>
        <CardHeader className={"border-b"}>
          <CardTitle>Contact List Page</CardTitle>
          <CardDescription>show all your message who want to contact you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your contact list.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>S.N</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                data && data.length == 0 ? 
                <div>You do not have any contacts.</div>
                :
                data.map((contact, index)=>{
                    return(

                    <TableRow key={contact._id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.message}</TableCell>
                        <TableCell>
                            <span className={` ${badgeColor(contact.status)} text-white px-4 py-2 rounded-full uppercase`}>{contact.status}</span>
                        </TableCell>
                        <TableCell className="text-right">
                            {

                                contact.status === "pending" ?
                                <Button variant="outline" size="sm" onClick={()=>{handleStatusChange(contact._id,"resolved")}}>
                                    Mark as resolved
                                </Button>
                                :
                               <Button variant="outline" size="sm" onClick={()=>{handleStatusChange(contact._id,"pending")}}>
                                    Mark as pending
                                </Button>

                            }
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

export default ContactList;

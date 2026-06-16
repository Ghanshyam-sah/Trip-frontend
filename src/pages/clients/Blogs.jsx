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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Blogs = () => {

    const {data, error, loading} = useApi("/blogs");


    const badgeColor = (status) =>{
        switch(status){
            case true: 
            return "bg-green-500";
            case false:
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    }

    if(loading){
        return <div>Loading...</div>
    }


  return (
    <main className="px-4 md:px-10 lg:px-20 py-4 md:py-8">
      <Card>
        <CardHeader className={"border-b"}>
          <CardTitle>Blogs</CardTitle>
          <CardDescription>show all the blogs of different trip.</CardDescription>
          <CardAction>
           <a href="/client/blogs/add">
             <Button>
                <Plus/>
                Post Blog
            </Button>
           </a>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent Blogs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>S.N</TableHead>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Excerpt</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Published Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                data && data.length == 0 ? 
                <div>You do not have any blogs.</div>
                :
                data.map((blog, index)=>{
                    return(

                    <TableRow key={blog._id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{blog.excerpt}</TableCell>
                        <TableCell>{blog.authorId}</TableCell>
                        <TableCell>{formatDate (blog.publishedDate)}</TableCell>
                        <TableCell>
                            <span className={`uppercase text-white px-2 py-1 rounded ${badgeColor(blog.isPublished)}`}>
                                {blog.isPublished ? "Published" : "draft"}
                            </span>
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

export default Blogs;

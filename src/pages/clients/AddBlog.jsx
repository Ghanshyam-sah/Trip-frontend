import BlogForm from '@/components/common/BlogForm';
import TripForm from '@/components/common/TripForm'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


const AddBlog = () => {
  return (

    <Card className="md:w-2/5 mx-auto my-10 ">
        <CardHeader>

            <CardTitle>
                Add new blog
            </CardTitle>

            <CardDescription>
                Share a blog of your trip with your friends!
            </CardDescription>

        </CardHeader>

        <CardContent>

            <BlogForm />

        </CardContent>

    </Card>

  )
}

export default AddBlog;
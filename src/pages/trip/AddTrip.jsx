import TripForm from '@/components/common/TripForm'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


const AddTrip = () => {
  return (

    <Card className="w-2/5 mx-auto my-10 ">
        <CardHeader>

            <CardTitle>
                Add new trip
            </CardTitle>

            <CardDescription>
                Create a new trip and share it with your friends!
            </CardDescription>

        </CardHeader>

        <CardContent>

            <TripForm />

        </CardContent>

    </Card>

  )
}

export default AddTrip
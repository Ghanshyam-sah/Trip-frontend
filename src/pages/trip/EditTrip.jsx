import TripForm from '@/components/common/TripForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useApi from '@/Hooks/useApi'
import React from 'react'
import { useParams } from 'react-router-dom'

const EditTrip = () => {

    const tripID = useParams().id;
    console.log(tripID)

    const {data, error, loading } = useApi(`/trips/${tripID}`);

    if(loading){
        return<div>Loading...</div>
    }


    const newData = {
        ...data,
        startDate: data.startDate.split('T')[0],
        endDate: data.endDate.split('T')[0]

    }

  return (
    <Card className="w-2/5 mx-auto my-10 ">
        <CardHeader>

            <CardTitle>
                Edit Trip
            </CardTitle>

            <CardDescription>
                Update trip detail below::
            </CardDescription>

        </CardHeader>

        <CardContent>

            <TripForm tripData={newData} />

        </CardContent>

    </Card>
  )
}

export default EditTrip
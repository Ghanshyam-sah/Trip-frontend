import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'
import api from '@/api/axios'
import { toast } from 'sonner'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try{
      const response = await api.post("/contacts",formData);
      console.log(response);
      if(response.status === 201){
        toast.success("Message send successfully!!");
        setFormData({
            name: '',
            email:'',
            message:''
        })
      }else{
        toast.error("Failed to send message. Please try again.");
      }
    }catch(error){
      console.log(error)
      toast.error(error.message || "An error occured while sending message. please try again.")

    }finally{
        setIsSubmitting(false)
    }
  }

  return (
    <section id='contact' className="bg-blue-50 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
            Have a question or want to work together?
          </p>
          <p className="mt-2 text-base text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="text-sm text-muted-foreground">tripsathi@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-foreground">Phone</h3>
                <p className="text-sm text-muted-foreground">+977 9817368240</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-foreground">Address</h3>
                <p className="text-sm text-muted-foreground">
                  Traffic Chowk
                  <br />
                  Biratnagar, Nepal
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 text-base placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
              Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 text-base placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your project or inquiry..."
                value={formData.message}
                onChange={handleChange}
                required
                className="resize-none text-base placeholder:text-muted-foreground/60 focus-visible:min-h-32"
                rows={6}
              />
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 text-base font-semibold"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
  }

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="px-0 md:px-10 lg:px-20 py-16 w-1/2 mx-auto ">
      {/* headings  */}
      <div>
        <h2 className="text-5xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
      </div>

      <div>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>How to invite collaborators?</AccordionTrigger>
            <AccordionContent>
              To invite collaborators, simply navigate to the project settings
              and click on the "Invite collaborators" buttons. You can then
              enter their email addresses and send then invitation to join ypur
              project.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is there any offers available?</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Quisquam, impedit iure magni nostrum perferendis soluta aut iste!
              Error repellat, harum, vel culpa temporibus facere adipisci
              reiciendis at quas, blanditiis deserunt!
            </AccordionContent>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is included in the trip package?
              </AccordionTrigger>
              <AccordionContent>
                Our trip packages typically include accommodation,
                transportation, guided tours, and selected meals. The inclusions
                may vary depending on the package you choose.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I customize my trip?</AccordionTrigger>
              <AccordionContent>
                Yes, you can customize your trip based on your preferences such
                as destination, budget, duration, and activities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                What payment methods are accepted?
              </AccordionTrigger>
              <AccordionContent>
                We accept multiple payment options including debit/credit cards,
                mobile banking, and digital wallets for your convenience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                What is your cancellation policy?
              </AccordionTrigger>
              <AccordionContent>
                Cancellation policies depend on the package. Some trips allow
                free cancellation within a certain period, while others may
                charge a fee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Is travel insurance required?</AccordionTrigger>
              <AccordionContent>
                Travel insurance is not mandatory, but we highly recommend it to
                cover unexpected situations such as trip cancellations or
                medical emergencies.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>Can I travel solo?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer travel packages suitable for solo travelers as
                well as group and family trips.
              </AccordionContent>
            </AccordionItem>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

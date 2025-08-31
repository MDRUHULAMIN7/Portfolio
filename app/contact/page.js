import Heading from "@/components/Heading";
import ContactForm from "./_components/ContactForm";
import { getSocialLinks } from "@/queries/social";


export default async function Contact() {
 const links =await getSocialLinks()


    return(

        <div className="pb-10 md:pb-20">

            <Heading title1="Contact" title2="Get in touch" />
            <ContactForm links={links?.[0]} />

        </div>
    )
}
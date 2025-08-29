import TestimonialCard from "./TestimonialCard";


const testimonials = [
  {
    name: "Raul van Sutoyo",
    role: "UI Designer",
    rating: 5,
    company: "Airkey",
   
    text: "Adding live social proof was the #1 driver of increased revenue in all my experiments while at Airkey. And the brand must survive at least 1 year.",
    avatar: "https://i.ibb.co.com/Kzpy8v0S/download.jpg",
  },
  {
    name: "Jane Doe",
    role: "Product Manager",
    rating: 4,
    company: "Airkey",
    text: "Adding live social proof was the #1 driver of increased revenue in all my experiments while at Airkey. And the brand must survive at least 1 year.",
    avatar: "https://i.ibb.co.com/R2w72Sm/432691505-122131893164165938-2457833924599702470-n.jpg",
  },
  {
    name: "Michael Lee",
    role: "Software Engineer",
    rating: 5,
    company: "Airkey",

    text: "A perfect blend of functionality and design. It saves me hours every week.",
    avatar: "https://i.ibb.co.com/Kzpy8v0S/download.jpg",
  },
];

export default function TestimonialList() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
   <div>
    <TestimonialCard testimonials={testimonials} />

   </div>
  );
}

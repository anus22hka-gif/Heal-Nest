import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    text: "Found an excellent cardiologist within minutes. The booking process was seamless, and Dr. Mehta was incredibly thorough with my consultation. Highly recommend!",
    doctor: "Dr. Rajesh Mehta",
    specialty: "Cardiologist",
  },
  {
    id: 2,
    name: "Amit Patel",
    location: "Mumbai",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "My daughter needed urgent pediatric care. HealthConnect helped us find Dr. Sunita at 10 PM, and she was available for an online consultation immediately. Lifesaver!",
    doctor: "Dr. Sunita Kapoor",
    specialty: "Pediatrician",
  },
  {
    id: 3,
    name: "Kavitha Reddy",
    location: "Hyderabad",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "The transparency in pricing is what I appreciate most. No hidden charges, and the consultation fee was clearly mentioned upfront. Got excellent care for my skin condition.",
    doctor: "Dr. Ananya Singh",
    specialty: "Dermatologist",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    location: "Bangalore",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "After my knee surgery, the follow-up care coordinated through HealthConnect was exceptional. Dr. Venkatesh and his team ensured my recovery was on track.",
    doctor: "Dr. Venkatesh Iyer",
    specialty: "Orthopedic",
  },
  {
    id: 5,
    name: "Meera Joshi",
    location: "Pune",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    text: "Being able to filter doctors by distance and see real patient reviews helped me choose the right neurologist. Dr. Arun Nair's treatment has been life-changing.",
    doctor: "Dr. Arun Nair",
    specialty: "Neurologist",
  },
  {
    id: 6,
    name: "Suresh Menon",
    location: "Chennai",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    text: "The verified doctor profiles gave me confidence. I knew exactly what to expect before my appointment. Great platform for finding quality healthcare.",
    doctor: "Dr. Lakshmi Pillai",
    specialty: "ENT Specialist",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-healthcare-teal/10 text-healthcare-teal text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            Patient Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Trusted by Thousands of Patients
          </h2>
          <p className="text-muted-foreground text-lg">
            Real experiences from real patients who found the right care through HealthConnect
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-card transition-shadow"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-full bg-healthcare-teal/10 flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-healthcare-teal" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Doctor Info */}
              <p className="text-sm text-muted-foreground mb-4">
                Consulted with <span className="font-medium text-foreground">{testimonial.doctor}</span> • {testimonial.specialty}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

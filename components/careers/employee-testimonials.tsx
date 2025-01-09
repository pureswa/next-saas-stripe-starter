import { testimonials } from "@/config/landing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function EmployeeTestimonials() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-8">What Our Employees Say</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{testimonial.job}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{testimonial.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

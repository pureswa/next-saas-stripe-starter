import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const culturePoints = [
  { title: "Innovation", description: "We embrace new ideas and technologies." },
  { title: "Collaboration", description: "We work together to achieve great things." },
  { title: "Growth", description: "We support personal and professional development." },
  // Add more culture points as needed
];

export function CompanyCulture() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-8">Our Culture</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {culturePoints.map((point, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{point.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

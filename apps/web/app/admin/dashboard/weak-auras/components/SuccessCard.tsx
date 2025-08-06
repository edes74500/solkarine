import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";

interface SuccessCardProps {
  data: {
    title: string;
    description?: string;
  };
}

export function SuccessCard({ data }: SuccessCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>{data.description && <p>{data.description}</p>}</CardContent>
    </Card>
  );
}

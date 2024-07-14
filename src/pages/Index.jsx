import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const dummyDemos = [
  {
    id: 1,
    title: "Editable Table",
    description: "An editable table connected to Supabase for data persistence.",
    icon: "🗃️",
  },
  {
    id: 2,
    title: "Text Generation",
    description: "Generate creative and coherent text based on prompts.",
    icon: "📝",
  },
  {
    id: 3,
    title: "Image Analysis",
    description: "Analyze and describe the content of images.",
    icon: "🖼️",
  },
  {
    id: 4,
    title: "Code Assistant",
    description: "Get help with coding tasks and debugging.",
    icon: "💻",
  },
  {
    id: 5,
    title: "Language Translation",
    description: "Translate text between multiple languages.",
    icon: "🌐",
  },
];

const DemoCard = ({ title, description, icon }) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <span className="text-4xl">{icon}</span>
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p>{description}</p>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full">
        <Link to={`/demo/${title.toLowerCase().replace(/\s+/g, '-')}`}>View Demo</Link>
      </Button>
    </CardFooter>
  </Card>
);

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">GPT Engineer Demos</h1>
      <p className="text-xl text-center text-muted-foreground mb-8">
        Explore various GPT Engineer-powered demos
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyDemos.map((demo) => (
          <DemoCard key={demo.id} {...demo} />
        ))}
      </div>
    </div>
  );
};

export default Index;
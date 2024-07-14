import { useParams } from "react-router-dom";

const DemoPlaceholder = () => {
  const { demoId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {demoId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Demo
      </h1>
      <p className="text-xl">
        This is a placeholder page for the {demoId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} GPT Engineer demo.
        The actual demo content will be implemented in the future.
      </p>
    </div>
  );
};

export default DemoPlaceholder;
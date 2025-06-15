import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import GitHub from "./icons/Github";
import { Badge } from "./ui/badge";

type Props = {
  title: string;
  description: string;
  source_url?: string;
  site_url?: string;
  tags: string[];
};

const ProjectCard: React.FC<Props> = ({
  title,
  description,
  source_url,
  site_url,
  tags,
}) => {
  return (
    <Card key={title} className="gap-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="tracking-tight">
          {description}
        </CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto gap-2">
        {source_url && (
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            asChild
          >
            <a href={source_url} target="_blank" rel="noopener noreferrer">
              <GitHub />
              Source
            </a>
          </Button>
        )}
        {site_url && (
          <Button
            className="cursor-pointer"
            // variant={source_url ? "secondary" : "default"}
            size="sm"
            asChild
          >
            <a href={site_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              Website
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface RecipeImageProps {
  imageUrl: string;
  title: string;
}

export default function RecipeImage({ imageUrl, title }: RecipeImageProps) {
  return (
    <div className="relative overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-all duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </AspectRatio>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h2 className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold truncate">
        {title}
      </h2>
    </div>
  );
}
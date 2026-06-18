import SiteImage from "@/components/ui/SiteImage";
import { getDiseaseImageSlots } from "@/lib/types/colorectal-disease";

type DiseaseImageGalleryProps = {
  image: string;
  images?: string[];
  title: string;
  className?: string;
};

export default function DiseaseImageGallery({
  image,
  images,
  title,
  className = "disease-image-gallery",
}: DiseaseImageGalleryProps) {
  const slots = getDiseaseImageSlots({ image, images: images ?? [] });
  const label = title.trim();

  return (
    <div className={className}>
      {slots.map((src, index) => (
        <div className="disease-image-gallery-item" key={`${label}-${index}`}>
          {src ? (
            <SiteImage
              src={src}
              alt={`${label} — image ${index + 1}`}
              width={240}
              height={180}
              fluid
            />
          ) : (
            <div className="disease-image-gallery-placeholder" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

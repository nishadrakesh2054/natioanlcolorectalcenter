import Image, { type ImageProps } from "next/image";

type SiteImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fluid?: boolean;
  /** Use when CSS controls rendered size (e.g. logo max-height). */
  autoSize?: boolean;
};

const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export default function SiteImage({
  src,
  alt,
  width,
  height,
  fill,
  fluid = false,
  autoSize = false,
  className,
  style,
  sizes,
  quality = 80,
  loading,
  ...rest
}: SiteImageProps) {
  const isPriority = rest.priority === true;
  const sizedStyle = fluid
    ? { width: "100%", height: "auto", ...style }
    : autoSize
      ? { width: "auto", height: "auto", ...style }
      : style;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        style={sizedStyle}
        sizes={sizes ?? "100vw"}
        quality={quality}
        loading={loading ?? (isPriority ? undefined : "lazy")}
        {...rest}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 640}
      height={height ?? 480}
      className={className}
      style={sizedStyle}
      sizes={sizes ?? DEFAULT_SIZES}
      quality={quality}
      loading={loading ?? (isPriority ? undefined : "lazy")}
      {...rest}
    />
  );
}

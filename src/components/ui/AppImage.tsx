import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/paths";

export default function AppImage({ src, alt, ...props }: ImageProps) {
  const resolvedSrc = typeof src === "string" ? withBasePath(src) : src;

  return <Image src={resolvedSrc} alt={alt} {...props} />;
}

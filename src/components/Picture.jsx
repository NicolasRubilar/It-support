// Sirve AVIF/WebP a los navegadores que los soportan y JPG como respaldo
export default function Picture({ src, alt, width, height, className, loading = 'lazy' }) {
  return (
    <picture className={className}>
      <source srcSet={src.avif} type="image/avif" />
      <source srcSet={src.webp} type="image/webp" />
      <img src={src.jpg} alt={alt} width={width} height={height} loading={loading} decoding="async" />
    </picture>
  )
}

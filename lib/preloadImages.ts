export default function preloadImages(sources: string[]) {
  sources.forEach(source => (new Image().src = source))
}

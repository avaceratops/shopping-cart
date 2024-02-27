import { GAME_LOGOS, PROMOTIONAL_IMAGES } from '../utils/images';

export default function Home() {
  return (
    <article className="flex justify-center sm:px-12 md:px-24">
      <div className="flex max-w-5xl flex-col items-center">
        <h2 className="mb-6 text-2xl font-bold leading-none tracking-tight">Coming Soon</h2>
        <section className="flex flex-col gap-5 md:gap-10" data-testid="promotional-images">
          {PROMOTIONAL_IMAGES.map((image, index) => (
            <img key={index} src={image} alt="" className="rounded-lg lg:rounded-2xl" />
          ))}
        </section>

        <div className="mb-10 mt-12 w-full border-b"></div>

        <h2 className="mb-6 text-2xl font-bold leading-none tracking-tight">Products We Stock</h2>
        <section
          className="mb-10 grid max-w-5xl grid-cols-1 items-center gap-8 xs:grid-cols-2"
          data-testid="game-logos"
        >
          {GAME_LOGOS.map((image, index) => (
            <img key={index} src={image} alt="" />
          ))}
        </section>
      </div>
    </article>
  );
}

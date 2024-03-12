import { GAME_LOGOS, PROMOTIONAL_IMAGES } from '../utils/images';

export default function Home() {
  return (
    <article className="flex justify-center sm:px-12 md:px-24">
      <div className="flex max-w-5xl flex-col items-center">
        <h2 className="mb-6 text-2xl font-bold leading-none tracking-tight">Coming Soon</h2>
        <section className="flex flex-col gap-5 md:gap-10" data-testid="promotional-images">
          {PROMOTIONAL_IMAGES.map((image, index) => (
            <img
              key={index}
              srcSet={`${image}--600.webp 600w, ${image}--1024.webp 1024w`}
              sizes="
                (min-width: 1320px) 1024px,
                (min-width: 780px) calc(91.54vw - 166px),
                (min-width: 640px) calc(100vw - 136px),
                calc(100vw - 40px)"
              src={`${image}--1024.webp`}
              alt=""
              className="rounded-lg lg:rounded-2xl"
              width={1024}
              height={475}
            />
          ))}
        </section>

        <div className="mb-10 mt-12 w-full border-b"></div>

        <h2 className="mb-6 text-2xl font-bold leading-none tracking-tight">Products We Stock</h2>
        <section
          className="mb-10 grid max-w-5xl grid-cols-1 items-center gap-8 xs:grid-cols-2"
          data-testid="game-logos"
        >
          {GAME_LOGOS.map((image, index) => (
            <img
              key={index}
              srcSet={`${image}--400.webp 400w, ${image}--800.webp 800w`}
              sizes="
                (min-width: 1320px) 496px,
                (min-width: 780px) calc(45.77vw - 99px),
                (min-width: 640px) calc(50vw - 84px),
                (min-width: 420px) calc(50vw - 36px),
                calc(100vw - 40px)"
              src={`${image}--800.webp`}
              alt=""
              width={500}
              height={138}
            />
          ))}
        </section>
      </div>
    </article>
  );
}

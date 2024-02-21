export default function Home() {
  const promotionalImages = [
    '/images/promotional/https___trade.games-workshop.com_assets_2023_12_Trade Header 30-12 leviathan Art.jpg',
    '/images/promotional/https___trade.games-workshop.com_assets_2023_07_15-07 Trade Header - Librarian in Warded Terminator Armour.jpg',
    '/images/promotional/https___trade.games-workshop.com_assets_2023_05_Trade Header 13-05.jpg',
    '/images/promotional/https___trade.games-workshop.com_assets_2023_04_Trade Header 08-04.jpg',
  ];

  const logos = [
    '/images/logos/https___trade.games-workshop.com_assets_2020_05_Warhammer 40K Logo.png',
    '/images/logos/https___trade.games-workshop.com_assets_2019_05_WHAoSLogoNEW2018-web.png',
  ];

  return (
    <article className="flex justify-center sm:px-12 md:px-24">
      <div className="flex max-w-5xl flex-col items-center">
        <h2 className="mb-6 text-2xl font-bold">Coming Soon</h2>
        <section className="flex flex-col gap-5 md:gap-10">
          {promotionalImages.map((image, index) => (
            <img key={index} src={image} alt="" className="rounded-lg lg:rounded-2xl" />
          ))}
        </section>

        <div className="mb-10 mt-12 w-full border-b"></div>

        <h2 className="mb-6 text-2xl font-bold">Products We Stock</h2>
        <section className="mb-10 grid max-w-5xl grid-cols-1 items-center gap-8 xs:grid-cols-2">
          {logos.map((image, index) => (
            <img key={index} src={image} alt="" />
          ))}
        </section>
      </div>
    </article>
  );
}

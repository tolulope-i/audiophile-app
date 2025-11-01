function Footer() {
  return (
    <footer>
      <div className="wrapper grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 text-centerY">
        <div>
          <h2 className="text-2xl font-bold">audiophile</h2>
          <p className="max-w-lg text-center lg:text-left">
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>
        </div>
        <div>
          <ul className="flex flex-col items-center lg:items-end gap-4">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Headphones</a>
            </li>
            <li>
              <a href="">Speakers</a>
            </li>
            <li>
              <a href="">Earphones</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="text-center lg:text-left">
          Copyright 2021. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;

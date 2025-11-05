import Image from "next/image";

export default function ProductDisplay() {
  return (
    <section className="product-display-section">
      <div className="products-grid">
        <div className="product1">
          <div className="circle-container">
            <div className="circle circle-outer"></div>
            <div className="circle circle-middle"></div>
            <div className="circle circle-inner"></div>
            <Image
              src="/speakers.png"
              className="product1-img"
              alt="ZX9 Speaker"
              width={173}
              height={207}
            />
          </div>
          <div className="product1-content">
            <h2>ZX9 Speaker</h2>
            <p>
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <a href="" className="btn btn-tertiary z-50 text-center p-4">
              see product
            </a>
          </div>
        </div>

        <div className="product2">
          <Image
            src="/bg-speaker.png"
            className="product2-bg"
            alt="ZX7 Speaker background"
            fill
          />
          <div className="product2-content">
            <h2>ZX7 Speaker</h2>
            <a href="" className="btn btn-tertiary z-50 text-center p-4">
              see product
            </a>
          </div>
        </div>

        <div className="product-pair">
          <div className="product3">
            <Image
              src="/bg-earphones.png"
              className="product4-bg"
              alt="YX1 Earphones background"
              fill
            />
          </div>

          <div className="product4">
            <div className="product3-content">
              <h2>YX1 Earphones</h2>
              <a href="" className="btn btn-secondary z-50 text-center p-4">
                see product
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";

export default function CategorySectionCard(props: {
  imageSrc: string;
  categoryName: string;
  linkUrl: string
}) {
  return (
    <div className="category-card flex flex-col items-center relative">
      <div className="category-image-container absolute z-10">
        <Image src={props.imageSrc} alt="headphones" width={80} height={104} />
      </div>
      <div className="category-box bg-white rounded-lg pt-20 pb-8 px-8 text-center w-full mt-16 ">
        <h6 className="text-lg font-bold mb-4 md:mt-7 lg:mt-6">{props.categoryName}</h6>
        <Link href={props.linkUrl} className="btn btn-text flex justify-center items-center gap-4">
          shop{" "}
          <span>
            {" "}
            <FaAngleRight />{" "}
          </span>
        </Link>
      </div>
    </div>
  );
}

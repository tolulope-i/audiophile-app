import CategorySectionCard from "./CategorySectionCard";

export default function CategorySection() {
    return (
        <section className="category-section wrapper grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <CategorySectionCard
                imageSrc="/headphones.png"
                categoryName="Headphones"   
            />

            <CategorySectionCard
                imageSrc="/speakers.png"
                categoryName="Speakers"   
            />

            <CategorySectionCard
                imageSrc="/earphones.png"
                categoryName="Earphones"   
            />
        </section>
    );
}
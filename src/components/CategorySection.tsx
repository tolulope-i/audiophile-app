import CategorySectionCard from "./CategorySectionCard";

export default function CategorySection() {
    return (
        <section className="category-section wrapper grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginTop: "" }}>
            <CategorySectionCard
                imageSrc="/headphone1.png"
                categoryName="Headphones"  
                linkUrl="/headphones" 
            />

            <CategorySectionCard
                imageSrc="/speakers.png"
                categoryName="Speakers"
                linkUrl="/speakers"   
            />

            <CategorySectionCard
                imageSrc="/earphones.png"
                categoryName="Earphones"  
                linkUrl="/earphones" 
            />
        </section>
    );
}
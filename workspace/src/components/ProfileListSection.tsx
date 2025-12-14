import ProfileCard from "./ProfileCard";

type ProfileItem = {
  id: number;
  name: string;
  profile_path: string | null;
  job?: string;
  character?: string;
  description?: string;
};

interface ProfileListSectionProps {
  title: string;
  items: ProfileItem[];
  layout?: "flex" | "grid";
  className?: string;
}

function ProfileListSection({ title, items, layout = "flex", className }: ProfileListSectionProps) {
  if (items.length === 0) return null;

  const containerClass =
    layout === "flex"
      ? "flex flex-wrap gap-[24px]"
      : "grid grid-cols-2 gap-[24px] sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8";

  return (
    <section className={`mx-auto w-full max-w-[1280px] flex flex-col ${className ?? "mb-[64px]"}`}>
      <h2 className="mb-[16px] text-xl text-white/68 font-medium">{title}</h2>
      <div className={containerClass}>
        {items.map((item) => (
          <ProfileCard
            key={item.id}
            name={item.name}
            profilePath={item.profile_path}
            description={item.description ?? item.job ?? item.character}
          />
        ))}
      </div>
    </section>
  );
}

export default ProfileListSection;

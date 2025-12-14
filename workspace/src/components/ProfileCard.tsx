interface ProfileCardProps {
  name: string;
  profilePath: string | null;
  description?: string;
}

export default function ProfileCard({ name, profilePath, description }: ProfileCardProps) {
  const profileSrc = profilePath
    ? `https://image.tmdb.org/t/p/w300${profilePath}`
    : "https://placehold.co/300x450?text=No+Image";

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="h-36 w-36 overflow-hidden rounded-xl bg-white/10">
        <img className="h-full w-full object-cover" src={profileSrc} alt={`${name} profile`} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-white">{name}</p>
        {description && <p className="text-xs text-white/60">{description}</p>}
      </div>
    </div>
  );
}

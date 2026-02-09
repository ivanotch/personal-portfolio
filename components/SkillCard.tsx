import { ReactElement } from "react";

interface Prop {
  skill: {
    name: string;
    logo: ReactElement;
  };
  index: number;
}

export default function SkillCard({ skill }: Prop) {
  return (
    <div
      className="
        group
        flex flex-col items-center justify-center gap-3
        w-[10rem] h-[11rem]
        rounded-xl
        bg-[#222222]
        border border-white/10
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-white/20
        hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
      "
    >
      {/* Logo */}
      <div
        className="
          text-4xl
          text-neutral-300
          transition-colors duration-300
          group-hover:text-white
        "
      >
        {skill.logo}
      </div>

      {/* Skill name */}
      <p
        className="
          text-sm
          font-medium
          tracking-wide
          text-neutral-400
          group-hover:text-neutral-200
          transition-colors duration-300
        "
      >
        {skill.name}
      </p>
    </div>
  );
}

"use client";

function Logo() {
  return (
    <a
      className="flex items-center"
      href="/" // normal href forces full page reload
    >
      <h3 className="flex gap-1 text-[22px] pt-[4.3px] font-bold">
        <span className="text-cyan-400">Ruhul</span>{" "}
        <span className="text-white">Amin</span>
        <span className="text-cyan-400">.</span>
      </h3>
    </a>
  );
}

export default Logo;

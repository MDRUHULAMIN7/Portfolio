"use client";

export default function DetailsSkillModal({ skill }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Skill Details</h2>
      <div className="flex items-center gap-4">
        <img src={skill.icon} alt={skill.title} className="w-12 h-12" />
        <p className={`text-lg font-semibold ${skill.color}`}>{skill.title}</p>
      </div>
      <p><strong>Version:</strong> {skill.version}</p>
      <p><strong>Updated:</strong> {new Date(skill.updatedDate).toLocaleDateString()}</p>
      <p><strong>Color:</strong> {skill.color}</p>
      <p><strong>Background Hover:</strong> {skill.bgHover}</p>
    </div>
  );
}

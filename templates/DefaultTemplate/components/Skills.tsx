import type { ResumeData } from "../../../src/types.ts";
import "./Skills.scss";

type SkillsProps = Pick<ResumeData, "skills">;

export function Skills({ skills }: SkillsProps) {
  return (
    <section className="sidebar__section skills">
      <h1 className="skills__heading">Skills</h1>

      {Object.entries(skills).map(([level, skillsArray], levelIndex) => (
        <div className="skills__wrapper-by-level" key={levelIndex}>
          <h2 className="skills__subheading">{level}</h2>
          <ul className="skills__skills-list">
            {skillsArray.map((skill, index) => <li className="skills__skill" key={index}>{skill}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}

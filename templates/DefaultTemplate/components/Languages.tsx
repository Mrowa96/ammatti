import type { ResumeData } from "../types.ts";
import "./Languages.scss";

type LanguagesProps = Pick<ResumeData, "languages">;

export function Languages({ languages }: LanguagesProps) {
  return (
    <section className="sidebar__section languages">
      <h1 className="languages__heading">Languages</h1>

      <ul className="languages__list">
        {languages.map((language, index) => (
          <li className="languages__item" key={index}>
            <span className="languages__language">{language.name}</span>
            <span className="languages__level">{language.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

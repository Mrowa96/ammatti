import type { ResumeData } from '../types';
import './Languages.scss';

type LanguagesProps = Pick<ResumeData, 'languages'>;

export function Languages({ languages }: LanguagesProps) {
  return (
    <section className="sidebar__section languages">
      <h1 className="languages__heading">Languages</h1>

      <ul className="languages__list">
        {languages.map(language => (
          <li className="languages__item">
            <span className="languages__language">{language.name}</span>
            <span className="languages__level">{language.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

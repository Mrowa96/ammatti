import { ResumeData } from '../types';

type EducationProps = Pick<ResumeData, 'education'>;

export function Education({ education }: EducationProps) {
  return (
    <section className="main__section education">
      <h1 className="education__heading">Education</h1>

      {education.map(educationEntry => (
        <article className="education-entry">
          <header className="education-entry__header">
            <div className="education-entry__date-range">
              <time dateTime={educationEntry.dateFrom.toISOString()}>
                {educationEntry.dateFrom.toLocaleDateString('en-GB', { year: 'numeric' })}
              </time>
              <span>-</span>
              <time dateTime={educationEntry.dateTo.toISOString()}>
                {educationEntry.dateTo.toLocaleDateString('en-GB', { year: 'numeric' })}
              </time>
            </div>

            <h2 className="education-entry__heading">{educationEntry.school}</h2>
          </header>
        </article>
      ))}
    </section>
  );
}

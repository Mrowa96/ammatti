import type { ResumeData } from "../types.ts";
import "./Experiences.scss";

type ExperiencesProps = Pick<ResumeData, "experiences">;

export function Experiences({ experiences }: ExperiencesProps) {
  return (
    <section className="main__section experiences">
      <h1 className="experiences__heading">Experience</h1>

      {experiences.map((experience, index) => (
        <article className="experience" key={index}>
          <header className="experience__header">
            <div className="experience__date-range">
              <time dateTime={experience.dateFrom.toISOString()}>
                {experience.dateFrom.toLocaleDateString("en-GB", { dateStyle: "medium" })}
              </time>
              <span>-</span>
              {index === 0
                ? (
                  "now"
                )
                : (
                  <time dateTime={experience.dateTo.toISOString()}>
                    {experience.dateTo.toLocaleDateString("en-GB", { dateStyle: "medium" })}
                  </time>
                )}
            </div>

            <h2 className="experience__company-name">
              {experience.company.websiteUrl
                ? (
                  <a href={experience.company.websiteUrl} target="_blank" rel="noopener noreferrer">
                    {experience.company.name}
                  </a>
                )
                : (
                  experience.company.name
                )}
            </h2>

            <span className="experience__role">as {experience.role}</span>
          </header>

          <div className="experience__content" dangerouslySetInnerHTML={{ __html: experience.content }} />
        </article>
      ))}
    </section>
  );
}

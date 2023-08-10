import { Experiences } from "./components/Experiences.tsx";
import { Education } from "./components/Education.tsx";
import { Introducation } from "./components/Introducation.tsx";
import { PersonalDetails } from "./components/PersonalDetails.tsx";
import { Skills } from "./components/Skills.tsx";
import { Languages } from "./components/Languages.tsx";
import { Hobbies } from "./components/Hobbies.tsx";
import type { ResumeData } from "./types.ts";
import "./DefaultTemplate.scss";

type DefaultTemplateProps = {
  data: ResumeData;
};

export function DefaultTemplate({
  data: { personalDetails, experiences, education, skills, languages, hobbies },
}: DefaultTemplateProps) {
  return (
    <>
      <main className="main">
        <Introducation name={personalDetails.name} />
        <Experiences experiences={experiences} />
        <Education education={education} />
      </main>

      <aside className="sidebar">
        <PersonalDetails personalDetails={personalDetails} />
        <Skills skills={skills} />
        <Languages languages={languages} />
        <Hobbies hobbies={hobbies} />
      </aside>

      <footer className="consent">
        <p className="consent__text">
          I authorize the processing of personal data present in the CV pursuant to Legislative Decree .Lgs. 101/2018
          and of the GDPR (EU Regulation 2016/679).
        </p>
      </footer>
    </>
  );
}

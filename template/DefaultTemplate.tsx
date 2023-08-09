import type { ResumeData } from './types';
import './DefaultTemplate.scss';
import { Experiences } from './components/Experiences';
import { Education } from './components/Education';
import { Introducation } from './components/Introducation';

type DefaultTemplateProps = {
  data: ResumeData;
};

export function DefaultTemplate({ data: { personalDetails, experiences, education } }: DefaultTemplateProps) {
  return (
    <>
      <main className="main">
        <Introducation name={personalDetails.name} />
        <Experiences experiences={experiences} />
        <Education education={education} />
      </main>
    </>
  );
}

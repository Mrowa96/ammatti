import type { ResumeData } from '../types';
import './Introducation.scss';

type IntroducationProps = Pick<ResumeData['personalDetails'], 'name'>;

export function Introducation({ name }: IntroducationProps) {
  return (
    <header className="main__section introduction">
      <h1 className="introduction__heading">{name}</h1>
    </header>
  );
}

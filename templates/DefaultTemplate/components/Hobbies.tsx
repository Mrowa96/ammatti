import type { ResumeData } from "../types.ts";
import "./Hobbies.scss";

type HobbiesProps = Pick<ResumeData, "hobbies">;

export function Hobbies({ hobbies }: HobbiesProps) {
  return (
    <section className="sidebar__section hobbies">
      <h1 className="hobbies__heading">Hobbies</h1>

      <ul className="hobbies__list">
        {hobbies.map((hobby, index) => <li className="hobbies__hobby" key={index}>{hobby}</li>)}
      </ul>
    </section>
  );
}

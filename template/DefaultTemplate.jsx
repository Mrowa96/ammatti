import { OtherComponent } from './OtherComponent.jsx';
import './DefaultTemplate.css';

export const DefaultTemplate = () => {
  return (
    <>
      <p className={'paragraph'}>test</p>
      <OtherComponent />
    </>
  );
};

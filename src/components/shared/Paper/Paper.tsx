import { PropsWithChildren } from 'react';
import './Paper.scss';

function Paper({ children }: PropsWithChildren) {
  return (
    <div className="paper">{children}</div>
  )
}

export default Paper;

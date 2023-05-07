import { ClockLoader } from 'react-spinners';
import { useState } from 'react';

function Loader() {
  const [show, setShouldShow] = useState(false);

  // Avoid quickly flashing the loader for quick API calls.
  setTimeout(() => setShouldShow(true), 100);

  return show ? <ClockLoader size="100" color="white" /> : null;
}

export default Loader;

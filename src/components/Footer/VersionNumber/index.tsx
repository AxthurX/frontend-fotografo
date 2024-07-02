
import EasterEgg from "../EasterEgg";
import { readVersion } from "./action";

const VersionNumber = async () => {
  const version = await readVersion();
  
  return <EasterEgg version={version}/>;
};

export default VersionNumber;

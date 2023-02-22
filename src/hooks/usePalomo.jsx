import { useContext } from "react";
import PalomoContext from "../context/PalomoProvider";

function usePalomo() {
  return useContext(PalomoContext);
}

export default usePalomo;

import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import DQ2 from "../components/lvltutor/Tools/DQ2";

export default function SelectByCode() {
  return (
    <>
      <div>
        <DQ2 />
      </div>
      <div>
        <Button as={NextLink} href="/showContent">
          Mostrar Ejercicio
        </Button>
      </div>
    </>
  );
}

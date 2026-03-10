import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { AlertStatus } from "../types";

interface AlertProps {
  title?: string;
  status?: AlertStatus;
  text: string;
  alertHidden?: boolean;
}

const ResAlert = ({
  title,
  status = AlertStatus.success,
  alertHidden = false,
  text,
}: AlertProps) => {
  if (alertHidden) return null;

  return (
    <Alert margin={2} status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription
        width="100%"
        whiteSpace="normal" // Permite que el texto se ajuste en varias líneas
        maxW="100%" // Evita que el botón se desborde de su contenedor
      >
        <Latex>{text}</Latex>
      </AlertDescription>
    </Alert>
  );
};
export default ResAlert;

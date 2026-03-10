import dynamic from "next/dynamic";
import { useEffect } from "react";
import type { CSSProperties, MouseEventHandler } from "react";
import type { MathField } from "react-mathquill";
import { ensureMathQuillStyles } from "./mathQuillStyles";

interface MQEditableMathFieldProps {
  className?: string;
  disabled?: boolean;
  latex?: string;
  onChange?: (mathField: MathField) => void;
  onMouseDown?: MouseEventHandler<HTMLElement>;
  style?: CSSProperties;
}

const EditableMathField = dynamic<MQEditableMathFieldProps>(
  () => import("react-mathquill").then(mod => mod.EditableMathField),
  {
    ssr: false,
  },
);

const MQEditableMathField = (props: MQEditableMathFieldProps) => {
  useEffect(() => {
    void ensureMathQuillStyles();
  }, []);

  return <EditableMathField {...props} />;
};

export default MQEditableMathField;

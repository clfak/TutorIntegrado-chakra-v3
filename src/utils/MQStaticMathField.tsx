import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ensureMathQuillStyles } from "./mathQuillStyles";

const StaticMathField = dynamic<{ children?: ReactNode; style?: CSSProperties }>(
  () => import("react-mathquill").then(mod => mod.StaticMathField),
  {
    ssr: false,
  },
);

const mqo: CSSProperties = {
  overflow: "visible",
};

//wrapper created because expresion elements render distorted on document changes
const MQStaticMathField = ({ exp, currentExpIndex }: { exp: string; currentExpIndex: boolean }) => {
  const [texExp, setTexExp] = useState("");

  useEffect(() => {
    void ensureMathQuillStyles();
  }, []);

  useEffect(() => {
    if (currentExpIndex)
      setTimeout(() => {
        setTexExp(exp);
      }, 10);
  }, [exp, currentExpIndex]);

  return <StaticMathField style={mqo}>{texExp}</StaticMathField>;
};
export default MQStaticMathField;

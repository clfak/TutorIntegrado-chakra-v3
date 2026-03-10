import {
  Center,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  Spinner,
} from "@chakra-ui/react";
//import { MathComponent } from "mathjax-react";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

import { useGQLQuery } from "rq-gql";
import { gql } from "../../graphql";
import TeX from "@matejmazur/react-katex";
import parameters from "./parameters.json";

const MathComponent = dynamic<ComponentProps<typeof import("mathjax-react").MathComponent>>(
  () => import("mathjax-react").then(v => v.MathComponent),
  {
    ssr: false,
  },
);
export const CardLastExercise = ({ lastExercise }: { lastExercise: string }) => {
  //hacer query de lastExercise
  const { data, isLoading, isError } = useGQLQuery(
    gql(/* GraphQL */ `
      query LastExercise($code: String!) {
        contentByCode(code: $code) {
          json
        }
      }
    `),
    {
      code: lastExercise ?? "",
    },
    {
      refetchOnWindowFocus: false,
      //refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );
  const contentJson = data?.contentByCode?.json as
    | {
        type?: string;
        title?: string;
        text?: string;
        eqc?: string;
        initialExpression?: string;
        steps?: Array<{ expression?: string }>;
      }
    | undefined;

  const isEquationTopic =
    contentJson?.type == parameters.lastExercise.topic1.type ||
    contentJson?.type == parameters.lastExercise.topic2.type ||
    contentJson?.type == parameters.lastExercise.topic3.type;

  return (
    <>
      <Center>
        <Wrap padding="15px 10px 10px 10px">
          <Center>
            <WrapItem>{parameters.lastExercise.lastExerciseDone}</WrapItem>
          </Center>
          <WrapItem>
            <LinkBox
              color="white"
              bg={useColorModeValue("green.700", "green.800")}
              as="article"
              //maxW="sm"
              p="3"
              borderWidth="1px"
              rounded="md"
              textAlign="center"
            >
              {!isLoading && !isError && lastExercise ? (
                <>
                  <LinkOverlay fontSize=".8em">
                    <span>Ejercicio de </span>{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {contentJson?.type == parameters.lastExercise.topic1.type
                        ? parameters.lastExercise.topic1.name
                        : contentJson?.type == parameters.lastExercise.topic2.type
                        ? parameters.lastExercise.topic2.name
                        : contentJson?.type == parameters.lastExercise.topic3.type
                        ? parameters.lastExercise.topic3.name
                        : contentJson?.title}
                    </span>
                  </LinkOverlay>

                  <br />
                  <Text paddingTop={"2"} fontSize={"sm"}>
                    {isEquationTopic ? (
                      <TeX>{contentJson?.title ?? ""}</TeX>
                    ) : (
                      contentJson?.text ?? ""
                    )}
                  </Text>
                  <Center fontSize={"1xl"} paddingBottom={"3"} paddingTop={"1"}>
                    {isEquationTopic ? (
                      <MathComponent tex={String.raw`${contentJson?.eqc ?? ""}`} display={false} />
                    ) : contentJson?.initialExpression ? (
                      <MathComponent
                        tex={String.raw`${contentJson.initialExpression}`}
                        display={false}
                      />
                    ) : (
                      <MathComponent
                        tex={String.raw`${contentJson?.steps?.[0]?.expression ?? ""}`}
                        display={false}
                      />
                    )}
                  </Center>
                </>
              ) : isLoading ? (
                <Spinner />
              ) : (
                <Text>{parameters.lastExercise.noDataTarget}</Text>
              )}
            </LinkBox>
          </WrapItem>
        </Wrap>
      </Center>
    </>
  );
};

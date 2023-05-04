//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import {WebR} from '@r-wasm/webr';
import styled from "styled-components";
import React from "react";
import Editor from "@monaco-editor/react";

const RootDiv = styled.div`
  background-color: #F5F5F5;
  position: relative;
  height : 16em;
`;

const RunButton = styled.button`
  background-color: white;
  color: black;
  position: absolute;
  right: 2rem;
  bottom: 0;
  border: 0;
  font-size: 1rem;
`

const webR = new WebR();
webR.init().then(() => {
    console.log("R loaded")
});

export function RSnippet({code}: { code : string}) {
    const [result, setResult] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    //@ts-ignore
    console.log(result?result.toArray():result)
    return <RootDiv>
        <Editor theme={"vs-dark"} height="16rem" language="r" value={code}  />
        <RunButton onClick={() => {
            webR.evalR(code).then(setResult).catch(setError)
        }}>
            Run
        </RunButton>
    </RootDiv>
}

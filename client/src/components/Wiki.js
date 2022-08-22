import React from "react";

import styled from "styled-components";
import fonts from "../constants/fonts";
import colorscheme from "../constants/colorscheme";
const WikiContainer = styled.div`
  background: ${colorscheme.primary};
`;

const TitleBar = styled.div`
  padding: 10px;
  font-size: 1.5em;
  font-family: ${fonts.heading};
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid ${colorscheme.primary};
  border-top: 1px solid ${colorscheme.primary};
  border-left: 1px solid ${colorscheme.primary};
  border-right: 1px solid ${colorscheme.primary};
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
`;

const Logo = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-right: 10px;
`;

const WikiBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;
  padding: 2em;
`;

const WikiHeader = styled.h1`
  margin: auto;
`;

const SubHeading = styled.h3`
  font-family: ${fonts.heading};
  font-size: 1.5em;
`;

const Paragraph = styled.p`
  font-family: ${fonts.body};
  font-size: 1em;
`;

function Wiki() {
  return (
    <WikiContainer>
      <WikiBody>
        <TitleBar>
          <Logo src={process.env.PUBLIC_URL + "light_logo.png"} />
          <WikiHeader>User Guide</WikiHeader>
        </TitleBar>
        <SubHeading>Creating New Files</SubHeading>
        <Paragraph>
          {`There are two ways to create a file. The first is to click on the "+"
          button above the file tree. This creates a new top level file.`}
        </Paragraph>
        <Paragraph>
          {`To add a child file, right click on the file and select "Add Child" or click on the intended parent file and then press
          "a".`}
        </Paragraph>
        <SubHeading>Renaming Files</SubHeading>
        <Paragraph>
          {`To rename a file, double click on the file name in the file tree.`}
        </Paragraph>
        <SubHeading>Editing Files</SubHeading>
        <Paragraph>
          {`To open a file for editing, click on the file and press "e".`}
        </Paragraph>
        <Paragraph>
          {`To open a file in a new tab, right click on the file and select "open" or click on the file and press "t".`}
        </Paragraph>
        <Paragraph>
          {`To open a new tab with the title of the file and all of its child
          files open for editing, click on the file and press "w".`}
        </Paragraph>
        <SubHeading>Tabs</SubHeading>
        <Paragraph>
          {`Tabs can have multiple files open at the same time. To open a new tab,
          click on the new tab button on the right of the tabs bar. To rename a
          tab, double click on the tab's title.`}
        </Paragraph>
        <SubHeading>Deleting Files</SubHeading>
        <Paragraph>
          {`Right click on a file in the file tree and select "Delete".`}
        </Paragraph>
        <SubHeading>Undo Delete</SubHeading>
        <Paragraph>
          {`Click on the trash can in the menu above the file tree to open a list
          of deleted files and closed tabs. Just click on the name of any file
          or tab to have it restored.`}
        </Paragraph>
      </WikiBody>
    </WikiContainer>
  );
}

export default Wiki;

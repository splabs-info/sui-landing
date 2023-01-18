import React from "react";
import Page from "../components/common/Page";
import {
  Intro,
  Overview,
  Launchpad,
  UpcomingPools,
  CompletePools,
  Questions
} from "../components/home-v2";

export default function Homepage_v2() {

  return (
    <Page title="Home">
      <Intro />
      <Overview />
      <Launchpad />
      <UpcomingPools />
      <CompletePools />
      <Questions />
    </Page>
  );
}

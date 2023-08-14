import React from 'react';
import { FrameButton } from './home/HomeStyles';

export const applyLaunchpadLink = `https://forms.gle/RwuXfuqATpgRoxAy6`;

export default function ApplyForLaunchpad() {
  return (
    <a href={applyLaunchpadLink} target="_blank" rel="noreferrer">
      <FrameButton>Apply for Launchpad</FrameButton>
    </a>
  );
}

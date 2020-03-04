// @flow

import fs from 'fs-promise';
import sharp from 'sharp';

export function saveScreenshot(
  screenshotPath: string,
  screenshotData: string,
): Promise<string> {
  return fs.outputFile(screenshotPath, screenshotData, 'base64');
}

export async function cropScreenshot(
  screenshotInPath: string,
  screenshotOutPath: string,
  windowSize: size,
  elementSize: size,
  elementLocation: location,
): Promise<string> {
  const metadata = await sharp(screenshotInPath).metadata();

  return sharp(screenshotInPath).extract({
    top: elementLocation.y,
    left: elementLocation.x,
    width: Math.min(elementSize.width, metadata.width - elementLocation.x),
    height: Math.min(elementSize.height, metadata.height - elementLocation.y),
  }).toFile(screenshotOutPath);
}

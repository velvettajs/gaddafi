import * as fs from 'fs/promises';
import axios from 'axios';
import path from 'node:path';
import { execFile } from 'node:child_process';
import gifsicle from 'gifsicle';

const sharp = require('sharp');

export default class Converter {
  constructor(protected url: string) {}

  private async downloadWebP(): Promise<string> {
    const response = await axios.get(this.url, { responseType: 'arraybuffer' });
    const outputPath = path.join(__dirname, 'preview.webp');
    if (response.data.byteLength === 0) throw new Error('El archivo descargado está vacío.');
    await fs.writeFile(outputPath, Buffer.from(response.data));
    return outputPath;
  }

  private async convertToGif(inputPath: string, outputPath: string) {
    try {
      await sharp(inputPath, { animated: true }).toFile(outputPath);
      return outputPath;
    } catch (error) {
      throw error;
    }
  }

  protected async optimize(): Promise<string> {
    const inputPath = await this.convert();
    const outputPath = path.join(__dirname, 'output.gif');
    execFile(gifsicle, ['-o', outputPath, inputPath]);
    return outputPath;
  }
  private async convert(): Promise<string> {
    const webpPath = await this.downloadWebP();
    return await this.convertToGif(webpPath, path.join(__dirname, 'preview.gif'));
  }
}

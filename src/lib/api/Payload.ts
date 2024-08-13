import FormData from 'form-data';
import fs from 'fs';

export default class Payload {
  constructor(
    private embed: Array<any>,
    private files: Array<string>
  ) {
    this.embed = embed;
    this.files = files;
  }
  getPayload(): FormData {
    const formData = new FormData();
    const messagePayload = {
      embeds: this.embed,
    };
    formData.append('payload_json', JSON.stringify(messagePayload));
    this.files.forEach((filePath) => {
      const fileStream = fs.createReadStream(filePath);
      formData.append('file', fileStream, {
        filename: filePath.split('/').pop(),
        contentType: 'application/octet-stream',
      });
    });
    return formData;
  }
}

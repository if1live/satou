import stream from 'stream';
import Speaker, { Options } from 'speaker';

const makeSpeakerOption = (codec: any): Options => ({
  channels: codec.audio_details[2] === 'mono' ? 1 : 2,
  sampleRate: parseInt(codec.audio_details[1].match(/\d+/)[0], 10),
});


export class SpeakerProxy extends stream.Writable {
  private speaker?: Speaker;

  public setCodec(codec: any) {
    const opts = makeSpeakerOption(codec);
    this.speaker = new Speaker(opts);
  }

  _write(
    chunk: any,
    encoding: string,
    callback: (error?: Error | null) => void,
  ): void {
    if(this.speaker !== undefined) {
      this.speaker._write(chunk, encoding, callback);
    }
  }
}

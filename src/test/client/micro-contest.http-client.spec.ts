import { request } from 'http';

export class MicroContestHttpClient {
  private hostname = 'www.microcontest.com';
  private pathTemplate: string = 'contests/:id/contest.php';

  constructor() {}

  public async request(id: number): Promise<string> {
    const path = this.pathTemplate.replace(':id', id.toString());
    console.log(path);
    return new Promise<string>((resolve, reject) => {
      console.log('send a request to micro contest');
      request({
        method: 'GET',
        hostname: this.hostname,
        path: path
      },(response) => {
        console.log('receive response');
        let body: string = '';
        response.on('data', (chunk: string) => {
          body.concat(chunk);
        });
        response.on('end', () => {
          console.log(body);
          resolve(body);
        });
        response.on('error', (error) => {
          console.log(error);
          reject(error);
        });
      });
    });
  }
}

describe('MicroContestHttpClient', () => {
  let httpClient: MicroContestHttpClient;
  beforeEach(() => httpClient = new MicroContestHttpClient());

  describe('#request()', () => {
    it('can call request()', () => {
      expect(httpClient.request).toBeDefined();
    });
    it('test', async () => {
      await httpClient.request(1);
    });
  });
});
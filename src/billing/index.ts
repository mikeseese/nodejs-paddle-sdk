import got, { OptionsOfTextResponseBody } from 'got';
import { createHmac } from 'crypto';
import { GetCustomerResponse } from './types';

export * from './types';

type PaddleApiResult<T> =
  | {
      success: true;
      response: T;
    }
  | {
      success: false;
      error: {
        code: number;
        message: string;
      };
    };

class PaddleHttpError extends Error {
  public readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export class PaddleSDK {
  public readonly vendorId: number;
  public readonly vendorAuthCode: string;
  public readonly publicKey?: string;
  public readonly server?: string;

  public constructor(vendorId: number, vendorAuthCode: string, publicKey?: string, server?: string) {
    this.vendorId = vendorId;
    this.vendorAuthCode = vendorAuthCode;
    this.publicKey = publicKey;
    this.server = server || 'https://api.paddle.com';

    if (this.server.endsWith('/')) {
      this.server = this.server.substring(0, this.server.length - 1);
    }
  }

  private async _request<T>(method: 'GET' | 'POST', path: string, body?: Record<string, any>): Promise<T> {
    const url = `${this.server}${path}`;
    const options: OptionsOfTextResponseBody = {
      method,
      headers: {
        Authorization: `Bearer ${this.vendorAuthCode}}`,
      },
    };
    if (body) {
      options.form = {
        ...(body || {}),
      };
    }
    const res = await got(url, options).json<PaddleApiResult<T>>();

    if (res.success === true) {
      return res.response;
    }

    throw new PaddleHttpError(res.error.code, res.error.message);
  }

  public async getCustomer(customer_id: string): Promise<GetCustomerResponse> {
    return this._request<GetCustomerResponse>('GET', `/product/list_coupons/${customer_id}`);
  }

  public verifyWebhook(requestSignature: string | undefined, rawBody: Buffer | string): boolean {
    if (!this.publicKey) {
      throw new Error('You must provide a publicKey when using the verifyWebhook method.');
    }

    if (typeof requestSignature !== "string" || requestSignature === "") {
      return false;
    }

    try {
      const [ts, h1] = requestSignature.split(";").map((s) => s.split("=")[1]);

      const payload = `${ts}:${Buffer.isBuffer(rawBody) ? rawBody.toString("utf-8") : rawBody}`;
      const hmac = createHmac(
        "sha256",
        this.publicKey,
      );
      hmac.update(payload);
      const h2 = hmac.digest("hex");

      return h1 === h2;
    } catch (e) {
      return false;
    }
  }
}

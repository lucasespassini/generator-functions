import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Response } from 'express';

interface Items {
  uuid: string;
  description: string;
}

async function* itemGenerator<T>(items: T[]) {
  for (const item of items) {
    yield new Promise<T>((resolve) => {
      setTimeout(() => resolve(item), 200);
    });
  }
}

@Injectable()
export class AppService {
  private readonly items: Items[];

  constructor() {
    this.items = Array.from({ length: 100 }, (_, i) => ({
      uuid: randomUUID(),
      description: `Item ${i}`,
    }));
  }

  async getItems(res: Response) {
    const generator = itemGenerator<Items>(this.items);

    for await (const item of generator) {
      console.log(item);
      res.write(JSON.stringify(item) + '\n');
    }

    res.end();
  }
}

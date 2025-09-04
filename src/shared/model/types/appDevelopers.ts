import type { StaticImageData } from 'next/image';

export interface AppDeveloper {
  name: string;
  role: string;
  photo: StaticImageData;
  github: string;
  nickname: string;
  responsibilities: string[];
}

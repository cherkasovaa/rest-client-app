import type { AppDeveloper } from '@/shared/model/types/appDevelopers';

import akseeePhoto from '@/shared/assets/developers/akseee.jpg';
import alinaPhoto from '@/shared/assets/developers/alina.jpg';
import tatuanaPhoto from '@/shared/assets/developers/tatuana.jpg';

export const DEVELOPERS: AppDeveloper[] = [
  {
    name: 'Kseniia',
    role: 'Developer',
    photo: akseeePhoto,
    github: 'https://github.com/akseee',
    nickname: 'akseee',
    responsibilities: [
      'RESTful client page',
      'variables',
      'unit & integration testing',
    ],
  },
  {
    name: 'Tatuana',
    role: 'Developer',
    photo: tatuanaPhoto,
    github: 'https://github.com/dem-tv',
    nickname: 'dem-tv',
    responsibilities: [
      'authorization via Firebase',
      'unit & integration testing',
    ],
  },
  {
    name: 'Alina',
    role: 'Team Lead',
    photo: alinaPhoto,
    github: 'https://github.com/cherkasovaa/',
    nickname: 'cherkasovaa',
    responsibilities: [
      'project setup',
      'main page implementation',
      'history page',
      'unit & integration testing',
    ],
  },
] as const;

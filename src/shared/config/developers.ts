import type { AppDeveloper } from '@/shared/model/types/appDevelopers';

import akseeePhoto from '@/shared/assets/developers/akseee.jpg';
import alinaPhoto from '@/shared/assets/developers/alina.jpg';
import tatuanaPhoto from '@/shared/assets/developers/tatuana.jpg';

export const DEVELOPERS: AppDeveloper[] = [
  {
    name: 'teamMembers.0.name',
    role: 'teamMembers.0.role',
    photo: akseeePhoto,
    github: 'https://github.com/akseee',
    nickname: 'akseee',
    contribution: 'teamMembers.0.contribution',
  },
  {
    name: 'teamMembers.1.name',
    role: 'teamMembers.1.role',
    photo: tatuanaPhoto,
    github: 'https://github.com/dem-tv',
    nickname: 'dem-tv',
    contribution: 'teamMembers.1.contribution',
  },
  {
    name: 'teamMembers.2.name',
    role: 'teamMembers.2.role',
    photo: alinaPhoto,
    github: 'https://github.com/cherkasovaa/',
    nickname: 'cherkasovaa',
    contribution: 'teamMembers.2.contribution',
  },
] as const;

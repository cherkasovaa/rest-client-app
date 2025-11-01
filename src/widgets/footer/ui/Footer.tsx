import { DEVELOPERS } from '@/shared/config/developers';
import { LINK } from '@/widgets/footer/model/links';
import { Box, Container, Link, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations();
  return (
    <Box
      component="footer"
      sx={{
        p: '1rem',
        color: 'primary.contrastText',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', sm: 'space-around' },
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Link href={LINK.RSS} target="_blank" rel="noopener" underline="none">
          <Image
            src="/rss-logo.svg"
            alt="RSSchool logo"
            width={32}
            height={32}
          ></Image>
        </Link>
        <Typography variant="body2">© 2025</Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {DEVELOPERS.map((developer) => (
            <Link
              key={developer.name}
              variant="button"
              href={developer.github}
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{
                transition: 'all 0.3s',
                color: 'primary.contrastText',

                '&:hover': {
                  color: 'secondary.main',
                },
              }}
            >
              {t(developer.name)}
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

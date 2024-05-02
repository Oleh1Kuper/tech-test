import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { useAuth0 } from '@auth0/auth0-react';
import useUserFromDB from '../hooks/useUserFromDB';
import { useTranslation } from 'react-i18next';
import Announcement from '../components/Announcement';
import ProgressBar from '../components/ProgressBar';
import CardList from '../components/CardList';
import { useNavigate } from 'react-router-dom';

// #region components

interface HeadingProps {
  primary?: boolean;
}

interface BoxProps {
  padding?: boolean;
  border?: boolean;
}

const H1 = styled.h1<HeadingProps>`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => (props.primary ? '#33384F' : '#5acee8')};
`;

const H2 = styled(H1.withComponent('h2'))`
  margin: 0;
`;

const SubHeading = styled.p`
  font-size: 14px;
  color: #63637e;
`;

const Box = styled.div<BoxProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 30px;
  padding: ${(props) => props.padding && '40px'};
  border-bottom: ${(props) => props.border && '1px solid #f0f0f0'};
  @media (min-width: 900px) {
    flex-direction: row;
    gap: 0;
  }
`;

const Progress = styled.span({
  fontSize: '14px',
  fontWeight: 700,
  color: '#03C9A9',
});

const Section = styled.section({
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
  background: '#fff',
});

// #endregion

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { userFromDB } = useUserFromDB(user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const profile = userFromDB?.profile;
  const cardData = [
    {
      id: 1,
      title: t('translation.verification.title'),
      isFilledIn: true,
      text: t('translation.verification.text'),
    },
    {
      id: 2,
      title: t('translation.singer.title'),
      isFilledIn: profile?.singer.isFilledIn,
      text: t('translation.singer.text'),
    },
    {
      id: 3,
      title: t('translation.movie.title'),
      isFilledIn: profile?.movie.isFilledIn,
      text: t('translation.movie.text'),
    },
    {
      id: 4,
      title: t('translation.cartoon.title'),
      isFilledIn: profile?.cartoon.isFilledIn,
      text: t('translation.cartoon.text'),
    },
    {
      id: 5,
      title: t('translation.picture.title'),
      isFilledIn: profile?.userImage.isFilledIn,
      text: t('translation.picture.text'),
    },
  ];
  const filledInData = cardData.filter((card) => card.isFilledIn);
  const percent = (filledInData.length / cardData.length) * 100;

  if (!isAuthenticated) {
    navigate('/');
  }

  return (
    <>
      <Section style={{ marginBottom: '48px' }}>
        <Box padding border>
          <article>
            <H1>{t('translation.profile.h1')}</H1>
            <SubHeading>{t('translation.profile.p')}</SubHeading>
          </article>

          <article
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            })}
          >
            <Box>
              <H2 primary>{t('translation.profile.h2')}</H2>
              <Progress>{`${percent}%`}</Progress>
            </Box>

            <ProgressBar cardData={cardData} />
          </article>
        </Box>

        <article>
          <CardList cardData={cardData} />
        </article>
      </Section>

      <Section>
        <Announcement />
      </Section>
    </>
  );
};

export default ProfilePage;

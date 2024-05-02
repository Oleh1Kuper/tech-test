import React, { useEffect, useState } from 'react';
import { Box, Button, Error, Input } from './styles';
import { css } from '@emotion/css';
import { FieldValues, useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import useUserFromDB from '../../hooks/useUserFromDB';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../db/firestore';
import { useTranslation } from 'react-i18next';

type Props = {
  index: number;
};

const MovieForm: React.FC<Props> = ({ index }) => {
  const { user } = useAuth0();
  const { userFromDB } = useUserFromDB(user);
  const [isLoad, setIsLoad] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      movieName: userFromDB?.profile.movie.movieName,
      country: userFromDB?.profile.movie.country,
      genre: userFromDB?.profile.movie.genre,
    },
  });

  useEffect(() => {
    if (userFromDB) {
      setValue('movieName', userFromDB.profile.movie.movieName);
      setValue('country', userFromDB.profile.movie.country);
      setValue('genre', userFromDB.profile.movie.genre);
    }
  }, [userFromDB]);

  const onSubmit = async (data: FieldValues) => {
    setIsLoad(true);

    try {
      if (userFromDB) {
        await updateDoc(doc(firestore, 'users', userFromDB.id), {
          ...userFromDB,
          profile: {
            ...userFromDB.profile,
            movie: { ...data, isFilledIn: true },
          },
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoad(false);
    }
  };

  const { t } = useTranslation();

  return (
    <form
      className={css({
        background: '#fff',
        padding: '20px',
        borderRadius: '5px',
        transition: 'transform .3s',
        transform: `translateX(-${index * 350}px)`,
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <Input
          {...register('movieName', {
            required: t('translation.form.required'),
            minLength: {
              value: 2,
              message: t('translation.form.error'),
            },
          })}
          type="text"
          placeholder={t('translation.form.movie')}
        />

        {errors.movieName?.message && <Error>{errors.movieName.message}</Error>}
      </Box>

      <Box>
        <Input
          {...register('genre', {
            required: t('translation.form.required'),
            minLength: {
              value: 2,
              message: t('translation.form.error'),
            },
          })}
          type="text"
          placeholder={t('translation.form.genre')}
        />

        {errors.genre?.message && <Error>{errors.genre.message}</Error>}
      </Box>

      <Box>
        <Input
          {...register('country', {
            required: t('translation.form.required'),
            minLength: {
              value: 2,
              message: t('translation.form.error'),
            },
          })}
          type="text"
          placeholder={t('translation.form.country')}
        />

        {errors.country?.message && <Error>{errors.country.message}</Error>}
      </Box>

      <Button disabled={isLoad} type="submit">
        {isLoad ? 'Loading...' : t('translation.form.save')}
      </Button>
    </form>
  );
};

export default MovieForm;

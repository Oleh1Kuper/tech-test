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

const CartoonForm: React.FC<Props> = ({ index }) => {
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
      cartoonName: userFromDB?.profile.cartoon.cartoonName,
      country: userFromDB?.profile.cartoon.country,
      genre: userFromDB?.profile.cartoon.genre,
    },
  });

  useEffect(() => {
    if (userFromDB) {
      setValue('cartoonName', userFromDB.profile.cartoon.cartoonName);
      setValue('country', userFromDB.profile.cartoon.country);
      setValue('genre', userFromDB.profile.cartoon.genre);
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
            cartoon: { ...data, isFilledIn: true },
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
          {...register('cartoonName', {
            required: t('translation.form.required'),
            minLength: {
              value: 2,
              message: t('translation.form.error'),
            },
          })}
          type="text"
          placeholder={t('translation.form.cartoon')}
        />

        {errors.cartoonName?.message && (
          <Error>{errors.cartoonName.message}</Error>
        )}
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
        {isLoad ? 'Loading...' : 'Save'}
      </Button>
    </form>
  );
};

export default CartoonForm;

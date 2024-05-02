import React, { useEffect, useState } from 'react';
import { Box, Button, Error, Input } from './styles';
import { css } from '@emotion/css';
import { FieldValues, useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import useUserFromDB from '../../hooks/useUserFromDB';
import { app, firestore } from '../../db/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useTranslation } from 'react-i18next';

type Props = {
  index: number;
};

const ImageForm: React.FC<Props> = ({ index }) => {
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
      image: userFromDB?.profile.userImage.image,
    },
  });

  useEffect(() => {
    if (userFromDB) {
      setValue('image', userFromDB.profile.userImage.image);
    }
  }, [userFromDB]);

  const onSubmit = async (data: FieldValues) => {
    if (userFromDB) {
      setIsLoad(true);

      const storege = getStorage(app);
      const imageFile = data.image[0];

      const storageRef = ref(storege, `images/${imageFile.name}`);

      try {
        await uploadBytes(storageRef, imageFile);

        const imageUrl = await getDownloadURL(storageRef);

        await updateDoc(doc(firestore, 'users', userFromDB.id), {
          ...userFromDB,
          profile: {
            ...userFromDB.profile,
            userImage: { image: imageUrl, isFilledIn: true },
          },
        });
      } catch (error) {
        throw error;
      } finally {
        setIsLoad(false);
      }
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
          {...register('image', {
            required: t('translation.form.required'),
          })}
          type="file"
        />

        {errors.image?.message && <Error>{errors.image.message}</Error>}
      </Box>

      <Button disabled={isLoad} type="submit">
        {isLoad ? 'Loading...' : t('translation.form.save')}
      </Button>
    </form>
  );
};

export default ImageForm;

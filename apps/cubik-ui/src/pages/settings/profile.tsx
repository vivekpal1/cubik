import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Center, HStack, VStack } from '@chakra-ui/layout';
import { UserModel } from '@prisma/client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import ProfilePicture from '~/components/pages/create-profile/ProfilePicture';
import SettingsHeader from '~/components/pages/settings/settingsHeader';
import SettingsLayout from '~/context/settings.layout';
import { useUserStore } from '~/store/userStore';
import { trpc } from '~/utils/trpc';
import { uploadToCloudinary } from '~/utils/upload';

type EditProfileForm = {
  avatar: string;
  username: string;
  wallet: string;
};
const EditProfile = () => {
  const { user } = useUserStore();
  const {
    control,
    getValues,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    defaultValues: {
      avatar: user?.profilePicture,
      username: user?.username,
      wallet: user?.mainWallet,
    },
  });
  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    // Only accept the first file from the dropped files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      // Check file size, should be less than or equal to 5MB
      // file.size is in bytes, so 5MB is 5 * 1024 * 1024 bytes
      if (file.size <= 5 * 1024 * 1024) {
        setValue('avatar', file);
        const imageUrl = await uploadToCloudinary(getValues('avatar')).catch(
          (error) => {
            throw new Error(
              `Error uploading image to Cloudinary: ${error.message}`
            );
          }
        );
        setValue('avatar', imageUrl);
      } else {
        setError('avatar', {
          message: 'File size should be less than or equal to 5MB',
        });
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // @ts-ignore
    accept: 'image/*',
    multiple: false, // prevent multiple file selection
    onDrop,
  });
  const updateUser = trpc.user.update.useMutation();
  const onSubmit = async () => {
    updateUser.mutate({
      avatar: getValues('avatar'),
    });
  };
  return (
    <>
      <SettingsLayout>
        <form
          style={{
            width: '100%',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <VStack
            w={{
              sm: '40rem',
              base: 'full',
            }}
            mt={5}
            gap={5}
          >
            <FormControl>
              <FormLabel>Userame</FormLabel>
              <Input
                isDisabled
                disabled
                value={user?.username}
                border={'1px'}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Profile Picture</FormLabel>
              <HStack gap={5}>
                <ProfilePicture
                  onOpen={() => {}}
                  onClose={() => {}}
                  isOpen={false}
                  showArrow={false}
                  pfp={getValues('avatar')}
                />
                <VStack
                  align={'start'}
                  justify="space-between"
                  gap="0.5rem"
                  height={'full'}
                >
                  <Center {...getRootProps()}>
                    <input {...getInputProps()} />{' '}
                    <Button
                      variant={'primary'}
                      fontSize={{ base: 'xs', md: 'md' }}
                    >
                      {getValues('avatar')
                        ? 'Upload New Image'
                        : 'Upload Image'}
                    </Button>{' '}
                  </Center>
                  <Box
                    textAlign={'start'}
                    as="p"
                    textStyle={{ base: 'body5', md: 'body4' }}
                    color="neutral8"
                  >
                    Upload a 1:1 aspect ration Image of size at max 5MB.
                  </Box>
                </VStack>
              </HStack>
              <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
                {errors.avatar?.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>
        </form>
      </SettingsLayout>
    </>
  );
};

export default EditProfile;

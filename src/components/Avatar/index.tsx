import { FC, useMemo } from 'react';
import Image from 'next/image';
import { identicon } from '@dicebear/collection';
import { createAvatar, Options } from '@dicebear/core';

interface AvatarProperties {
  profileImage: string;
}

const Avatar: FC<AvatarProperties> = ({ profileImage: seed }) => {
  const avatar = useMemo(() => {
    const options: Partial<Options> = {
      seed,
      size: 30,
    };

    return createAvatar(identicon, options).toDataUriSync();
  }, [seed]);

  return <Image src={avatar} alt="Avatar" width={30} height={30} />;
};

export default Avatar;

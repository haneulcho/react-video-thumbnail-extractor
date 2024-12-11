import React from 'react';
import ReactPlayer from 'react-player';

import { Loader } from '@/components/shared';

type Props = {
  videoUrl: string;
  playerRef: React.RefObject<ReactPlayer>;
  onVideoLoaded?: () => void;
  isPending?: boolean;
};

export const VideoPlayer = ({ videoUrl, playerRef, onVideoLoaded, isPending = false }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-md">
      <div className="ratio169">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          onReady={onVideoLoaded}
          className="absolute left-0 top-0 z-[1] !h-full !w-full"
          controls
        />
        <Loader loading={isPending} />
      </div>
    </div>
  );
};

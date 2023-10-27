import { FC, useEffect, useState } from 'react';

import * as Sharing from 'expo-sharing';

import {
  DiscriminatedItem,
  S3FileItemExtra,
  getS3FileExtra,
} from '@graasp/sdk';

import { ANALYTICS_EVENTS, MIME_TYPES } from '../config/constants/constants';
import { useQueryClient } from '../context/QueryClientContext';
import { customAnalyticsEvent } from '../utils/functions/analytics';
// import { getS3FileExtra } from '../utils/functions/item';
import { downloadFileFromS3Url } from '../utils/functions/media';
import ActivityIndicator from './ActivityIndicator';
import FileAudio from './FileAudio';
import FileImage from './FileImage';
import FilePdf from './FilePdf';
import FileUnsupported from './FileUnsupported';
import FileVideo from './FileVideo';

interface FileItemProps {
  item: DiscriminatedItem;
}

const FileItem: FC<FileItemProps> = ({ item }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(true);
  const [filePath, setFilePath] = useState<string | undefined>(undefined);
  const { hooks } = useQueryClient();

  const extra = getS3FileExtra(item.extra as S3FileItemExtra);
  const { mimetype } = extra ?? {};

  const { data } = hooks.useFileContentUrl(item.id);

  const getFileUrl = async (url: string) => {
    try {
      const itemFile = url;
      if (
        mimetype &&
        MIME_TYPES.PDF.concat(MIME_TYPES.VIDEO).includes(mimetype)
      ) {
        setFilePath(itemFile);
        setIsDownloading(false);
        return;
      }
      downloadFile(itemFile);
    } catch {
      throw new Error();
    }
  };

  useEffect(() => {
    if (data) {
      getFileUrl(data);
    }
  }, []);

  const downloadFile = async (remoteUrl: string) => {
    try {
      const filePath = await downloadFileFromS3Url(
        remoteUrl,
        item.id,
        mimetype,
      );
      setFilePath(filePath);
      setIsDownloading(false);
    } catch {
      throw new Error();
    }
  };

  if (isDownloading) {
    return <ActivityIndicator />;
  }

  const handleShareFile = (mimetype: string) => async () => {
    if (filePath) {
      Sharing.shareAsync(filePath);
      await customAnalyticsEvent(ANALYTICS_EVENTS.SHARE_ITEM, {
        item_type: mimetype,
      });
    }
  };

  if (mimetype && filePath) {
    if (MIME_TYPES.IMAGE.includes(mimetype)) {
      return (
        <FileImage
          filePath={filePath}
          handleShareFile={handleShareFile(mimetype)}
          mimetype={mimetype}
        />
      );
    } else if (MIME_TYPES.AUDIO.includes(mimetype)) {
      return (
        <FileAudio
          filePath={filePath}
          handleShareFile={handleShareFile(mimetype)}
        />
      );
    } else if (MIME_TYPES.VIDEO.includes(mimetype)) {
      return (
        <FileVideo filePath={filePath} itemId={item.id} mimetype={mimetype} />
      );
    } else if (MIME_TYPES.PDF.includes(mimetype)) {
      return (
        <FilePdf filePath={filePath} itemId={item.id} mimetype={mimetype} />
      );
    }
  }
  if (filePath) {
    return (
      <FileUnsupported
        filePath={filePath}
        handleShareFile={handleShareFile(mimetype)}
      />
    );
  }
  return null;
};

export default FileItem;

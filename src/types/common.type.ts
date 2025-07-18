export type UploadStatus = 'reading' | 'uploading' | 'done' | 'error';

export type UploadItem = {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
};

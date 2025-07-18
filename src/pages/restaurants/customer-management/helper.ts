// helper.ts
export const simulateProgressRead = (
  file: File,
  onProgress: (percent: number) => void,
  onDone: () => void,
  onError: () => void,
) => {
  const reader = new FileReader();

  reader.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded * 100) / e.total);
      onProgress(percent);
    }
  };

  reader.onload = () => {
    onProgress(100);
    onDone();
  };

  reader.onerror = onError;

  reader.readAsArrayBuffer(file);
};

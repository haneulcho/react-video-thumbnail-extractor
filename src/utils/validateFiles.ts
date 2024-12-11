import { ThumbnailValidationResult } from '@/types';

type ValidateFilesParams = {
  currentFiles: File[];
  maxFileLength: number;
  maxFileSize: number; // KB 기준 값
  allowedExtensions?: string[];
  allowedFilenameRegex?: string;
};

const validateFiles = ({
  currentFiles,
  maxFileLength,
  maxFileSize,
  allowedExtensions,
  allowedFilenameRegex
}: ValidateFilesParams): ThumbnailValidationResult => {
  const validateFileExtension = (fileName: string) => {
    if (!allowedExtensions) return true;

    const extension = fileName.match(/\.[^/\\.]+$/)?.[0];
    return extension ? allowedExtensions.includes(extension) : false;
  };

  const validateFilename = (fileName: string) => {
    if (!allowedFilenameRegex || !allowedExtensions) return true;

    const fileExtensionRegex = allowedExtensions.map((ext) => `\\${ext}`).join('|');
    const filenameRegex = new RegExp(`^${allowedFilenameRegex}(${fileExtensionRegex})$`);
    return filenameRegex.test(fileName);
  };

  const validations: { isValid: boolean; code: ThumbnailValidationResult['code'] }[] = [
    {
      isValid: currentFiles.length > 0,
      code: 'REQUIRE_FILE'
    },
    {
      isValid: currentFiles.every(({ type }) => type.startsWith('video')),
      code: 'INVALID_FILE_IS_NOT_VIDEO'
    },
    {
      isValid: currentFiles.every(({ name }) => validateFileExtension(name)),
      code: 'INVALID_FILE_EXTENSION'
    },
    {
      isValid: currentFiles.length <= maxFileLength,
      code: 'INVALID_FILE_MAX_LENGTH'
    },
    {
      isValid: currentFiles.every(({ name }) => validateFilename(name)),
      code: 'INVAILD_FILE_NAME'
    },
    {
      isValid: currentFiles.every((file) => file.size / 1024 <= maxFileSize),
      code: 'INVALID_FILE_MAX_SIZE'
    }
  ];

  const invalidValidation = validations.find((validation) => !validation.isValid);

  if (invalidValidation) {
    return { hasError: true, code: invalidValidation.code };
  }

  return { hasError: false, code: 'FILE_IMPORT_SUCCESS' };
};

export default validateFiles;

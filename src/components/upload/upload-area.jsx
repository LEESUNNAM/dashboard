import { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadProgress from './upload-progress';

/**
 * UploadArea 컴포넌트
 *
 * Props:
 * @param {function} onUpload    - 선택된 File[] 를 받는 업로드 실행 함수 [Required]
 * @param {boolean}  isUploading - 업로드 진행 중 여부 [Required]
 * @param {Array}    items       - 업로드 진행 상태 목록 [Required]
 *
 * Example usage:
 * <UploadArea onUpload={uploadFiles} isUploading={isUploading} items={items} />
 */
function UploadArea({ onUpload, isUploading, items }) {
  const fileRef   = useRef(null);
  const folderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((fileList) => {
    const files = Array.from(fileList);
    if (files.length) onUpload(files);
  }, [onUpload]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      {/* 드래그앤드롭 존 */}
      <Box
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'var(--color-primary)' : 'rgba(118,167,216,0.45)',
          borderRadius: 2.5,
          p: { xs: 4, md: 5 },
          textAlign: 'center',
          bgcolor: isDragging ? 'rgba(118,167,216,0.06)' : 'background.paper',
          transition: 'all 0.2s',
          cursor: isUploading ? 'not-allowed' : 'default',
        }}
      >
        {/* 숨김 input */}
        <input
          ref={fileRef}
          type="file"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        <input
          ref={folderRef}
          type="file"
          multiple
          hidden
          webkitdirectory="true"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <CloudUploadIcon
          sx={{
            fontSize: 52,
            color: isDragging ? 'var(--color-primary)' : 'var(--color-primary-light)',
            mb: 1.5,
            opacity: isUploading ? 0.5 : 1,
          }}
        />

        <Typography
          sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.1rem' }, color: 'var(--color-text-primary)', mb: 0.5 }}
        >
          {isDragging ? '파일을 여기에 놓으세요' : '파일을 드래그하거나 버튼으로 선택하세요'}
        </Typography>
        <Typography sx={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', mb: 2.5 }}>
          모든 형식 지원 · 최대 100MB · 여러 파일 동시 업로드 가능
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
          <Button
            variant="contained"
            startIcon={isUploading ? <CircularProgress size={16} color="inherit" /> : <UploadFileIcon />}
            disabled={isUploading}
            onClick={() => fileRef.current?.click()}
            sx={{
              bgcolor: '#818264',
              fontWeight: 600,
              px: 3,
              '&:hover': { bgcolor: '#4D4E30' },
              '&:disabled': { bgcolor: 'var(--color-text-muted)' },
            }}
          >
            {isUploading ? '업로드 중...' : '파일 선택'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<FolderOpenIcon />}
            disabled={isUploading}
            onClick={() => folderRef.current?.click()}
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary-dark)',
              fontWeight: 600,
              px: 3,
              '&:hover': { bgcolor: 'rgba(118,167,216,0.08)', borderColor: 'var(--color-primary-dark)' },
            }}
          >
            폴더 선택
          </Button>
        </Stack>
      </Box>

      {/* 업로드 진행 목록 */}
      {items.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <UploadProgress items={items} />
        </Box>
      )}
    </Box>
  );
}

export default UploadArea;

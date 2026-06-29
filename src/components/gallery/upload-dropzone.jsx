import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { supabase } from '../../lib/supabase';

/**
 * UploadDropzone 컴포넌트
 *
 * Props:
 * @param {string} userId - 업로드를 수행하는 사용자 id [Required]
 * @param {function} onUploaded - 업로드 완료 후 호출되는 콜백 [Required]
 *
 * Example usage:
 * <UploadDropzone userId={user.id} onUploaded={refetch} />
 */
function UploadDropzone({ userId, onUploaded }) {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFilesSelected = async (event) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setIsUploading(true);
    setErrorMessage('');

    for (const file of files) {
      const storagePath = `${userId}/${crypto.randomUUID()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(storagePath, file);

      if (uploadError) {
        setErrorMessage(uploadError.message);
        continue;
      }

      const { error: insertError } = await supabase.from('images').insert({
        storage_path: storagePath,
        file_name: file.name,
        size_bytes: file.size,
        mime_type: file.type,
        uploaded_by: userId,
      });

      if (insertError) {
        setErrorMessage(insertError.message);
      }
    }

    setIsUploading(false);
    event.target.value = '';
    onUploaded();
  };

  return (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: 'rgba(118,167,216,0.5)',
        borderRadius: 2,
        p: { xs: 3, md: 4 },
        textAlign: 'center',
        mb: { xs: 3, md: 4 },
        bgcolor: 'background.paper',
        transition: 'border-color 0.2s',
        '&:hover': {
          borderColor: 'var(--color-primary)',
        },
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFilesSelected}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={isUploading ? <CircularProgress size={18} color="inherit" /> : <UploadFileIcon />}
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        sx={{
          px: 3,
          py: 1,
          fontWeight: 600,
          letterSpacing: '0.03em',
          boxShadow: '0 2px 8px rgba(129,130,100,0.25)',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(77,78,48,0.30)',
          },
        }}
      >
        {isUploading ? '업로드 중...' : '이미지 업로드'}
      </Button>
      <Typography
        sx={{
          color: 'var(--color-text-muted)',
          fontSize: '0.85rem',
          mt: 1.5,
        }}
      >
        이미지 파일(최대 10MB)을 여러 개 선택할 수 있습니다.
      </Typography>
      {errorMessage && (
        <Typography sx={{ color: 'error.main', fontSize: '0.85rem', mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}

export default UploadDropzone;

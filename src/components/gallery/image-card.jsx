import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { supabase } from '../../lib/supabase';
import { formatBytes } from '../../utils/format-bytes';

/**
 * ImageCard 컴포넌트
 *
 * Props:
 * @param {object} image - 표시할 이미지 메타데이터 [Required]
 * @param {string} currentUserId - 현재 로그인된 사용자 id [Required]
 * @param {function} onDeleted - 삭제 완료 후 호출되는 콜백 [Required]
 *
 * Example usage:
 * <ImageCard image={image} currentUserId={user.id} onDeleted={refetch} />
 */
function ImageCard({ image, currentUserId, onDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const isOwner = image.uploaded_by === currentUserId;

  const { data: publicUrlData } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(image.storage_path);

  const handleDownload = async () => {
    const { data, error } = await supabase.storage
      .from('gallery-images')
      .download(image.storage_path);

    if (error) return;

    const blobUrl = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = image.file_name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await supabase.storage.from('gallery-images').remove([image.storage_path]);
    await supabase.from('images').delete().eq('id', image.id);
    setIsDeleting(false);
    onDeleted();
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 20px rgba(83,117,151,0.18)',
        },
      }}
    >
      <CardMedia
        component="img"
        src={publicUrlData.publicUrl}
        alt={image.file_name}
        sx={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
      />
      <Box sx={{ p: 1.5, flexGrow: 1 }}>
        <Typography
          sx={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {image.file_name}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            mt: 0.3,
          }}
        >
          {formatBytes(image.size_bytes)}
        </Typography>
      </Box>
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          pt: 0,
          borderTop: '1px solid',
          borderColor: 'rgba(118,167,216,0.15)',
        }}
      >
        <Tooltip title="다운로드">
          <IconButton
            aria-label="다운로드"
            onClick={handleDownload}
            size="small"
            sx={{ color: 'var(--color-primary-dark)', '&:hover': { color: 'var(--color-primary)' } }}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {isOwner && (
          <Tooltip title="삭제">
            <IconButton
              aria-label="삭제"
              onClick={handleDelete}
              disabled={isDeleting}
              size="small"
              sx={{ color: 'var(--color-text-muted)', '&:hover': { color: 'error.main' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}

export default ImageCard;

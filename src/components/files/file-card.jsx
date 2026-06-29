import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { downloadFileByPublicUrl } from '../../lib/file-download';
import { formatFileSize } from '../../utils/format-file-size';

const CATEGORY_ICON = {
  document: <ArticleOutlinedIcon />,
  image:    <ImageOutlinedIcon />,
  video:    <VideocamOutlinedIcon />,
  archive:  <FolderZipOutlinedIcon />,
  folder:   <FolderOutlinedIcon />,
  other:    <InsertDriveFileOutlinedIcon />,
};

const CATEGORY_COLOR = {
  document: '#537597',
  image:    '#818264',
  video:    '#7B5EA7',
  archive:  '#C5882A',
  folder:   '#76A7D8',
  other:    '#AAADAE',
};

const CATEGORY_LABEL = {
  document: '문서',
  image:    '이미지',
  video:    '영상·음원',
  archive:  '압축파일',
  folder:   '폴더',
  other:    '기타',
};

/**
 * FileCard 컴포넌트
 *
 * Props:
 * @param {object} file - files 테이블 row 객체 [Required]
 *
 * Example usage:
 * <FileCard file={file} />
 */
function FileCard({ file }) {
  const [downloading, setDownloading] = useState(false);
  const [dlError, setDlError] = useState('');

  const catKey = file.folder_path ? 'folder' : (file.category || 'other');
  const color  = CATEGORY_COLOR[catKey] ?? '#AAADAE';

  const handleDownload = async () => {
    setDownloading(true);
    setDlError('');
    try {
      downloadFileByPublicUrl(file.storage_path, file.original_name);
    } catch (e) {
      setDlError('다운로드 실패');
    }
    setDownloading(false);
  };

  const uploadedDate = file.uploaded_at
    ? new Date(file.uploaded_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : '-';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(83,117,151,0.09)',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(83,117,151,0.16)' },
      }}
    >
      {/* 상단 아이콘 영역 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 88,
          bgcolor: `${color}18`,
          borderBottom: '1px solid',
          borderColor: `${color}22`,
        }}
      >
        <Box sx={{ fontSize: 40, color, display: 'flex' }}>
          {CATEGORY_ICON[catKey] ?? <InsertDriveFileOutlinedIcon fontSize="inherit" />}
        </Box>
      </Box>

      {/* 정보 영역 */}
      <Box sx={{ p: 1.5, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Tooltip title={file.original_name} placement="top">
          <Typography
            sx={{
              fontSize: '0.88rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {file.original_name}
          </Typography>
        </Tooltip>

        {file.folder_path && (
          <Typography sx={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            📁 {file.folder_path}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap', mt: 0.5 }}>
          <Chip
            label={(file.extension || '?').toUpperCase()}
            size="small"
            sx={{ height: 18, fontSize: '0.68rem', fontWeight: 700, bgcolor: `${color}22`, color }}
          />
          <Chip
            label={CATEGORY_LABEL[catKey] ?? '기타'}
            size="small"
            sx={{ height: 18, fontSize: '0.68rem', bgcolor: 'rgba(118,167,216,0.12)', color: 'var(--color-primary-dark)' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pt: 1 }}>
          <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            {formatFileSize(file.file_size)}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            {uploadedDate}
          </Typography>
        </Box>

        {dlError && (
          <Typography sx={{ fontSize: '0.72rem', color: 'error.main' }}>{dlError}</Typography>
        )}
      </Box>

      {/* 다운로드 버튼 */}
      <Box
        sx={{
          px: 1.5,
          pb: 1.5,
          pt: 0.5,
          borderTop: '1px solid rgba(118,167,216,0.12)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Tooltip title="다운로드">
          <IconButton
            aria-label={`${file.original_name} 다운로드`}
            onClick={handleDownload}
            disabled={downloading}
            size="small"
            sx={{
              bgcolor: 'rgba(118,167,216,0.10)',
              color: 'var(--color-primary-dark)',
              minWidth: 44,
              minHeight: 44,
              '&:hover': { bgcolor: 'var(--color-primary)', color: 'white' },
            }}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}

export default FileCard;

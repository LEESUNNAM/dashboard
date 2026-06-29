import { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Header from '../components/common/header';
import UploadArea from '../components/upload/upload-area';
import CategoryTabs from '../components/files/category-tabs';
import SearchSortBar from '../components/files/search-sort-bar';
import FileList from '../components/files/file-list';
import { useFiles } from '../hooks/use-files';
import { useUploadFiles } from '../hooks/use-upload-files';

/**
 * FileSharePage 컴포넌트
 *
 * 파일 공유 웹사이트 메인 페이지.
 * Header → UploadArea → CategoryTabs + SearchSortBar → FileList 순으로 구성된다.
 *
 * Props:
 * @param {object}   user      - Supabase 인증 유저 객체 [Required]
 * @param {function} onSignOut - 로그아웃 핸들러 [Required]
 *
 * Example usage:
 * <FileSharePage user={user} onSignOut={signOut} />
 */
function FileSharePage({ user, onSignOut }) {
  const [category, setCategory] = useState('all');
  const [search,   setSearch]   = useState('');
  const [sort,     setSort]     = useState('newest');
  const uploadRef = useRef(null);

  const { files, totalCount, loading, error, refetch } = useFiles({ category, search, sort });
  const { items, isUploading, uploadFiles } = useUploadFiles(refetch);

  const scrollToUpload = useCallback(() => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <Box>
      <Header onUploadClick={scrollToUpload} user={user} onSignOut={onSignOut} />

      <Box ref={uploadRef}>
        <UploadArea onUpload={uploadFiles} isUploading={isUploading} items={items} />
      </Box>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(118,167,216,0.18)' }} />

      {/* 파일 목록 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
          파일 목록
        </Typography>
        <Typography sx={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          {!loading && `총 ${totalCount}개`}
        </Typography>
      </Box>

      <CategoryTabs value={category} onChange={(v) => { setCategory(v); setSearch(''); }} />
      <SearchSortBar search={search} onSearch={setSearch} sort={sort} onSort={setSort} />
      <FileList
        files={files}
        isLoading={loading}
        error={error}
        category={category}
        search={search}
        onUploadClick={scrollToUpload}
        onDeleted={refetch}
      />
    </Box>
  );
}

export default FileSharePage;

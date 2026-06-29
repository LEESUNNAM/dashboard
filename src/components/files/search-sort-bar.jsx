import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SORT_OPTIONS = [
  { value: 'newest',    label: '최신 업로드순' },
  { value: 'oldest',    label: '오래된 업로드순' },
  { value: 'name_asc',  label: '파일명순' },
  { value: 'size_desc', label: '파일 크기순' },
];

/**
 * SearchSortBar 컴포넌트
 *
 * Props:
 * @param {string}   search       - 현재 검색어 [Required]
 * @param {function} onSearch     - 검색어 변경 핸들러 [Required]
 * @param {string}   sort         - 현재 정렬 옵션 [Required]
 * @param {function} onSort       - 정렬 변경 핸들러 [Required]
 * @param {number}   totalCount   - 표시 중인 파일 수 [Optional]
 *
 * Example usage:
 * <SearchSortBar search={search} onSearch={setSearch} sort={sort} onSort={setSort} />
 */
function SearchSortBar({ search, onSearch, sort, onSort, totalCount }) {
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: 'background.paper',
      '& fieldset': { borderColor: 'rgba(118,167,216,0.35)' },
      '&:hover fieldset': { borderColor: 'var(--color-primary)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1.5,
        alignItems: { xs: 'stretch', sm: 'center' },
        mb: 2,
      }}
    >
      <TextField
        size="small"
        placeholder="파일명, 확장자, 폴더명 검색..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        sx={{ flex: 1, ...inputSx }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: 'var(--color-text-muted)' }} />
            </InputAdornment>
          ),
        }}
        inputProps={{ 'aria-label': '파일 검색' }}
      />
      <Select
        size="small"
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        displayEmpty
        sx={{
          minWidth: 150,
          borderRadius: 2,
          bgcolor: 'background.paper',
          fontSize: '0.88rem',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(118,167,216,0.35)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary)' },
        }}
        inputProps={{ 'aria-label': '정렬 선택' }}
      >
        {SORT_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.88rem' }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default SearchSortBar;

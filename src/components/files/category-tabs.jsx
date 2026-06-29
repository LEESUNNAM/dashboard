import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { CATEGORIES } from '../../utils/file-category';

/**
 * CategoryTabs 컴포넌트
 *
 * Props:
 * @param {string}   value    - 현재 선택된 카테고리 키 [Required]
 * @param {function} onChange - 탭 변경 핸들러 (key) => void [Required]
 *
 * Example usage:
 * <CategoryTabs value={category} onChange={setCategory} />
 */
function CategoryTabs({ value, onChange }) {
  return (
    <Tabs
      value={value}
      onChange={(_, v) => onChange(v)}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      sx={{
        mb: 2,
        borderBottom: '1px solid',
        borderColor: 'rgba(118,167,216,0.25)',
        '& .MuiTab-root': {
          fontWeight: 600,
          fontSize: '0.88rem',
          color: 'var(--color-text-muted)',
          minWidth: 'auto',
          px: { xs: 1.5, md: 2.5 },
          py: 1.2,
          '&.Mui-selected': { color: 'var(--color-primary-dark)' },
        },
        '& .MuiTabs-indicator': {
          bgcolor: 'var(--color-primary)',
          height: 2.5,
          borderRadius: 1,
        },
      }}
    >
      {CATEGORIES.map((cat) => (
        <Tab key={cat.key} label={cat.label} value={cat.key} disableRipple />
      ))}
    </Tabs>
  );
}

export default CategoryTabs;

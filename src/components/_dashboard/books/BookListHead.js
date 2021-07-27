import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@material-ui/utils';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core';

// ----------------------------------------------------------------------

BookListHead.propTypes = {
  order: PropTypes.oneOf(['', '-']),
  orderBy: PropTypes.string,
  // rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  // numSelected: PropTypes.number,
  onRequestSort: PropTypes.func
  // onSelectAllClick: PropTypes.func
};

export default function BookListHead({
  order,
  orderBy,
  // rowCount,
  headLabel,
  // numSelected,
  onRequestSort
  // onSelectAllClick
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const direction = order === '-' ? 'asc' : 'desc';

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell> */}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? direction : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? direction : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {direction === '-' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

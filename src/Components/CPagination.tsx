import { Pagination, PaginationProps } from "react-admin";

const rowsPerPageOptions = [10, 25, 50];

export const CPagination = (props: PaginationProps) => (
  <Pagination rowsPerPageOptions={rowsPerPageOptions} {...props} />
);

export const CListPagination = (props: PaginationProps) => (
  <Pagination rowsPerPageOptions={props.rowsPerPageOptions} {...props} />
);

import { useMantineTheme } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";

type TAppTableProps<T> = {
  columns: {
    accessor: string;
    title?: string;
    render?: (data: T) => React.ReactNode;
    textAlign?: "left" | "center" | "right";
    width?: number | string;
  }[];
  data: T[];
  isResetPage?: unknown;
  externalRecords?: T[];
  setExternalRecords?: (value: T[]) => void;
  onRowClick?: (value: T) => void;
  onQueryChange?: (value: { pageSize: number; curPage: number }) => void;
  totalElements?: number;
  isLoading?: boolean;
};
const PAGE_SIZES = [10, 15, 20];

function AppTable<T>({
  columns,
  data,
  isLoading = false,
  totalElements,
  onQueryChange,
  externalRecords,
  setExternalRecords,
  isResetPage,
  onRowClick,
}: TAppTableProps<T>) {
  const theme = useMantineTheme();

  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (onQueryChange) {
      onQueryChange({ pageSize: pageSize, curPage: page });
    }
  }, [page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [isResetPage]);

  return (
    //@ts-expect-error no check
    <DataTable
      columns={columns}
      fetching={isLoading}
      records={
        data?.map((item) => ({
          ...item,
          id: Math.random(),
        })) || []
      }
      striped
      stripedColor={theme.colors.gray[2]}
      withRowBorders
      withColumnBorders
      shadow="sm"
      onRowClick={(value) => onRowClick && onRowClick(value.record)}
      highlightOnHover
      verticalAlign="center"
      verticalSpacing={"sm"}
      borderRadius={"sm"}
      height={500}
      styles={{
        header: {
          backgroundColor: "#FFFFFF",
          zIndex: 10,
        },
      }}
      noRecordsText={"Không có dữ liệu"}
      scrollAreaProps={{ type: "always" }}
      totalRecords={totalElements ? totalElements : data.length}
      paginationActiveBackgroundColor="grape"
      recordsPerPage={pageSize}
      page={page}
      onPageChange={setPage}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      loadingText={"Đang tải dữ liệu"}
      recordsPerPageLabel={"Số hàng mỗi trang"}
      selectedRecords={externalRecords}
      onSelectedRecordsChange={setExternalRecords}
    />
  );
}

export default AppTable;

import { ActionIcon, Badge, Button, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "../../components/AppTable";

import { IconDownload, IconFileExcel } from "@tabler/icons-react";
import { useGetListHistoryFileQuery } from "../../redux/api/excel/excel.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NAV_LINK from "../../constants/navLinks";
import { resetAppInfo } from "../../redux/slices/appSlices";

const HistoryExportExcelPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, token } = useSelector((state: RootState) => state.app);

  const [query, setQuery] = useState<{ u: string; nu: number; sz: number }>({
    nu: 0,
    sz: 15,
    u: username,
  });
  const { data: excel, isFetching: isFetchingExcel } =
    useGetListHistoryFileQuery(
      { u: query.u || "" },
      {
        skip: query.u ? false : true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
      }
    );

  useEffect(() => {
    if (!token) {
      navigate(NAV_LINK.LOGIN);
      dispatch(resetAppInfo());
    }
  }, [navigate, token, dispatch]);
  return (
    <Stack flex={1}>
      <Group justify="space-between" wrap="wrap">
        <Text fz={"h3"} fw={"bold"}>
          Tìm kiếm thông tin
        </Text>
        <Button leftSection={<IconFileExcel size={"1.125rem"} />}>
          Xuất File
        </Button>
      </Group>
      <AppTable
        columns={[
          {
            accessor: "feature_code",
            title: "Chức năng",
          },

          {
            accessor: "status",
            title: "Trạng thái",
            textAlign: "center",
            render: (record) => {
              if (record.status === 1)
                return <Badge color="green">Hoàn thành</Badge>;
              return <Badge color="yellow">Đang xử lý</Badge>;
            },
          },
          {
            accessor: "",
            title: "Chức năng",
            textAlign: "center",
            render: (record) => {
              if (record.status === 1)
                return (
                  <ActionIcon
                    variant="outline"
                    onClick={() => {
                      window.open(record.file_url, "_blank");
                    }}
                  >
                    <IconDownload size={"1.125rem"} />
                  </ActionIcon>
                );
            },
          },
          {
            accessor: "time_request",
            title: "Thời gian yêu cầu",
            textAlign: "center",
          },
          {
            accessor: "time_done",
            title: "Thời gian hoàn thành",
            textAlign: "center",
          },
        ]}
        data={
          excel?.slice(query.nu * query.sz, (query.nu + 1) * query.sz) || []
        }
        isLoading={isFetchingExcel}
        onQueryChange={(value) => {
          console.log(value);
          setQuery({
            ...query,
            nu: value.curPage - 1,
            sz: Number(value.pageSize),
          });
        }}
        totalElements={excel?.length}
      />
    </Stack>
  );
};

export default HistoryExportExcelPage;

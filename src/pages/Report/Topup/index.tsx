import { Button, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NAV_LINK from "../../../constants/navLinks";
import { TIqrRangeDateTimeREQ } from "../../../redux/api/iqr/iqr.request";
import AppTable from "../../../components/AppTable";
import { IconFileExcel } from "@tabler/icons-react";
import dayjs from "dayjs";
import { DateInput } from "@mantine/dates";
import {
  useTopupCounterQuery,
  useTopupRangeDateQuery,
} from "../../../redux/api/topup/topup.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetAppInfo } from "../../../redux/slices/appSlices";

const ReportTopupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.app);

  const [query, setQuery] = useState<Partial<TIqrRangeDateTimeREQ>>({
    nu: 0,
    sz: 15,
    gateway: 2,
    st: new Date(),
    ed: new Date(),
  });
  const { data: topup, isFetching: isFetchingTopup } = useTopupRangeDateQuery(
    {
      ...query,
      st: +(dayjs(query.st).format("YYYYMMDD") + "0000"),
      ed: +(dayjs(query.ed).format("YYYYMMDD") + "2359"),
    },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: topupCounter } = useTopupCounterQuery(
    {
      ...query,
      st: +(dayjs(query.st).format("YYYYMMDD") + "0000"),
      ed: +(dayjs(query.ed).format("YYYYMMDD") + "2359"),
    },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (!token) {
      navigate(NAV_LINK.LOGIN);
      dispatch(resetAppInfo());
    }
  }, [navigate, dispatch, token]);
  return (
    <Stack flex={1}>
      <Group justify="space-between" wrap="wrap">
        <Text fz={"h3"} fw={"bold"}>
          Tìm kiếm thông tin
        </Text>
        <Group>
          <DateInput
            placeholder="Ngày bắt đầu"
            clearable
            locale="vi"
            valueFormat="DD/MM/YYYY"
            value={query.st}
            maxDate={query.ed}
            onChange={(value) => setQuery({ ...query, st: value || undefined })}
          />
          <DateInput
            placeholder="Ngày kết thúc"
            value={query.ed}
            locale="vi"
            valueFormat="DD/MM/YYYY"
            onChange={(value) => setQuery({ ...query, ed: value || undefined })}
            clearable
          />
          <Button leftSection={<IconFileExcel size={"1.125rem"} />}>
            Xuất File
          </Button>
        </Group>
      </Group>
      <AppTable
        columns={[
          {
            accessor: "code",
            title: "Mã Iqr",
          },

          {
            accessor: "customer_name",
            title: "Tên khách hàng",
          },
          {
            accessor: "phone",
            title: "Số điện thoại",
          },
          {
            accessor: "price",
            title: "Giá",
          },
          {
            accessor: "response_id",
            title: "Mã giao dịch",
          },
          {
            accessor: "time",
            title: "Thời gian giao dịch",
          },
        ]}
        data={topup || []}
        isLoading={isFetchingTopup}
        onQueryChange={(value) => {
          console.log(value);
          setQuery({
            ...query,
            nu: value.curPage - 1,
            sz: Number(value.pageSize),
          });
        }}
        totalElements={topupCounter}
      />
    </Stack>
  );
};

export default ReportTopupPage;

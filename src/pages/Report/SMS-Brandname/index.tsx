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
  useBrandnameCounterQuery,
  useBrandnameRangeDateQuery,
} from "../../../redux/api/brandname/brandname.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetAppInfo } from "../../../redux/slices/appSlices";

const ReportSMSBrandnamePage = () => {
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
  const { data: brandname, isFetching: isFetchingBrandname } =
    useBrandnameRangeDateQuery(
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
  const { data: brandnameCounter } = useBrandnameCounterQuery(
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
            value={query.st}
            locale="vi"
            valueFormat="DD/MM/YYYY"
            maxDate={query.ed}
            onChange={(value) =>
              setQuery({ ...query, st: value || undefined, nu: 0 })
            }
          />
          <DateInput
            placeholder="Ngày kết thúc"
            value={query.ed}
            locale="vi"
            minDate={query.st}
            valueFormat="DD/MM/YYYY"
            onChange={(value) =>
              setQuery({ ...query, ed: value || undefined, nu: 0 })
            }
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
            accessor: "transactionid",
            title: "Mã giao dịch",
            textAlign: "center",
          },
          {
            accessor: "phone",
            title: "Số điện thoại",
            textAlign: "center",
          },
          {
            accessor: "content",
            title: "Nội dung",
            width: 400,
          },
          {
            accessor: "time",
            title: "Thời gian topup",
          },
        ]}
        data={brandname || []}
        isLoading={isFetchingBrandname}
        onQueryChange={(value) => {
          console.log(value);
          if (query.nu !== value.curPage - 1 || query.sz !== value.pageSize)
            setQuery({
              ...query,
              nu: value.curPage - 1,
              sz: value.pageSize,
            });
        }}
        isResetPage={query.ed ? true : false}
        totalElements={brandnameCounter}
      />
    </Stack>
  );
};

export default ReportSMSBrandnamePage;

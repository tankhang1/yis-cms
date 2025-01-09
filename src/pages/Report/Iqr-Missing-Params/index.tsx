import { Badge, Button, Group, Image, Stack, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NAV_LINK from "../../../constants/navLinks";
import { TIqrRangeDateTimeREQ } from "../../../redux/api/iqr/iqr.request";
import {
  useGetProvincesQuery,
  useIqrCounterQuery,
  useIqrRangeDateQuery,
} from "../../../redux/api/iqr/iqr.api";
// import { useConfirmIqrMutation, useRejectIqrMutation, useUpdateIqrMutation } from "../../../redux/api/auth/auth.api";
import AppTable from "../../../components/AppTable";
import { IconFileExcel } from "@tabler/icons-react";
import dayjs from "dayjs";
import { DateInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetAppInfo } from "../../../redux/slices/appSlices";
import { IMAGE_PLACEHOLDER } from "../../../constants";
const MapLabel = new Map([
  ["xemay", "Xe máy Air Blade 125cc"],
  ["topup", "Nạp tiền 10.000VND"],
  ["tulanh", "Tủ lạnh Sharp 362L"],
  ["loaJBL", "Loa JBL Partybox110"],
  ["", "Không trúng thưởng"],
]);
const ReportIqrMissingParamsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.app);

  const [query, setQuery] = useState<Partial<TIqrRangeDateTimeREQ>>({
    nu: 0,
    sz: 15,
    gateway: 2,
    s: 0,
    st: new Date(),
    ed: new Date(),
  });
  const { data: iqr, isFetching: isFetchingIqr } = useIqrRangeDateQuery(
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
  const { data: iqrCounter } = useIqrCounterQuery(
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

  //   const [rejectIqr, { isLoading: isLoadingReject }] = useRejectIqrMutation();
  //   const [confirmIqr, { isLoading: isLoadingConfirm }] = useConfirmIqrMutation();
  //   const [updateIqr, { isLoading: isLoadingUpdate }] = useUpdateIqrMutation();
  const { data: provinces } = useGetProvincesQuery();
  const mapProvince = useCallback(
    (code: string) => {
      if (!code) return "";
      return provinces?.find((province) => province.code === code)?.name;
    },
    [provinces]
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
            accessor: "image_confirm",
            title: "Hình ảnh",
            textAlign: "center",
            render: (record) => (
              <Image
                src={record.image_confirm || IMAGE_PLACEHOLDER}
                w={100}
                h={100}
                fit="cover"
              />
            ),
          },
          {
            accessor: "seri",
            title: "Số seri",
            textAlign: "center",
          },
          {
            accessor: "code",
            title: "Mã iQr",
            textAlign: "center",
          },

          {
            accessor: "",
            title: "Duyệt",
            textAlign: "center",
            width: 150,
            render: (record) => {
              if (record.status === 2)
                return <Badge color="green">Đã xử lý</Badge>;
              if (record.status === 3)
                return <Badge color="red">Từ chối</Badge>;
              if (record.status === 0)
                return <Badge color="blue">Thiếu thông tin</Badge>;

              return <Badge color="yellow">Chưa xử lý</Badge>;
            },
          },
          {
            accessor: "product_name",
            title: "Tên sản phẩm",
          },

          {
            accessor: "award1",
            title: "Cơ hội 1",
            render: (record) => record?.award1 && MapLabel.get(record.award1),
          },
          {
            accessor: "award2",
            title: "Cơ hội 2",
            render: (record) => record?.award2 && MapLabel.get(record.award2),
          },
          {
            accessor: "phone",
            title: "Số điện thoại",
          },
          {
            accessor: "fullname",
            title: "Tên khách hàng",
          },
          {
            accessor: "province",
            title: "Tỉnh đăng ký",
            render: (record) =>
              record?.province && mapProvince(record.province),
          },
          {
            accessor: "province_name_agent",
            title: "Tỉnh xác thực",
            render: (record) =>
              record?.province_name_agent &&
              mapProvince(record.province_name_agent),
          },
          {
            accessor: "address",
            title: "Địa chỉ",
          },
          {
            accessor: "note",
            title: "Ghi chú",
          },
          {
            accessor: "time_active",
            title: "Thời gian kích hoạt",
          },
          {
            accessor: "time_turn",
            title: "Thời gian sử dụng",
          },
          {
            accessor: "time_finish",
            title: "Thời gian xử lý",
          },
        ]}
        data={iqr || []}
        isLoading={isFetchingIqr}
        onQueryChange={(value) => {
          console.log(value);
          setQuery({
            ...query,
            nu: value.curPage - 1,
            sz: Number(value.pageSize),
          });
        }}
        totalElements={iqrCounter}
      />
    </Stack>
  );
};

export default ReportIqrMissingParamsPage;

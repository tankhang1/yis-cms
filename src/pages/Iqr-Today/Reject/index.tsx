import { ActionIcon, Badge, Group, Input, Stack, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NAV_LINK from "../../../constants/navLinks";
import { TIqrRangeTimeREQ } from "../../../redux/api/iqr/iqr.request";
import {
  useGetProvincesQuery,
  useIqrCounterTodayQuery,
  useIqrTodayQuery,
} from "../../../redux/api/iqr/iqr.api";
// import { useConfirmIqrMutation, useRejectIqrMutation, useUpdateIqrMutation } from "../../../redux/api/auth/auth.api";
import AppTable from "../../../components/AppTable";
import {
  IconCircleCheckFilled,
  IconEdit,
  IconSearch,
  IconTriangleFilled,
  IconX,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { resetAppInfo } from "../../../redux/slices/appSlices";
import { RootState } from "../../../redux/store";
const MapLabel = new Map([
  ["xemay", "Xe máy Air Blade 125cc"],
  ["topup", "Nạp tiền 10.000VND"],
  ["tulanh", "Tủ lạnh Sharp 362L"],
  ["loaJBL", "Loa JBL Partybox110"],
  ["", "Không trúng thưởng"],
]);
const IqrRejectTodayPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.app);

  const [query, setQuery] = useState<Partial<TIqrRangeTimeREQ>>({
    nu: 0,
    sz: 15,
    gateway: 2,
    s: 3,
    k: "",
  });
  const { data: iqr, isFetching: isFetchingIqr } = useIqrTodayQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: iqrCounter } = useIqrCounterTodayQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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
        <Input
          placeholder="Nhập mã số may mắn và số điện thoại"
          w={"25%"}
          value={query.k}
          leftSection={<IconSearch size={"1rem"} />}
          rightSectionPointerEvents="all"
          rightSection={
            query.k && (
              <ActionIcon
                variant="subtle"
                color="red"
                size={"1rem"}
                onClick={() => setQuery({ ...query, k: "" })}
              >
                <IconX />
              </ActionIcon>
            )
          }
          onChange={(e) => setQuery({ ...query, k: e.target.value })}
        />{" "}
      </Group>
      <AppTable
        columns={[
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
            accessor: "status",
            title: "Trạng thái",
            textAlign: "center",
            render: (record) =>
              record.status === 2 ? (
                <ActionIcon color={"blue"}>
                  <IconCircleCheckFilled size={"1.125rem"} />
                </ActionIcon>
              ) : (
                <ActionIcon color="red">
                  <IconTriangleFilled size={"1.125rem"} />
                </ActionIcon>
              ),
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
            accessor: "",
            title: "Chỉnh sửa",
            textAlign: "center",
            render: (record) => (
              <ActionIcon onClick={() => console.log(record)} variant="outline">
                <IconEdit size={"1.125rem"} />
              </ActionIcon>
            ),
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
            width: 200,
          },
        ]}
        data={iqr || []}
        isLoading={isFetchingIqr}
        onQueryChange={(value) => {
          console.log(value);
          setQuery({
            ...query,
            nu: value.curPage,
            sz: Number(value.pageSize),
          });
        }}
        totalElements={iqrCounter}
      />
    </Stack>
  );
};

export default IqrRejectTodayPage;

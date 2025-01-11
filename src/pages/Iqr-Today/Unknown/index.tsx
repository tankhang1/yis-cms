import {
  ActionIcon,
  Badge,
  Button,
  Drawer,
  Group,
  Image,
  Input,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NAV_LINK from "../../../constants/navLinks";
import {
  TIqrRangeTimeREQ,
  TIqrUpdateREQ,
} from "../../../redux/api/iqr/iqr.request";
import {
  useGetProvincesQuery,
  useIqrCounterTodayQuery,
  useIqrTodayQuery,
} from "../../../redux/api/iqr/iqr.api";
// import { useConfirmIqrMutation, useRejectIqrMutation, useUpdateIqrMutation } from "../../../redux/api/auth/auth.api";
import AppTable from "../../../components/AppTable";
import {
  IconCircleCheckFilled,
  IconSearch,
  IconTriangleFilled,
  IconX,
  IconZoomScan,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetAppInfo } from "../../../redux/slices/appSlices";
import { TIqrRES } from "../../../redux/api/iqr/iqr.response";
import {
  useConfirmIqrMutation,
  useRejectIqrMutation,
} from "../../../redux/api/auth/auth.api";
import { useForm } from "react-hook-form";
import NotificationHelper from "../../../helpers/notification.helper";
import { IMAGE_PLACEHOLDER } from "../../../constants";
const MapLabel = new Map([
  ["xemay", "Xe máy Air Blade 125cc"],
  ["topup", "Nạp tiền 10.000VND"],
  ["tulanh", "Tủ lạnh Sharp 362L"],
  ["loaJBL", "Loa JBL Partybox110"],
  ["", "Không trúng thưởng"],
]);
const IqrUnknownTodayPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.app);
  const { register, reset, getValues, watch } = useForm<TIqrUpdateREQ>();

  const [query, setQuery] = useState<Partial<TIqrRangeTimeREQ>>({
    nu: 0,
    sz: 15,
    gateway: 2,
    s: 4,
    k: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [iqrDetail, setIqrDetail] = useState<TIqrRES>();

  const { data: iqr, isFetching: isFetchingIqr } = useIqrTodayQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: iqrCounter } = useIqrCounterTodayQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [rejectIqr, { isLoading: isLoadingReject }] = useRejectIqrMutation();
  const [confirmIqr, { isLoading: isLoadingConfirm }] = useConfirmIqrMutation();
  //   const [updateIqr, { isLoading: isLoadingUpdate }] = useUpdateIqrMutation();
  const { data: provinces } = useGetProvincesQuery();
  const mapProvince = useCallback(
    (code: string) => {
      if (!code) return "";
      return provinces?.find((province) => province.code === code)?.name;
    },
    [provinces]
  );

  const onReject = async (code: string) => {
    const { note } = getValues();
    await rejectIqr({ code, note })
      .unwrap()
      .then((value) => {
        if (value.status === 0)
          NotificationHelper.showSuccess("Thông báo", "Từ chối thành công");
        else NotificationHelper.showError("Thông báo", "Từ chối thất bại");
        setIqrDetail(undefined);
        reset();
      })
      .catch(() => {
        NotificationHelper.showError("Thông báo", "Từ chối thất bại");
        setIqrDetail(undefined);
        reset();
      });
  };
  const onConfirm = async (code: string) => {
    const { note } = getValues();

    await confirmIqr({ code, note })
      .unwrap()
      .then((value) => {
        if (value.status === 0) {
          NotificationHelper.showSuccess("Thông báo", "Duyệt thành công");
        } else NotificationHelper.showError("Thông báo", "Duyệt thất bại");
        setIqrDetail(undefined);
        reset();
      })
      .catch(() => {
        NotificationHelper.showError("Thông báo", "Duyệt thất bại");
        setIqrDetail(undefined);
        reset();
      });
  };
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
                onClick={() => setQuery({ ...query, k: "", nu: 0 })}
              >
                <IconX />
              </ActionIcon>
            )
          }
          onChange={(e) => setQuery({ ...query, k: e.target.value, nu: 0 })}
        />
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
                <ActionIcon
                  color="red"
                  onClick={() => {
                    setIqrDetail(record);
                  }}
                >
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
          if (query.nu !== value.curPage - 1 || query.sz !== value.pageSize)
            setQuery({
              ...query,
              nu: value.curPage - 1,
              sz: value.pageSize,
            });
        }}
        isResetPage={query.k ? true : false}
        totalElements={iqrCounter}
      />
      <Modal
        opened={iqrDetail !== undefined}
        onClose={() => setIqrDetail(undefined)}
        title={
          <Text fz={"h4"} fw={"bold"}>
            Thông tin trúng giải
          </Text>
        }
        size={"lg"}
        centered
      >
        <Group gap={10} align="flex-start">
          <Stack pos={"relative"}>
            <Image
              src={iqrDetail?.image_confirm || IMAGE_PLACEHOLDER}
              w={300}
              mah={400}
              fit="cover"
              radius={"md"}
              loading="lazy"
            />
            <Group pos={"absolute"} top={10} right={10} gap={"xs"}>
              <ActionIcon
                color={"blue"}
                onClick={() =>
                  setPreviewImage(iqrDetail?.image_confirm || IMAGE_PLACEHOLDER)
                }
              >
                <IconZoomScan size={"1.125rem"} color="white" />
              </ActionIcon>
            </Group>
          </Stack>
          <Stack flex={1}>
            <Stack gap={0}>
              <Text c={"gray"} fz={"h6"}>
                {iqrDetail?.time_active || ""}
              </Text>
              <Text c={"black"} fw={"bold"} fz={"h4"}>
                {iqrDetail?.product_name || ""}
              </Text>
              <Text c={"black"} fz={"h5"}>
                {iqrDetail?.fullname || ""}
              </Text>
              <Text c={"black"} fz={"h5"}>
                {iqrDetail?.phone || ""}
              </Text>
              <Text c={"black"} fz={"h5"}>
                {iqrDetail?.code || ""}
              </Text>
              <Text c={"black"} fz={"h5"}>
                {iqrDetail?.province_name || ""}
              </Text>
              <Text c={"black"} fz={"h3"} fw={"bold"}>
                Giải thưởng:{" "}
                {MapLabel.get(iqrDetail?.award1 || iqrDetail?.award2 || "") ||
                  "Chúc bạn may mắn lần sau"}
              </Text>

              <Input.Wrapper label="Ghi chú">
                <Input
                  placeholder="Ghi chú"
                  {...register("note")}
                  value={watch().note}
                />
              </Input.Wrapper>
            </Stack>

            <Group align="center" justify="center">
              <Button
                loading={isLoadingConfirm}
                onClick={() => onConfirm(iqrDetail?.code || "")}
              >
                Duyệt
              </Button>
              <Button
                color={"red"}
                loading={isLoadingReject}
                onClick={() => onReject(iqrDetail?.code || "")}
              >
                Từ chối
              </Button>
            </Group>
          </Stack>
        </Group>
      </Modal>
      <Drawer
        offset={8}
        radius="md"
        opened={previewImage !== ""}
        onClose={() => setPreviewImage("")}
        withCloseButton
        size={"100%"}
      >
        <Stack justify="center" align="center" flex={1}>
          <Image src={previewImage} maw={"50%"} mah={"85dvh"} fit="cover" />
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default IqrUnknownTodayPage;

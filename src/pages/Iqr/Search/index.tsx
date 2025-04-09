import {
  ActionIcon,
  Badge,
  Button,
  Drawer,
  Group,
  Image,
  Input,
  Modal,
  NativeSelect,
  Stack,
  Text,
} from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NAV_LINK from "../../../constants/navLinks";
import {
  TIqrRangeTimeREQ,
  TIqrUpdateREQ,
} from "../../../redux/api/iqr/iqr.request";
import {
  useGetProvincesQuery,
  useIqrCounterQuery,
  useIqrRangeDateQuery,
} from "../../../redux/api/iqr/iqr.api";
// import { useConfirmIqrMutation, useRejectIqrMutation, useUpdateIqrMutation } from "../../../redux/api/auth/auth.api";
import AppTable from "../../../components/AppTable";
import {
  IconCircleCheckFilled,
  IconEdit,
  IconSearch,
  IconTriangleFilled,
  IconUpload,
  IconX,
  IconZoomScan,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetAppInfo } from "../../../redux/slices/appSlices";
import { useForm } from "react-hook-form";
import { TIqrRES } from "../../../redux/api/iqr/iqr.response";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  useConfirmIqrMutation,
  useRejectIqrMutation,
  useUpdateIqrMutation,
} from "../../../redux/api/auth/auth.api";
import NotificationHelper from "../../../helpers/notification.helper";
import { uploadBase64Image } from "../../../hooks/uploadFile";
import { BASE_URL, IMAGE_PLACEHOLDER } from "../../../constants";
const MapLabel = new Map([
  ["xemay", "Xe máy Air Blade 125cc"],
  ["topup", "Nạp tiền 10.000VND"],
  ["tulanh", "Tủ lạnh Sharp 362L"],
  ["loaJBL", "Loa JBL Partybox110"],
  ["", "Không trúng thưởng"],
]);
const IqrSearchPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openedEditForm, { toggle: toggleEditForm }] = useDisclosure(false);

  const [previewImage, setPreviewImage] = useState("");
  const [iqrDetail, setIqrDetail] = useState<TIqrRES>();

  const { token } = useSelector((state: RootState) => state.app);
  const { register, handleSubmit, reset, watch, setValue, getValues } =
    useForm<TIqrUpdateREQ>();
  const [query, setQuery] = useState<Partial<TIqrRangeTimeREQ>>({
    nu: 0,
    sz: 15,
    gateway: 2,
    k: "",
  });
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);

  const { data: iqr, isFetching: isFetchingIqr } = useIqrRangeDateQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: iqrCounter } = useIqrCounterQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [rejectIqr, { isLoading: isLoadingReject }] = useRejectIqrMutation();
  const [confirmIqr, { isLoading: isLoadingConfirm }] = useConfirmIqrMutation();
  const [updateIqr, { isLoading: isLoadingUpdate }] = useUpdateIqrMutation();
  const { data: provinces } = useGetProvincesQuery();
  const mapProvince = useCallback(
    (code: string) => {
      if (!code) return "";
      return provinces?.find((province) => province.code === code)?.name;
    },
    [provinces]
  );
  const onOpenEditForm = (record: TIqrRES) => {
    toggleEditForm();
    setValue("image_confirm", record.image_confirm || "");
    setValue("name", record.fullname || "");
    setValue("province_name_agent", record.province_name_agent);
    setValue("address", record.address);
    setValue("code", record.code || "");
    setValue("note", record.note || "");
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64String = reader.result.toString();
          console.log(base64String); // Log the Base64 string
          setValue("image_confirm", base64String); // Update the form value with the Base64 string
        }
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const onReject = async (code: string) => {
    const { note } = getValues();

    await rejectIqr({ code, note })
      .unwrap()
      .then((value) => {
        if (value.status === 0)
          NotificationHelper.showSuccess("Thông báo", "Từ chối thành công");
        else NotificationHelper.showError("Thông báo", "Từ chối thất bại");
        setValue("note", "");

        setIqrDetail(undefined);
      })
      .catch(() => {
        NotificationHelper.showError("Thông báo", "Từ chối thất bại");
        setValue("note", "");

        setIqrDetail(undefined);
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
        setValue("note", "");
      })
      .catch(() => {
        NotificationHelper.showError("Thông báo", "Duyệt thất bại");
        setValue("note", "");
        setIqrDetail(undefined);
      });
  };
  const onUpdateIqr = async (values: TIqrUpdateREQ) => {
    if (values.image_confirm.includes("https://")) {
      await updateIqr(values)
        .unwrap()
        .then((value) => {
          if (value.status === 0) {
            NotificationHelper.showSuccess("Thông báo", "Cập nhật thành công");
          } else NotificationHelper.showError("Thông báo", "Cập nhật thất bại");
          toggleEditForm();
          reset();
        })
        .catch(() => {
          NotificationHelper.showError("Thông báo", "Cập nhật thất bại");
          toggleEditForm();
          reset();
        });
    } else {
      setIsLoadingUploadImage(true);
      await uploadBase64Image(values.image_confirm, values.code);
      await updateIqr({
        ...values,
        image_confirm: `${BASE_URL}/${values.code}.jpg`,
      })
        .unwrap()
        .then((value) => {
          if (value.status === 0) {
            NotificationHelper.showSuccess("Thông báo", "Cập nhật thành công");
          } else NotificationHelper.showError("Thông báo", "Cập nhật thất bại");
          toggleEditForm();
          setIsLoadingUploadImage(false);
          reset();
        })
        .catch(() => {
          NotificationHelper.showError("Thông báo", "Cập nhật thất bại");
          toggleEditForm();
          setIsLoadingUploadImage(false);
          reset();
        });
    }
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
            accessor: "batch_number",
            title: "Mã túi",
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
                    setValue("note", record.note);
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
            accessor: "",
            title: "Chỉnh sửa",
            textAlign: "center",
            render: (record) =>
              (record.status === 2 ||
                record.status === 3 ||
                record.status === 0) && (
                <ActionIcon
                  onClick={() => onOpenEditForm(record)}
                  variant="outline"
                >
                  <IconEdit size={"1.125rem"} />
                </ActionIcon>
              ),
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
        opened={openedEditForm}
        onClose={toggleEditForm}
        title={
          <Text fz={"h4"} fw={"bold"}>
            Thông tin IQR
          </Text>
        }
        size={"lg"}
        centered
      >
        <Group gap={10} align="flex-start">
          <Stack pos={"relative"}>
            <Image
              src={
                watch().image_confirm
                  ? `${watch().image_confirm}?timestamp=${new Date().getTime()}`
                  : IMAGE_PLACEHOLDER
              }
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
                  setPreviewImage(watch().image_confirm || IMAGE_PLACEHOLDER)
                }
              >
                <IconZoomScan size={"1.125rem"} color="white" />
              </ActionIcon>

              <ActionIcon color={"blue"} onClick={handleImageClick}>
                <input
                  ref={fileInputRef}
                  placeholder="Hình ảnh giấy chứng nhận"
                  type="file"
                  onChange={handleFileChange}
                  disabled={
                    localStorage.getItem("roles") === "ROLE_AGENT"
                      ? true
                      : false
                  }
                  style={{ display: "none" }}
                />
                <IconUpload size={"1.125rem"} color="white" />
              </ActionIcon>
            </Group>
          </Stack>
          <Stack flex={1}>
            <Stack gap={5}>
              <Input.Wrapper label="Tên khách hàng" fz={13}>
                <Input
                  fz={13}
                  placeholder="Tên khách hàng"
                  disabled
                  {...register("name")}
                />
              </Input.Wrapper>
              <NativeSelect
                data={provinces?.map((province) => ({
                  value: province.code,
                  label: province.name,
                }))}
                label="Tỉnh thành xác thực"
                {...register("province_name_agent")}
              />
              <Input.Wrapper label="Địa chỉ" fz={13}>
                <Input fz={13} placeholder="Địa chỉ" {...register("address")} />
              </Input.Wrapper>
              <Input.Wrapper label="Ghi chú" fz={13}>
                <Input fz={13} placeholder="Ghi chú" {...register("note")} />
              </Input.Wrapper>
            </Stack>

            <Group align="center" justify="center">
              <Button
                loading={isLoadingUpdate || isLoadingUploadImage}
                onClick={handleSubmit(onUpdateIqr)}
              >
                Cập nhật
              </Button>
              <Button variant="outline" onClick={toggleEditForm}>
                Huỷ
              </Button>
            </Group>
          </Stack>
        </Group>
      </Modal>
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
              src={
                iqrDetail?.image_confirm
                  ? `${
                      iqrDetail?.image_confirm
                    }?timestamp=${new Date().getTime()}`
                  : IMAGE_PLACEHOLDER
              }
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
                {iqrDetail?.time_turn || ""}
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
              <Input.Wrapper label="Ghi chú" fz={13}>
                <Input
                  fz={13}
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
          <Image
            src={`${previewImage}?timestamp=${new Date().getTime()}`}
            maw={isMobile ? "100%" : "50%"}
            fit="cover"
          />
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default IqrSearchPage;

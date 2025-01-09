import { Badge, Grid, Group, Stack, Text } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import { useGetDashboardStatisticQuery } from "../../redux/api/dashboard/dashboard.api";
import { TDashboardRES } from "../../redux/api/dashboard/dashboard.response";
import Statistic1 from "./components/Statistic1";
import Statistic2 from "./components/Statistic2";
import Topup from "../../assets/topup.png";
import Driver from "../../assets/driver.png";
import Speaker from "../../assets/speaker.png";
import Fridge from "../../assets/fridge.png";
import AwardItem from "./components/AwardItem";
import AppTable from "../../components/AppTable";
import { TIqrRangeTimeREQ } from "../../redux/api/iqr/iqr.request";
import {
  useGetProvincesQuery,
  useIqrCounterTodayQuery,
  useIqrTodayQuery,
} from "../../redux/api/iqr/iqr.api";
type MappedData = {
  [key: string]: TDashboardRES[];
};
const MapLabel = new Map([
  ["xemay", "Xe máy Air Blade 125cc"],
  ["topup", "Nạp tiền 10.000VND"],
  ["tulanh", "Tủ lạnh Sharp 362L"],
  ["loaJBL", "Loa JBL Partybox110"],
  ["", "Không trúng thưởng"],
]);
const DashboardPage = () => {
  const { data: statistic } = useGetDashboardStatisticQuery({});
  const [query, setQuery] = useState<Partial<TIqrRangeTimeREQ>>({
    nu: 0,
    sz: 15,
    gateway: 2,
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
  const { data: provinces } = useGetProvincesQuery();

  const extractCategory = (award: string): string => {
    const parts = award.split("_");
    return parts?.length > 1 ? parts?.slice(0, -1).join("_") : award;
  };
  const mapProvince = useCallback(
    (code: string) => {
      if (!code) return "";
      return provinces?.find((province) => province.code === code)?.name;
    },
    [provinces]
  );
  const mapByCategory = useCallback((data: TDashboardRES[]): MappedData => {
    return data.reduce<MappedData>((acc, item) => {
      const category = extractCategory(item.award);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }, []);

  const mapValue = useMemo(
    () => mapByCategory(statistic || []),
    [statistic, mapByCategory]
  );
  return (
    <Stack flex={1}>
      <Text fz={"h3"} fw={"bold"} c={"rgb(64, 174, 163)"}>
        THỐNG KÊ
      </Text>
      <Grid>
        <Grid.Col span={4}>
          <Statistic1 data={mapValue} />
        </Grid.Col>
        <Grid.Col span={8}>
          <Statistic2 data={mapValue} />
        </Grid.Col>
      </Grid>
      <Text fz={"h3"} fw={"bold"} c={"rgb(64, 174, 163)"}>
        SỐ GIẢI ĐÃ TRÚNG THƯỞNG
      </Text>
      <Group justify="space-between" wrap="wrap">
        <AwardItem
          image={Driver}
          title="Giải nhất"
          value={mapValue["xemay"]?.[0]?.total}
          note={10}
        />
        <AwardItem
          image={Fridge}
          title="Giải nhì"
          value={mapValue["tulanh"]?.[0]?.total}
          imageStyle="tw-h-44"
          note={15}
        />
        <AwardItem
          image={Speaker}
          title="Giải ba"
          value={mapValue["loaJBL"]?.[0]?.total}
          imageStyle="tw-h-36"
          note={30}
        />
        <AwardItem
          image={Topup}
          title="Giải khuyến khích"
          value={mapValue["Topup"]?.[0]?.total}
          note={453023}
        />
      </Group>
      <Text fz={"h3"} c={"rgb(64, 174, 163)"} fw={"bolder"}>
        IQR TRONG NGÀY
      </Text>
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

export default DashboardPage;

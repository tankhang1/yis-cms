import { useMemo } from "react";
import AppPieChart from "../../../components/AppPieChart";
import { TDashboardRES } from "../../../redux/api/dashboard/dashboard.response";
import { Paper, Stack, Text } from "@mantine/core";
type MappedData = {
  [key: string]: TDashboardRES[];
};
type Props = {
  data: MappedData;
};
const Statistic1 = ({ data }: Props) => {
  const mapValue = useMemo(() => {
    const total = data["iqr_total"]?.reduce(
      (preValue, curValue) => preValue + curValue.total,
      0
    );
    const active = data["iqr_active"]?.reduce(
      (preValue, curValue) => preValue + curValue.total,
      0
    );
    const used = data["iqr_used"]?.reduce(
      (preValue, curValue) => preValue + curValue.total,
      0
    );
    return {
      total: total,
      active,
      used,
      block: total - active,
    };
  }, [data]);
  return (
    <Paper
      withBorder
      radius={8}
      shadow="sm"
      py={"sm"}
      px={"xl"}
      h={365}
      w={"100%"}
    >
      <Text fz={18} fw={"bold"}>
        Iqr (Tổng cộng: {mapValue?.total?.toLocaleString("vi")} mã)
      </Text>
      <Stack justify="center" align="center" h={"100%"}>
        <AppPieChart
          height={270}
          series={[
            mapValue?.block,
            // mapValue?.total,
            mapValue?.active,
            mapValue?.used,
          ]}
          labels={[
            "Chưa kích hoạt",
            // "Tổng iQr",
            "Đã kích hoạt",
            "Đã sử dụng",
          ]}
          colors={["#D81B60", "#FFC107", "#43A047"]}
          options={{
            legend: {
              show: true,
              position: "bottom", // Moved legend to the bottom
              horizontalAlign: "center",
              offsetX: 0,
              offsetY: 0, // Adjust this if you need more space
              markers: {
                width: 8,
                height: 8,
                radius: 8,
              },
              itemMargin: {
                vertical: 4,
              },
              fontSize: "16px",
            },
            dataLabels: {
              enabled: true,
            },
            // responsive: [
            //   {
            //     breakpoint: 1580,
            //     options: {
            //       legend: {
            //         show: false,
            //       },
            //     },
            //   },
            // ],
            tooltip: {
              enabled: true,
              y: {
                formatter: function (value: number) {
                  return `${value.toLocaleString("vi")} mã`;
                },
              },
            },
          }}
        />
      </Stack>
    </Paper>
  );
};

export default Statistic1;

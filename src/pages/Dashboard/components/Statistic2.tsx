import { TDashboardRES } from "../../../redux/api/dashboard/dashboard.response";
import { Paper, Text } from "@mantine/core";
import HorizontalBarChart from "../../../components/AppHorizontalBarChart";
type MappedData = {
  [key: string]: TDashboardRES[];
};
const MapLabel = new Map([
  [86784777, "NATIVO WG75 10G"],
  [86708957, "NATIVO WG75 60G"],
  [91123732, "NATIVO WG75 120G"],
  [85760823, "VAYEGO SC200 50ML"],
  [88657705, "VAYEGO SC200 75ML"],
]);
type Props = {
  data: MappedData;
};
const Statistic2 = ({ data }: Props) => {
  return (
    <Paper radius={8} shadow="md" py={"sm"} px={"xl"} w={"100%"} h={365}>
      <Text fz={18} fw={"bold"}>
        Hiện trạng IQR
      </Text>
      <HorizontalBarChart
        height={295}
        colors={["#D81B60", "#FFC107", "#43A047"]}
        options={{
          chart: {
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "70%",
            },
          },
          xaxis: {
            categories: data["iqr_total"]?.map((item) =>
              MapLabel.get(+item.award.split("_")[2])
            ),
            labels: {
              style: {
                colors: "black", // Set the label text color
                fontSize: "12px", // Optional: Customize font size
                fontWeight: "bold", // Optional: Customize font weight
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "black", // Set the label text color for the y-axis
                fontSize: "12px", // Optional: Customize font size
                fontWeight: "bold", // Optional: Customize font weight
              },
            },
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (value: number) {
                return `${value.toLocaleString("vi")} mã`;
              },
            },
          },
          legend: {
            show: true,
            position: "top",
            fontSize: "14px",
          },
        }}
        //@ts-expect-error no check
        series={[
          {
            name: "Tổng mã",
            data: data["iqr_total"]?.map((item) => item.total),
          },
          {
            name: "Đã kích kích hoạt",
            data: data["iqr_active"]?.map((item) => item.total),
          },
          {
            name: "Đã sử dụng",
            data: data["iqr_used"]?.map((item) => item.total),
          },
        ]}
      />
    </Paper>
  );
};

export default Statistic2;

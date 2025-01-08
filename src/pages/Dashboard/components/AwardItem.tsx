import { Center, Image, Paper, Stack, Text } from "@mantine/core";

type TAwardItem = {
  image: unknown;
  title: string;
  value: number;
  imageStyle?: string;
  note: number;
};
const AwardItem = ({ image, title, value, note }: TAwardItem) => {
  return (
    <Paper shadow="sm" flex={1} mb={"md"}>
      <Stack gap={"xs"}>
        <Paper shadow="sm" bg={"white"}>
          <Center py={"md"}>
            <Text fw={"bold"} fz={"h4"}>
              {title}
            </Text>
          </Center>
        </Paper>
        <Paper>
          <Center bg={"white"} h={280}>
            <Image src={image} h={200} w={"80%"} alt="" fit="contain" />
          </Center>
        </Paper>
        <Paper shadow="sm" bg={"white"} pos={"relative"} h={55}>
          <Center h={55}>
            <Text fz={"h2"} fw={"bold"} c={"black"}>
              {value?.toLocaleString("vi")}
            </Text>
          </Center>
          <Text pos={"absolute"} bottom={0} right={10} fw={"bold"} c={"gray"}>
            {note?.toLocaleString("vi")}
          </Text>
        </Paper>
      </Stack>
    </Paper>
  );
};

export default AwardItem;

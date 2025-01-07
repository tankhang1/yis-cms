import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Paper,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import YisLogo from "../../assets/logo-yis.png";
import TopShape from "../../assets/top-shape.svg";
import BottomShape from "../../assets/bottom-shape.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NAV_LINK from "../../constants/navLinks";
type TLoginForm = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<TLoginForm>();
  const onSubmit: SubmitHandler<TLoginForm> = (data) => {
    console.log(data);
    navigate(NAV_LINK.DASHBOARD);
  };
  return (
    <Center w={"100vw"} h={"100vh"} bg={"#F8F7FA"}>
      <Box pos={"relative"}>
        <Image
          src={TopShape}
          pos={"absolute"}
          style={{ zIndex: 0 }}
          w={237}
          h={237}
          top={-100}
          left={-100}
        />
        <Image
          src={BottomShape}
          pos={"absolute"}
          style={{ zIndex: 0 }}
          w={237}
          h={237}
          right={-100}
          bottom={-100}
        />
        <Paper
          radius={6}
          bg={"white"}
          maw={460}
          p={48}
          shadow="sm"
          pos={"static"}
          style={{ zIndex: 999 }}
        >
          <Stack gap={24}>
            <Center>
              <Image src={YisLogo} w={113} />
            </Center>
            <Stack gap={0}>
              <Text fw={"bold"} fz={24}>
                Chào mừng đến với Yis CMSS! 👋🏻
              </Text>
              <Text fw={"normal"} fz={15}>
                Vui lòng nhập tài khoản và mật khẩu để truy cập vào hệ thống{" "}
              </Text>
            </Stack>
            <Input.Wrapper label="Tài khoản" fz={13}>
              <Input
                fz={13}
                placeholder="Tài khoản"
                {...register("email", { required: true })}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Mật khẩu" fz={13}>
              <PasswordInput
                fz={13}
                placeholder="Mật khẩu"
                {...register("password", { required: true })}
              />
            </Input.Wrapper>
            <Button onClick={handleSubmit(onSubmit)}>Đăng nhập</Button>
          </Stack>
        </Paper>
      </Box>
    </Center>
  );
};

export default LoginPage;

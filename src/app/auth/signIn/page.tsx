import SignIn from "./components/SignIn";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import LineWithCenteredText from "@/components/LineWithCenteredText";
type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const LoginPage = async (props: Props) => {
  console.log(props);
  const session = await getServerSession(options);

  if (session) {
    return <div>Logged in</div>;
  }

  return (
    <>
      <LineWithCenteredText>lub</LineWithCenteredText>
      <SignIn callbackUrl={props.searchParams?.callbackUrl} />;
    </>
  );
};

export default LoginPage;

import Schedule from "@/components/schedule/schedule";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/action";

const SchedulePage = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }
  return <Schedule />;
};

export default SchedulePage;

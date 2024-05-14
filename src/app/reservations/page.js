import Reservations from "@/components/reservations/reservations";
import { getSession } from "@/lib/action";
import { redirect } from "next/navigation";

const ReservationsPage = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }

  return <Reservations />;
};

export default ReservationsPage;

import { profileOrdersData } from "@/public/data";
import OrderDetail from "@/components/profile/orderDetail";

interface OrderPageProps {
  params:
    | {
        orderId: string; // اگر پوشه به صورت [orderId] تعریف شده است، params.orderId یک رشته است.
      }
    | Promise<{
        orderId: string; // اگر پوشه به صورت [orderId] تعریف شده است، params.orderId یک رشته است.
      }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  // await کردن params برای رفع خطا
  const awaitedParams = await params;
  const { orderId } = awaitedParams;

  // جستجو در داده‌های محلی بر اساس payId
  const order = profileOrdersData.find(
    (order) => order.details.payId === orderId
  );

  return <OrderDetail order={order} />;
}

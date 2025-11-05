import axios from "axios";

export interface OrderItem {
  courseId: string;
  title?: string;
  price?: number;
  discountPercent?: number | null;
}

export interface OrderDetail {
  id: string;
  total: number;
  status: string;
  paymentRef?: string | null;
  createdAt: string;
  items: OrderItem[];
  user?: {
    id: string;
    phone: string;
    name?: string | null;
  };
}

export interface OrderResponse {
  ok: boolean;
  order?: OrderDetail;
  error?: string;
}

export const orderService = {
  async getOrderById(orderId: string): Promise<OrderResponse> {
    try {
      const res = await axios.get<OrderResponse>(`/api/orders/${orderId}`);
      return res.data;
    } catch (err) {
      console.error("[orderService] getOrderById error:", err);
      return { ok: false, error: "خطایی در دریافت اطلاعات سفارش رخ داد" };
    }
  },
};

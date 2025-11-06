import axios from "axios";

// ✅ Update personal info
export async function updatePersonalInfo(data: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  nationalCode?: string;
  birthDate?: Date | null;
  avatarUrl?: string;
}) {
  const res = await axios.put("/api/user/personal", data);
  return res.data;
}

// ✅ Update avatar
export async function updateAvatar(avatarUrl: string) {
  const res = await axios.put("/api/user/avatar", { avatarUrl });
  return res.data;
}

// ✅ Update payment info
export async function updatePayInfo(data: {
  cardNumber: string;
  shebaNumber: string;
  accountOwner: string;
}) {
  const res = await axios.put("/api/user/pay", data);
  return res.data;
}

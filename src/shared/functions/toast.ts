import { message } from "antd";

export const showToast = (name: string, storedData: Record<string, any> | null) => {
  if (storedData) message.success(`${name} updated successfully`);
  else message.success(`${name} added successfully`);
};
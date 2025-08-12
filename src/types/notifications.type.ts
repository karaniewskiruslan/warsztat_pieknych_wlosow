export type Notification = {
  id: string;
  title: string;
  body: string;
  lifeTime: number;
  type: "error" | "success" | "added";
};

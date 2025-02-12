import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "2글자 이상 입력해주세요." })
    .max(20, { message: "20글자 이하로 입력해주세요." })
    .optional(),
});

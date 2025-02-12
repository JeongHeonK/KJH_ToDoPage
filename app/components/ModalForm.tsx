"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MouseEvent, useState } from "react";
import { TwitterPicker } from "react-color";
import { formSchema } from "../util/validation";
import { useModalStore } from "../store";

export default function ModalForm() {
  const { form, handleChange, onSubmit } = useKanban();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white w-[350px] p-3 mx-auto left-0 right-0 fixed top-32 rounded-md"
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Board Title</FormLabel>
              <FormControl>
                <Input placeholder="보드 이름을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TwitterPicker className="mx-auto rounded-lg" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const useKanban = () => {
  const onClose = useModalStore((state) => state.handleClose);
  const [color, setColor] = useState("#22194D");
  const form = useForm<z.infer<typeof formSchema> & { color: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleChange = <T extends { hex: string }>(color: T) => {
    setColor(color.hex);
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    if (!window) return;
    const kanban = window.localStorage.getItem("board");
    if (!kanban) {
      window.localStorage.setItem(
        "board",
        JSON.stringify([{ title: data.title, color }]),
      );
    } else {
      const kanbanArr = JSON.parse(kanban);
      kanbanArr.push({ title: data.title, color });
      window.localStorage.setItem("board", JSON.stringify(kanbanArr));
    }
    onClose();
  };
  return { form, handleChange, onSubmit };
};

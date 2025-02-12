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
import { nanoid } from "nanoid";
import { boardFormSchema } from "../../util/validation";
import { useBoardsStore, useModalStore } from "../../store";

export default function ModalBoardForm() {
  const { form, handleChange, onSubmit } = useModalBoardForm();

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

const useModalBoardForm = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const addBoard = useBoardsStore((state) => state.addBoard);
  const [color, setColor] = useState("#22194D");
  const form = useForm<z.infer<typeof boardFormSchema> & { color: string }>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleChange = <T extends { hex: string }>(color: T) => {
    setColor(color.hex);
  };

  const onSubmit: SubmitHandler<z.infer<typeof boardFormSchema>> = (data) => {
    const id = nanoid(8);
    const newData = { ...data, id, color, todoIds: [] };
    addBoard(newData);
    closeModal("idle");
  };
  return { form, handleChange, onSubmit };
};

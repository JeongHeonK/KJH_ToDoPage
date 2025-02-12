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
import { MouseEvent } from "react";
import { nanoid } from "nanoid";
import { useBoardsStore, useModalStore, useTodoStore } from "@/app/store";
import { todoFormSchema } from "../../util/validation";

export default function ModalTodoFrom() {
  const { form, onSubmit } = useModalTodoFrom();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white w-[350px] p-3 mx-auto left-0 right-0 fixed top-32 rounded-md"
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">할 일</FormLabel>
              <FormControl>
                <Input placeholder="할 일을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const useModalTodoFrom = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const boardId = useModalStore((state) => state.boardId);
  const resetBoardId = useModalStore((state) => state.resetBoardId);
  const closeModal = useModalStore((state) => state.closeModal);
  const addTodoId = useBoardsStore((state) => state.addTodoId);

  const form = useForm<z.infer<typeof todoFormSchema> & { color: string }>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      todo: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof todoFormSchema>> = (data) => {
    const newTodoId = nanoid(8);
    if (boardId === null) return;
    const newData = { ...data, boardId, isCompleted: false };
    addTodoId(boardId, newTodoId);
    addTodo(newTodoId, newData);
    resetBoardId();
    closeModal("idle");
  };
  return { form, onSubmit };
};

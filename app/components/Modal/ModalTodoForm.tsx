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
import { useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { useStopPropagation } from "@/app/hooks";
import { useBoardsStore, useModalStore, useTodoStore } from "@/app/store";
import * as motion from "motion/react-client";
import {
  FORM_INITIAL_STATE,
  FORM_ANIMATION_STATE,
  FORM_TRANSITION,
} from "@/app/constants";
import { todoFormSchema } from "../../util";

export default function ModalTodoFrom() {
  const { form, onSubmit, inputRef } = useModalTodoFrom();

  return (
    <Form {...form}>
      <motion.form
        initial={FORM_INITIAL_STATE}
        animate={FORM_ANIMATION_STATE}
        transition={FORM_TRANSITION}
        onClick={useStopPropagation}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white w-[350px] p-3 mx-auto left-0 right-0 fixed top-32 rounded-md"
      >
        <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">할 일</FormLabel>
              <FormControl>
                <Input
                  placeholder="할 일을 입력해주세요"
                  {...field}
                  ref={inputRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </motion.form>
    </Form>
  );
}

const useModalTodoFrom = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const boardId = useModalStore((state) => state.boardId);
  const closeModal = useModalStore((state) => state.closeModal);
  const addTodoId = useBoardsStore((state) => state.addTodoId);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof todoFormSchema> & { color: string }>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      todo: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof todoFormSchema>> = (data) => {
    const newTodoId = nanoid(8);
    if (boardId === null) return;
    const newData = { ...data, boardId, isCompleted: false, isExisting: true };
    addTodoId(boardId, newTodoId);
    addTodo(newTodoId, newData);
    closeModal("idle");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return { form, onSubmit, inputRef };
};

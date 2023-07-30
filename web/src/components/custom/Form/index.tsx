import { ComponentProps, ComponentType, PropsWithChildren } from "react";
import { SubmitHandler, FieldValues, FormProviderProps } from "react-hook-form";
import { Form as UIForm } from "~/components/ui/form";

interface Props {
  onSubmit?: any;
  className?: string;
}

export function Form({
  children,
  className,
  onSubmit,
  ...rest
}: PropsWithChildren<Props>) {
  const { handleSubmit } = rest as any;
  return (
    <UIForm {...(rest as any)}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </UIForm>
  );
}

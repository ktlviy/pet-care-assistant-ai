import { FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RegisterValues, LoginValues } from "../types/auth";

export async function handleRegisterSubmit(
  values: RegisterValues,
  formikHelpers: FormikHelpers<RegisterValues>,
  setError: (error: string) => void,
  router: AppRouterInstance
) {
  setError("");
  formikHelpers.setSubmitting(true);
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  });
  if (res.ok) {
    router.push("/login");
  } else {
    const data = await res.json();
    setError(data.error || "Registration failed");
  }
  formikHelpers.setSubmitting(false);
}

export async function handleLoginSubmit(
  values: LoginValues,
  formikHelpers: FormikHelpers<LoginValues>,
  setError: (error: string) => void,
  router: AppRouterInstance
) {
  setError("");
  formikHelpers.setSubmitting(true);
  const res = await signIn("credentials", {
    redirect: false,
    email: values.email,
    password: values.password,
  });
  if (res?.error) {
    setError(res.error);
  } else {
    router.push("/");
  }
  formikHelpers.setSubmitting(false);
}

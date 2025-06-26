"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { LoginSchema } from "../constants/validationSchemas";
import { handleLoginSubmit } from "../services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, formikHelpers) =>
            handleLoginSubmit(values, formikHelpers, setError, router)
          }
        >
          {({ isSubmitting, handleChange, handleBlur, values }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <Input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" loading={isSubmitting} fullWidth>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <div className="text-sm mt-2">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 underline">
                  Register
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

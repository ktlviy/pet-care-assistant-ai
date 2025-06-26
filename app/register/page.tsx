"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { RegisterSchema } from "../constants/validationSchemas";
import { handleRegisterSubmit } from "../services/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Register</h2>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={RegisterSchema}
          onSubmit={(values, formikHelpers) =>
            handleRegisterSubmit(values, formikHelpers, setError, router)
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
                  autoComplete="new-password"
                  className="w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block mb-1">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="w-full"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" loading={isSubmitting} fullWidth>
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
              <div className="text-sm mt-2">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 underline">
                  Login
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

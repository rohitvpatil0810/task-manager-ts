import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./AuthProvider";
import { LoadingButton } from "@/components/ui/loading-button";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignin from "./GoogleSignin";
import routes from "@/config/routes";

const formSchema = z
  .object({
    firstName: z.string().min(3, {
      message: "First name is required.",
    }),
    lastName: z.string().min(3, {
      message: "Last name is required.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (auth?.user) {
      navigate(routes.home);
      return;
    }
  }, [auth?.user]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    auth?.signup(values);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Signup</CardTitle>
              <CardDescription>
                Enter your details to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="James" {...field} />
                      </FormControl>
                      <FormMessage>
                        {auth?.validationErrors &&
                          auth.validationErrors.firstName}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Bond" {...field} />
                      </FormControl>
                      <FormMessage>
                        {auth?.validationErrors &&
                          auth.validationErrors.lastName}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="james@bond.com" {...field} />
                    </FormControl>
                    <FormMessage>
                      {auth?.validationErrors && auth.validationErrors.email}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage>
                      {auth?.validationErrors && auth.validationErrors.password}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage>
                      {auth?.validationErrors &&
                        auth.validationErrors.confirmPassword}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <LoadingButton
                  className="w-full"
                  loading={form.formState.isSubmitting}
                >
                  Signup
                </LoadingButton>
                <GoogleSignin />
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to={routes.login} className="underline">
                    Log in
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Signup;

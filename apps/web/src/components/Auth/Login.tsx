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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Login = () => {
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
    auth?.login(values.email, values.password);
    if (auth?.user) {
      form.reset();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-4">
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
                  <FormItem className="grid gap-4">
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
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <LoadingButton
                  className="w-full"
                  loading={form.formState.isSubmitting}
                >
                  Login
                </LoadingButton>
                <GoogleSignin />
                <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <Link to={routes.signup} className="underline">
                    Signup
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

export default Login;

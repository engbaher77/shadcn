'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/lib/redux/hooks';
import { loginSuccess } from '@/lib/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { authService } from '@/lib/api/authService';
import { useState } from 'react';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      dispatch(loginSuccess(response));
      setCookie('auth_token', response.accessToken);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., show a toast notification)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              type="submit"
              className="w-full"
              onSubmit={handleLogin}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className="text-center text-sm mt-4">
        {isLogin ? "Don't have an account?" : 'Already a Member?'}{' '}
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign up' : 'Log In'}
        </Button>
      </div>
    </div>
  );
}

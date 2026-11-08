import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Logo from '../components/ui/Logo';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage } from '../utils/errors';

export default function Login() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    setIsLoading(true);

    try {
      await login(data.email.trim(), data.password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = getApiErrorMessage(err, lang);
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-[440px] rounded-[28px] border border-white/80 bg-white/85 p-6 sm:p-9 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/5 backdrop-blur-xl animate-auth-fade-up">
        {/* Card Header: Brand Mark + Title + Subtitle */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo variant="mark" size={44} className="mb-3.5 shadow-sm" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {t('auth.welcomeBack')}
          </h1>
          <p className="mt-1.5 text-xs text-slate-500 max-w-xs leading-relaxed">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        {serverError && (
          <div
            className="mb-5 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-800"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <div className="font-medium leading-relaxed">{serverError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="text-xs font-semibold text-slate-700">
              {t('auth.email')}
            </label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder={t('auth.emailPlaceholder')}
              prefix={<Mail className="h-4 w-4 text-slate-400" />}
              error={errors.email?.message}
              {...register('email', {
                required: t('validation.required', 'This field is required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.emailInvalid', 'Please enter a valid email address'),
                },
              })}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="login-password" className="text-xs font-semibold text-slate-700">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder={t('auth.passwordPlaceholder')}
                prefix={<Lock className="h-4 w-4 text-slate-400" />}
                error={errors.password?.message}
                {...register('password', {
                  required: t('validation.required', 'This field is required'),
                  minLength: {
                    value: 8,
                    message: t('validation.passwordLength', 'Password must be between 8 and 72 characters'),
                  },
                  maxLength: {
                    value: 72,
                    message: t('validation.passwordLength', 'Password must be between 8 and 72 characters'),
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute end-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full shadow-md shadow-emerald-900/10"
            >
              {isLoading ? t('auth.signingIn') : t('auth.signIn')}
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-slate-600">
          <span>{t('auth.dontHaveAccount')} </span>
          <Link
            to="/register"
            className="font-bold text-emerald-700 hover:text-emerald-900 transition"
          >
            {t('auth.createOne')}
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Logo from '../components/ui/Logo';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage } from '../utils/errors';

export default function Register() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    setIsLoading(true);

    try {
      await registerUser(data.fullName.trim(), data.email.trim(), data.password);
      navigate('/', { replace: true });
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
        <div className="mb-5 flex flex-col items-center text-center">
          <Logo variant="mark" size={44} className="mb-3.5 shadow-sm" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {t('auth.createAccount')}
          </h1>
          <p className="mt-1 text-xs text-slate-500 max-w-xs leading-relaxed">
            {t('auth.registerSubtitle')}
          </p>
        </div>

        {serverError && (
          <div
            className="mb-4 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-800"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <div className="font-medium leading-relaxed">{serverError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="register-fullname" className="text-xs font-semibold text-slate-700">
              {t('auth.fullName')} *
            </label>
            <Input
              id="register-fullname"
              type="text"
              autoComplete="name"
              placeholder={t('auth.fullNamePlaceholder')}
              prefix={<User className="h-4 w-4 text-slate-400" />}
              error={errors.fullName?.message}
              {...register('fullName', {
                required: t('validation.required'),
                minLength: {
                  value: 2,
                  message: t('validation.nameLength'),
                },
                maxLength: {
                  value: 100,
                  message: t('validation.nameLength'),
                },
              })}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="register-email" className="text-xs font-semibold text-slate-700">
              {t('auth.email')} *
            </label>
            <Input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder={t('auth.emailPlaceholder')}
              prefix={<Mail className="h-4 w-4 text-slate-400" />}
              error={errors.email?.message}
              {...register('email', {
                required: t('validation.required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.emailInvalid'),
                },
              })}
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="register-password" className="text-xs font-semibold text-slate-700">
                {t('auth.password')} *
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {t('auth.passwordHint')}
              </span>
            </div>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder={t('auth.createPasswordPlaceholder')}
                prefix={<Lock className="h-4 w-4 text-slate-400" />}
                error={errors.password?.message}
                {...register('password', {
                  required: t('validation.required'),
                  minLength: {
                    value: 8,
                    message: t('validation.passwordLength'),
                  },
                  maxLength: {
                    value: 72,
                    message: t('validation.passwordLength'),
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

          {/* Onboarding perks */}
          <div className="rounded-2xl bg-emerald-50/60 p-3 border border-emerald-100 text-xs text-emerald-900 space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
              <span>{t('auth.categoriesConfigured')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
              <span>{t('auth.standardCurrency')}</span>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-1">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full shadow-md shadow-emerald-900/10"
            >
              {isLoading ? t('auth.creatingAccount') : t('auth.createAccountBtn')}
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-5 text-center text-xs text-slate-600">
          <span>{t('auth.alreadyHaveAccount')} </span>
          <Link
            to="/login"
            className="font-bold text-emerald-700 hover:text-emerald-900 transition"
          >
            {t('auth.signInLink')}
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}

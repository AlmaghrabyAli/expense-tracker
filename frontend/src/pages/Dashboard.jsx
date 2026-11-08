import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import HeroBalanceCard from '../components/dashboard/HeroBalanceCard';
import StatCard from '../components/dashboard/StatCard';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import ExpenseDonut from '../components/charts/ExpenseDonut';
import MonthlyBars from '../components/charts/MonthlyBars';
import TransactionFormModal from '../components/transactions/TransactionFormModal';
import { useAuth } from '../context/AuthContext';
import { useSummary, useByCategory, useMonthly } from '../hooks/useReports';
import { useTransactions, useCreateTransaction } from '../hooks/useTransactions';
import { useCategories } from '../hooks/useCategories';
import { PRESETS } from '../utils/constants';
import { getPresetDates, getPreviousPeriodDates } from '../utils/dates';
import { calculatePeriodChange, formatMoney } from '../utils/format';
import { getApiErrorMessage } from '../utils/errors';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { user } = useAuth();

  // Preset Date range state
  const defaultDates = useMemo(() => getPresetDates(PRESETS.THIS_MONTH), []);
  const [dateRange, setDateRange] = useState({
    preset: PRESETS.THIS_MONTH,
    fromDate: defaultDates.fromDate,
    toDate: defaultDates.toDate,
  });

  // Calculate previous period for trends
  const prevPeriod = useMemo(() => {
    return getPreviousPeriodDates(dateRange.fromDate, dateRange.toDate);
  }, [dateRange.fromDate, dateRange.toDate]);

  // Current year for monthly chart
  const currentYear = useMemo(() => {
    return new Date(dateRange.toDate || new Date()).getFullYear();
  }, [dateRange.toDate]);

  // Queries
  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useSummary(dateRange.fromDate, dateRange.toDate);

  const {
    data: prevSummaryData,
    isLoading: isPrevLoading,
  } = useSummary(prevPeriod.fromDate, prevPeriod.toDate);

  const {
    data: categoryBreakdown,
    isLoading: isCategoryLoading,
  } = useByCategory({
    fromDate: dateRange.fromDate,
    toDate: dateRange.toDate,
    type: 'Expense',
  });

  const {
    data: monthlyData,
    isLoading: isMonthlyLoading,
  } = useMonthly(currentYear);

  const {
    data: recentTxData,
    isLoading: isRecentLoading,
  } = useTransactions({
    page: 1,
    pageSize: 5,
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const { data: categories = [] } = useCategories();
  const createTxMutation = useCreateTransaction();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState(null);
  const [modalServerError, setModalServerError] = useState('');

  // Calculations
  const balance = summaryData?.balance ?? 0;
  const totalIncome = summaryData?.totalIncome ?? 0;
  const totalExpense = summaryData?.totalExpense ?? 0;

  const prevBalance = prevSummaryData?.balance ?? 0;
  const prevIncome = prevSummaryData?.totalIncome ?? 0;
  const prevExpense = prevSummaryData?.totalExpense ?? 0;

  const balanceChange = calculatePeriodChange(balance, prevBalance);
  const incomeChange = calculatePeriodChange(totalIncome, prevIncome);
  const expenseChange = calculatePeriodChange(totalExpense, prevExpense);

  // Income burn rate: expense / income * 100
  const burnRate = totalIncome > 0
    ? `${Math.round((totalExpense / totalIncome) * 100)}%`
    : '0%';

  const handleOpenAddModal = (type = 'Expense') => {
    setModalServerError('');
    setModalInitialData({ type });
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (payload) => {
    setModalServerError('');
    try {
      await createTxMutation.mutateAsync(payload);
      toast.success(t('messages.transactionCreated', 'Transaction added successfully'));
      setIsModalOpen(false);
    } catch (err) {
      const msg = getApiErrorMessage(err, lang);
      setModalServerError(msg);
    }
  };

  // Time of day greeting
  const hour = new Date().getHours();
  const greetingKey =
    hour < 12
      ? 'dashboard.greeting.morning'
      : hour < 17
      ? 'dashboard.greeting.afternoon'
      : 'dashboard.greeting.evening';

  return (
    <div className="space-y-6">
      {/* Header with Greeting & Date Range Picker */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {t(greetingKey, { name: user?.fullName || 'User' })}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('dashboard.subtitle')}
            </p>
          </div>

          <DateRangeSelector
            value={dateRange}
            onChange={(newRange) => setDateRange(newRange)}
          />
        </div>

        {/* Hero Balance Card */}
        <HeroBalanceCard
          balance={balance}
          income={totalIncome}
          expense={totalExpense}
          periodChange={balanceChange}
          isLoading={isSummaryLoading}
          onAddIncome={() => handleOpenAddModal('Income')}
          onAddExpense={() => handleOpenAddModal('Expense')}
        />

        {/* 3 Metric Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            type="income"
            title={t('dashboard.totalIncome')}
            value={totalIncome}
            periodChange={incomeChange}
            isLoading={isSummaryLoading}
          />

          <StatCard
            type="expense"
            title={t('dashboard.totalExpenses')}
            value={totalExpense}
            periodChange={expenseChange}
            isLoading={isSummaryLoading}
          />

          <StatCard
            type="burnRate"
            title={t('dashboard.burnRate')}
            value={burnRate}
            subtext={t('dashboard.ofEarnings')}
            isLoading={isSummaryLoading}
          />
        </div>

        {/* Charts Row: Donut + Monthly Bars */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ExpenseDonut
              data={categoryBreakdown || []}
              isLoading={isCategoryLoading}
            />
          </div>

          <div className="lg:col-span-7">
            <MonthlyBars
              data={monthlyData || []}
              year={currentYear}
              isLoading={isMonthlyLoading}
            />
          </div>
        </div>

        {/* Recent Transactions List */}
        <RecentTransactions
          transactions={recentTxData?.items || []}
          isLoading={isRecentLoading}
          onAddTransaction={() => handleOpenAddModal('Expense')}
        />

        {/* Transaction Modal */}
        <TransactionFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={modalInitialData}
          categories={categories}
          isLoading={createTxMutation.isPending}
          serverError={modalServerError}
        />
      </div>
  );
}

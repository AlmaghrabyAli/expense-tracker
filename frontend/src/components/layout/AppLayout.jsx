import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { TabletRail } from './TabletRail';
import { MobileTopBar } from './MobileTopBar';
import { MobileDock } from './MobileDock';
import TransactionFormModal from '../transactions/TransactionFormModal';
import { useCategories } from '../../hooks/useCategories';
import { useCreateTransaction } from '../../hooks/useTransactions';
import { getApiErrorMessage } from '../../utils/errors';

export function AppLayout() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState(null);
  const [serverError, setServerError] = useState('');

  const { data: categories = [] } = useCategories();
  const createTxMutation = useCreateTransaction();

  const handleOpenAddModal = (type = 'Expense') => {
    setServerError('');
    setModalInitialData({ type });
    setIsAddModalOpen(true);
  };

  const handleModalSubmit = async (payload) => {
    setServerError('');
    try {
      await createTxMutation.mutateAsync(payload);
      setIsAddModalOpen(false);
    } catch (err) {
      setServerError(getApiErrorMessage(err, lang));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative flex flex-col">
      {/* Ambient background glows */}
      <div className="fixed top-0 end-0 w-[500px] h-[500px] ambient-glow-emerald pointer-events-none -z-10" />
      <div className="fixed bottom-0 start-0 w-[500px] h-[500px] ambient-glow-indigo pointer-events-none -z-10" />

      {/* Desktop Sidebar (>=1280px) */}
      <Sidebar />

      {/* Tablet Icon Rail (768px-1279px) */}
      <TabletRail />

      {/* Mobile Top Bar (<768px) */}
      <MobileTopBar />

      {/* Main Content Area */}
      <main className="flex-1 xl:ps-[280px] md:ps-[80px] ps-0 pt-16 md:pt-0 pb-28 md:pb-10 transition-all duration-200">
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet context={{ openAddTransaction: handleOpenAddModal }} />
        </div>
      </main>

      {/* Mobile Dock with Center Plus Button (<768px) */}
      <MobileDock onAddClick={() => handleOpenAddModal('Expense')} />

      {/* Global Add/Edit Transaction Modal */}
      <TransactionFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={modalInitialData}
        categories={categories}
        isLoading={createTxMutation.isPending}
        serverError={serverError}
      />
    </div>
  );
}

export default AppLayout;

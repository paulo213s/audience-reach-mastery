
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useContacts } from '@/hooks/useContacts';
import StripePayment from '@/components/StripePayment';
import PaymentSuccessHandler from '@/components/PaymentSuccessHandler';
import OrderHistory from '@/components/OrderHistory';
import ContactDialog from '@/components/ContactDialog';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import NewOrderSection from '@/components/dashboard/NewOrderSection';
import SupportSection from '@/components/dashboard/SupportSection';
import TutorialsSection from '@/components/dashboard/TutorialsSection';
import TutorialDialog from '@/components/dashboard/TutorialDialog';
import GenericSection from '@/components/dashboard/GenericSection';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { profile, loading } = useProfile();
  const {
    whatsappContacts,
    emailContacts,
    loading: contactsLoading,
    saveWhatsAppContact,
    saveEmailContact,
    openWhatsApp,
    openEmail
  } = useContacts();
  
  const [activeSection, setActiveSection] = useState('new-order');
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showTutorialDialog, setShowTutorialDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactType, setContactType] = useState<'whatsapp' | 'email'>('whatsapp');

  const handleSidebarClick = (id: string) => {
    if (id === 'add-balance') {
      setShowBalanceDialog(true);
    } else {
      setActiveSection(id);
    }
  };

  const handleTutorialClick = () => {
    setShowTutorialDialog(true);
  };

  const handleWhatsAppClick = () => {
    if (whatsappContacts.length > 0) {
      openWhatsApp(whatsappContacts[0].phone_number);
    } else {
      setContactType('whatsapp');
      setShowContactDialog(true);
    }
  };

  const handleEmailClick = () => {
    if (emailContacts.length > 0) {
      openEmail(emailContacts[0].email);
    } else {
      setContactType('email');
      setShowContactDialog(true);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'new-order':
        return (
          <NewOrderSection
            onTutorialClick={handleTutorialClick}
            onSupportClick={() => setActiveSection('support')}
          />
        );
      case 'order-history':
        return <OrderHistory />;
      case 'tutorials':
        return <TutorialsSection onTutorialClick={handleTutorialClick} />;
      case 'support':
        return (
          <SupportSection
            whatsappContacts={whatsappContacts}
            emailContacts={emailContacts}
            onWhatsAppClick={handleWhatsAppClick}
            onEmailClick={handleEmailClick}
            onEditWhatsApp={() => {
              setContactType('whatsapp');
              setShowContactDialog(true);
            }}
            onEditEmail={() => {
              setContactType('email');
              setShowContactDialog(true);
            }}
          />
        );
      case 'refunds':
        return <GenericSection title="Reembolsos" />;
      case 'services':
        return <GenericSection title="Serviços" />;
      case 'api':
        return <GenericSection title="API" />;
      case 'mass-order':
        return <GenericSection title="Pedidos em Massa" />;
      default:
        return <GenericSection title="Seção não encontrada" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <PaymentSuccessHandler />
      
      <DashboardSidebar
        activeSection={activeSection}
        onSidebarClick={handleSidebarClick}
        onSignOut={handleSignOut}
        userType={profile?.user_type}
      />

      <div className="flex-1 p-6">
        <DashboardHeader
          fullName={profile?.full_name}
          email={user?.email}
          userType={profile?.user_type}
          balance={profile?.balance}
          onAddBalance={() => setShowBalanceDialog(true)}
        />

        {renderContent()}
      </div>

      <Dialog open={showBalanceDialog} onOpenChange={setShowBalanceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Saldo</DialogTitle>
          </DialogHeader>
          <StripePayment onClose={() => setShowBalanceDialog(false)} />
        </DialogContent>
      </Dialog>

      <TutorialDialog
        open={showTutorialDialog}
        onOpenChange={setShowTutorialDialog}
      />

      <ContactDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        type={contactType}
        onSave={contactType === 'whatsapp' ? saveWhatsAppContact : saveEmailContact}
        loading={contactsLoading}
      />
    </div>
  );
};

export default Dashboard;

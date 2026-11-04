import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfirmEmailPage } from "@/pages/confirm-email/ui/ConfirmEmailPage";
import { HomePage } from "@/pages/home/ui/HomePage";
import { ResetPasswordPage } from "@/pages/reset-password/ui/ResetPasswordPage";
 
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/confirm-email" element={<ConfirmEmailPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

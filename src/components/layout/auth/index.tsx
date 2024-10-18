import { Card } from "@/components/daisyui";
import { type ReactNode, Suspense } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center">
      <div className="flex-grow flex justify-center items-center w-full">
        <Card className="h-full w-full md:h-auto md:w-[512px] flex items-center justify-start md:justify-center">
          <Suspense>{children}</Suspense>
          <div className="hidden md:block text-center p-4">
            <p>Karam Entreprises © 2024</p>
            <p>All Rights Reserved</p>
          </div>
        </Card>
      </div>
      <div className="text-center py-6 md:hidden">
        <p>Karam Entreprises © 2024</p>
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
};

export default AuthLayout;

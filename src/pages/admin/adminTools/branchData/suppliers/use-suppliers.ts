import { useState } from "react";

const useSuppliers = () => {
  const [hasActions, _] = useState<boolean>(true);

  const columns = {
    id: "ID",
    supplier_name: "Supplier Name",
    representative: "Representative",
    contact_number: "Contact Number",
    email: "Email",
    fax: "Fax",
    payment_terms: "Payment Terms",
    address: "Address",
  };
  const tableData = [
    {
      id: "1",
      supplier_name: "BABBA MOCTAR LTD",
      representative: "-",
      contact_number: "699725555",
      email: "babbamoctar@yahoo.fr",
      fax: "-",
      payment_terms: "30 Jours Apres Livraison",
      address: "Carrefour Tissus-Yaoundé",
    },
    {
      id: "2",
      supplier_name: "BABBA MOCTAR LTD",
      representative: "-",
      contact_number: "699725555",
      email: "babbamoctar@yahoo.fr",
      fax: "-",
      payment_terms: "30 Jours Apres Livraison",
      address: "Carrefour Tissus-Yaoundé",
    },
    {
      id: "3",
      supplier_name: "BABBA MOCTAR LTD",
      representative: "-",
      contact_number: "699725555",
      email: "babbamoctar@yahoo.fr",
      fax: "-",
      payment_terms: "30 Jours Apres Livraison",
      address: "Carrefour Tissus-Yaoundé",
    },
  ];

  const inputFields: any[] = [];

  return {
    columns,
    tableData,
    inputFields,
    hasActions,
  };
};

export default useSuppliers;

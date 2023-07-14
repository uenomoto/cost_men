export interface SupplierSelect {
  id: number;
  name: string;
}

export type SupplierSelectProps = {
  selected: SupplierSelect;
  setSelected: (supplier: SupplierSelect) => void;
  suppliers: SupplierSelect[];
};

import { Column } from "src/models/table";

import { capitalize } from "./capitalize";

export function generateColumns<T extends object>(rows: T[]): Column[] {
    if (rows.length === 0) return [];
  
    return Object.keys(rows[0]).map((key) => ({
      id: key,
      label: capitalize(key.replace('_', ' ')),
      align: typeof rows[0][key as keyof T] === 'number' ? 'left' : undefined,
      minWidth: 100,
    }));
  }
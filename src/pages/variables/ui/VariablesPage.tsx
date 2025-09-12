import { VariablesTable } from '@/widgets/variables-table';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HistoVariables | REST Client App',
  description: 'Map parameters that are sent by the request',
};

const VariablesPage = () => {
  return <VariablesTable />;
};

export default VariablesPage;

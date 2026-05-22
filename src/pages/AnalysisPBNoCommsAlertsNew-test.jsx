import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AnalysisPBNoCommsAlertsNew from './AnalysisPBNoCommsAlertsNew';

describe('AnalysisPBNoCommsAlertsNew', () => {
  test('renders the title correctly', () => {
    const { getByText } = render(<AnalysisPBNoCommsAlertsNew />);
    expect(getByText('Analysis: PB No Comms Alerts-new')).toBeInTheDocument();
  });

  test('renders the component correctly', () => {
    const { getByText } = render(<AnalysisPBNoCommsAlertsNew />);
    expect(getByText('Analysis: PB No Comms Alerts-new')).toBeInTheDocument();
  });
});

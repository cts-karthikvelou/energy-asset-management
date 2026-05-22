import React from 'react';
import { render } from '@testing-library/react';
import PBNoCommsAlertsNew from './PBNoCommsAlertsNew';

describe('PBNoCommsAlertsNew', () => {
  it('renders correctly', () => {
    const { getByText } = render(<PBNoCommsAlertsNew />);
    expect(getByText('PB No Comms Alerts-new')).toBeInTheDocument();
    expect(getByText('This component displays alerts for PB No Comms Alerts-new.')).toBeInTheDocument();
  });
});

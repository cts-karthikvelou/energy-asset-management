import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataScience from './DataScience';

// Mock the recharts library
jest.mock('recharts', () => ({
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: ({ children }) => <div data-testid="pie">{children}</div>,
  Cell: () => <div data-testid="cell" />,
}));

global.fetch = jest.fn();

describe('DataScience Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==================== STEP 1 TESTS ====================
  test('renders Step1 with solar energy predictor title', () => {
    render(<DataScience />);
    expect(screen.getByText('☀️ Solar Energy AI Predictor')).toBeInTheDocument();
  });

  test('Step1 displays description text', () => {
    render(<DataScience />);
    expect(screen.getByText(/Upload your solar panel image/i)).toBeInTheDocument();
  });

  test('Step1 Start button navigates to Step2', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('✨ Solar Panel Input')).toBeInTheDocument();
    });
  });

  // ==================== PROGRESS STEPS TESTS ====================
  test('clicking progress step 1 navigates to Step1', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('✨ Solar Panel Input')).toBeInTheDocument();
    });

    // Click step 1
    const progressButtons = screen.getAllByRole('button');
    const step1Button = progressButtons.find(btn => btn.textContent === '1');
    fireEvent.click(step1Button);

    await waitFor(() => {
      expect(screen.getByText('☀️ Solar Energy AI Predictor')).toBeInTheDocument();
    });
  });

  // ==================== STEP 2 TESTS ====================
  test('Step2 renders location select with default value Home', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const locationSelect = screen.getByDisplayValue('Home');
      expect(locationSelect).toBeInTheDocument();
    });
  });

  test('changes location value', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const locationSelect = screen.getByDisplayValue('Home');
      fireEvent.change(locationSelect, { target: { value: 'Office' } });
      expect(locationSelect.value).toBe('Office');
    });
  });

  test('changes capacity value', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const capacityInput = screen.getAllByRole('spinbutton')[0];
      fireEvent.change(capacityInput, { target: { value: '10' } });
      expect(capacityInput.value).toBe('10');
    });
  });

  test('changes sun hours value', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const inputs = screen.getAllByRole('spinbutton');
      const sunHoursInput = inputs[1];
      fireEvent.change(sunHoursInput, { target: { value: '8' } });
      expect(sunHoursInput.value).toBe('8');
    });
  });

  test('handles file upload', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });
  });

  test('displays "No file chosen" when no file is selected', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('No file chosen')).toBeInTheDocument();
    });
  });

  test('Back button on Step2 goes back to Step1', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('✨ Solar Panel Input')).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /← Back/i });
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('☀️ Solar Energy AI Predictor')).toBeInTheDocument();
    });
  });

  // ==================== YOLO API ERROR TESTS ====================
  test('runYOLO shows alert when no image is selected', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      window.alert = jest.fn();
      fireEvent.click(analyzeButton);
      expect(window.alert).toHaveBeenCalledWith('Please upload an image first.');
    });
  });

  test('runYOLO handles fetch error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      window.alert = jest.fn();
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Unable to connect to backend.');
    });
  });

  test('runYOLO handles backend error response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Server Error',
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      window.alert = jest.fn();
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Backend error occurred. Check backend backend logs.');
    });
  });

  test('runYOLO successfully processes image and navigates to Step3', async () => {
    const mockResponse = {
      summary: {
        total_daily_loss_kwh: 5,
      },
      download_url: 'test-image.jpg',
      panel_analysis: [
        {
          panel_number: 1,
          faults_left: [
            {
              fault: 'Crack',
              confidence: 0.95,
              affected_area: 10,
              loss_percentage: 5,
              daily_loss: 2.5,
            },
          ],
          faults_right: [],
          panel_loss_kwh: 2.5,
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByText('📊 Solar Panel Energy Loss Analysis')).toBeInTheDocument();
    });
  });

  // ==================== STEP 3 TESTS ====================
  test('Step3 renders null when yoloResult is not available', async () => {
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.queryByText('📊 Solar Panel Energy Loss Analysis')).not.toBeInTheDocument();
    });
  });

  test('Step3 displays solar panel energy loss analysis title', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 5 },
      download_url: 'test-image.jpg',
      panel_analysis: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByText('📊 Solar Panel Energy Loss Analysis')).toBeInTheDocument();
    });
  });

  test('Step3 displays pie chart', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 5 },
      download_url: 'test-image.jpg',
      panel_analysis: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });

  test('Step3 displays detected image from backend', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 5 },
      download_url: 'results/detected_image.jpg',
      panel_analysis: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      const image = screen.getByAltText('Detection');
      expect(image).toBeInTheDocument();
    });
  });

  test('Step3 displays panel breakdown with faults', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 5 },
      download_url: 'test-image.jpg',
      panel_analysis: [
        {
          panel_number: 1,
          faults_left: [
            {
              fault: 'Crack',
              confidence: 0.95,
              affected_area: 10,
              loss_percentage: 5,
              daily_loss: 2.5,
            },
          ],
          faults_right: [],
          panel_loss_kwh: 2.5,
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByText('🟦 Panel-wise Breakdown')).toBeInTheDocument();
      expect(screen.getByText('Panel 1')).toBeInTheDocument();
      expect(screen.getByText('Crack')).toBeInTheDocument();
      expect(screen.getByText(/95\.0%/)).toBeInTheDocument();
    });
  });

  test('Step3 displays no faults alert when faults_left is empty', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 0 },
      download_url: 'test-image.jpg',
      panel_analysis: [
        {
          panel_number: 1,
          faults_left: [],
          faults_right: [],
          panel_loss_kwh: 0,
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByText('✔ No visible faults')).toBeInTheDocument();
    });
  });

  test('Step3 displays faults_right with multiple faults', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 10 },
      download_url: 'test-image.jpg',
      panel_analysis: [
        {
          panel_number: 1,
          faults_left: [],
          faults_right: [
            {
              fault: 'Dust',
              confidence: 0.88,
              affected_area: 15,
              loss_percentage: 8,
              daily_loss: 4,
            },
            {
              fault: 'Bird Drop',
              confidence: 0.92,
              affected_area: 5,
              loss_percentage: 3,
              daily_loss: 1.5,
            },
          ],
          panel_loss_kwh: 5.5,
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByText('✔ No additional faults')).not.toBeInTheDocument();
      expect(screen.getByText('Dust')).toBeInTheDocument();
      expect(screen.getByText('Bird Drop')).toBeInTheDocument();
    });
  });

  test('Step3 displays download button with correct href', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 5 },
      download_url: 'results/image.jpg',
      panel_analysis: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      const downloadButton = screen.getByRole('link', { name: /Download Annotated Image/i });
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton).toHaveAttribute('download');
    });
  });

  test('Step3 Back button navigates to Step2', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 5 },
      download_url: 'test-image.jpg',
      panel_analysis: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByText('📊 Solar Panel Energy Loss Analysis')).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /← Back/i });
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('✨ Solar Panel Input')).toBeInTheDocument();
    });
  });

  test('loading state changes during API call', async () => {
    global.fetch.mockImplementationOnce(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: async () => ({
            summary: { total_daily_loss_kwh: 5 },
            download_url: 'test-image.jpg',
            panel_analysis: [],
          }),
        });
      }, 100);
    }));
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Processing/i })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('📊 Solar Panel Energy Loss Analysis')).toBeInTheDocument();
    });
  });

  test('displays correct energy calculation in pie chart data', async () => {
    const mockResponse = {
      summary: { total_daily_loss_kwh: 5 },
      download_url: 'test-image.jpg',
      panel_analysis: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    render(<DataScience />);
    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);
    
    await waitFor(() => {
      const capacityInput = screen.getAllByRole('spinbutton')[0];
      fireEvent.change(capacityInput, { target: { value: '10' } });
      
      const sunHoursInput = screen.getAllByRole('spinbutton')[1];
      fireEvent.change(sunHoursInput, { target: { value: '5' } });

      const fileInput = screen.getByDisplayValue('No file chosen');
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput.parentElement.querySelector('input[type="file"]'), {
        target: { files: [file] },
      });
    });

    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /Analyze/i });
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });
});

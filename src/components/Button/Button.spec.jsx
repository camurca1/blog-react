import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
    it('should render the button with a "text" label', () => {
        const fn = jest.fn();
        render(<Button text="text" onClick={fn} />);
        expect.assertions(1);

        const button = screen.getByRole('button', { name: /text/i });
        expect(button).toBeInTheDocument();
    });

    it('should call a function on button click', () => {
        const fn = jest.fn();
        render(<Button text="text" onClick={fn} />);

        const button = screen.getByRole('button', { name: /text/i });
        userEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled is true', () => {
        const fn = jest.fn();
        render(<Button text="text" onClick={fn} disabled={true} />);

        const button = screen.getByRole('button', { name: /text/i });
        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        const fn = jest.fn();
        render(<Button text="text" onClick={fn} disabled={false} />);

        const button = screen.getByRole('button', { name: /text/i });
        expect(button).toBeEnabled();
    });
});

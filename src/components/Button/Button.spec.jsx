import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe('<Button />', () => {
    it('should render the button with a "text"', () => {
        render(<Button text="text" />);
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
        render(<Button text="text" disabled={true}/>);
        
        const button = screen.getByRole('button', { name: /text/i });
        expect(button).toBeDisabled();
        
    });

    it('should be enabled when disabled is false', () => {
        render(<Button text="text" disabled={false}/>);
        
        const button = screen.getByRole('button', { name: /text/i });
        expect(button).toBeEnabled();
        
    });
});
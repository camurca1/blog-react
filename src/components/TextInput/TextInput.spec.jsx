import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
    it('should have a value for searcValue.', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'text'} />);

        const input = screen.getByPlaceholderText('Type your search');

        expect(input).toBeInTheDocument();
        expect(input.value).toBe('text');
    });

    it('should call handleChange on each key pressed.', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue="" />);

        const input = screen.getByPlaceholderText('Type your search');
        const typedText = 'text';

        userEvent.type(input, typedText);
        expect(fn).toHaveBeenCalledTimes(typedText.length);
    });
});
